// Pages
import './App.css';
import Home from "./pages/Home/Home.js";
import Trails from './pages/Trails/Trails';

// Components
import NavBar from "./components/NavBar/NavBar";
import { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

// Firebase
import { ref, push, onValue, set, /*update*/ } from 'firebase/database'; // used to  modify database
import database, { auth, provider, storage } from './components/utils/firebase.js';
import { onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth';
import { uploadBytesResumable, ref as sRef, getDownloadURL } from '@firebase/storage';

class App extends Component {

  constructor() {
    super();
    this.state = {
      trailName: "",
      trailLocation: "",
      trailType: "",
      trailDescription: "",
      submitted: false,
      user: null,
      userID: '',
      loggedIn: false,
      username: '',
      photoURL: "https://i.imgur.com/fPUbDpF.png",
      trails: [],
      adminUID: "60d7JMDI8RV9ozXRyirPWfvGXvZ2",
      image: null,
      setImage: null,
      downloadURL: ""
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearUploadState = this.clearUploadState.bind(this);
  }

  handleChange(e) {
    const targetValue = e.target.value;
    if (targetValue.trim() !== "") {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: "Invalid input"
      });
    }
  }


async uploadImageAsPromise(storageRef, file) {
  
  await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const item = {
    name: this.state.trailName,
    type: this.state.trailType,
    userID: this.state.userID,
    description: this.state.trailDescription,
    location: this.state.trailLocation,
    username: this.state.username,
    fileName: file.name,
    dURL: url
  };

  console.log("getdownloadURL: ", url);
  push(ref(database, 'trails/'), item);
  this.clearUploadState();
}


handleSubmit(e) {
  e.preventDefault(); // prevents page refresh

  var fileName = '';

  this.setState({
    submitted: false,
  });

  const newUploadKey = push(ref(database, `trails/`)).key; // pushes item to database under 'trails/' directory
  console.log("Pushed item to Firebase!") // for debugging

  if (e.target[0].files[0]) {
    const file = e.target[0].files[0];
    console.log(file);
    fileName = file.name;

    // creates ref for storage using sRef instead of ref (two imports w/ same names)
    const storageRef = sRef(storage, `images/${this.state.userID}/${fileName}`);

    this.uploadImageAsPromise(storageRef, file);

  } else if (!e.target[0].files[0]) {
    set(ref(database, 'trails/' + newUploadKey), {
      dURL: "https://firebasestorage.googleapis.com/v0/b/testing-database-a4ffc.appspot.com/o/images%2Fdefault_pic.jpg?alt=media&token=a56abe7a-df77-450f-8478-b885e63bca53",
      fileName: "fileNotAvailable",
      name: this.state.trailName,
      type: this.state.trailType,
      userID: this.state.userID,
      description: this.state.trailDescription,
      location: this.state.trailLocation,
      username: this.state.username
    });
  }

}

clearUploadState() {
  this.setState({ // clears state so it can be used again
    trailName: '',
    trailLocation: '',
    trailType: '',
    trailDescription: '',
    downloadURL: '',
    submitted: true,
    dURL: '',
    fileName: ''
  });
}

handleCreate() {
  this.setState({
    submitted: true
  });
}

login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const userID = result.user.uid;
      this.setState({
        user,
        userID: userID
      })
    });
}

logout() {
  signOut(auth)
    .then(() => {
      this.setState({
        user: null,
        loggedIn: false,
        photoURL: "https://i.imgur.com/fPUbDpF.png"
      })
    });
}

componentDidMount() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.setState({
        user,
        userID: user.uid,
        loggedIn: true,
        username: user.displayName,
        photoURL: user.photoURL,
      });
    } else {
      this.setState({
        userID: "no value"
      });
    }
  });

  const trailsRef = ref(database, 'trails/');

  onValue(trailsRef, (snapshot) => {
    let trails = snapshot.val();
    let newState = [];
    for (let item in trails) {
      if (!trails[item].title) {
        trails[item].title = "No title"
      }

      newState.push({
        id: item,
        userID: trails[item].userID,
        username: trails[item].username,
        trailName: trails[item].name,
        trailLocation: trails[item].location,
        trailType: trails[item].type,
        trailDescription: trails[item].description,
        fileName: trails[item].fileName,
        dURL: trails[item].dURL
      });
    }

    this.setState({
      trails: newState
    });
  });
}

render() {


  return (
    <div className="App">
      <Router>
        <NavBar
          loginFunction={this.login}
          logoutFunction={this.logout}
          user={this.state.user}
          photoURL={this.state.photoURL}
        />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/trails" render={() =>
            <Trails
              submitted={this.state.submitted}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              trailName={this.state.trailName}
              trailList={this.state.trails}
              loggedIn={this.state.loggedIn}
              database={database}
              userID={this.state.userID}
              adminUID={this.state.adminUID}
            />}
          />
          <Redirect exact from="/" to="/trails" />
          <Redirect to={{ pathname: "/" }} />
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
