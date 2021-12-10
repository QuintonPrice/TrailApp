// Pages
import './App.css';
import Home from "./pages/Home/Home.js";
import Trails from './pages/Trails/Trails';

// Components
import NavBar from "./components/NavBar/NavBar";
import { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

// Firebase
import { ref, push, onValue } from 'firebase/database'; // used to  modify database
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
      imageURL: ""
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  uploadFiles(file, imageID) {
    if (!file) {
      console.log("No file!");
    }
    else {
      const storageRef = sRef(storage, `images/${imageID}`); // creates ref for storage using sRef instead of ref (two imports w/ same names)

      uploadBytesResumable(storageRef, file);

      console.log("Uploaded file!");
      console.log("File: " + file);
    }
  }

  handleSubmit(e) {
    e.preventDefault(); // prevents page refresh

    const file = e.target[0].files[0];
    const imageIDConst = file.name + "-" + this.state.userID; // image id to be used for getDownloadURL ref

    this.uploadFiles(file, imageIDConst);
    getDownloadURL(sRef(storage, `images/${imageIDConst}`))
    .then((url) => {
      console.log("DownloadURL: " + url);
      this.setState({ imageURL: url });
    })
    .catch((error) => {
      // Handle any errors
    });
        this.setState({ submitted: false })
        const item = {
          name: this.state.trailName,
          type: this.state.trailType,
          userID: this.state.userID,
          description: this.state.trailDescription,
          location: this.state.trailLocation,
          username: this.state.username,
          imageURL: this.state.imageURL
        }

        push(ref(database, 'trails/'), item); // pushes item to database under 'trails/' directory

        console.log("Pushed item to Firebase!") // for debugging
        console.log(item);

        this.setState({ // clears state so it can be used again
          trailName: '',
          trailLocation: '',
          trailType: '',
          trailDescription: '',
          imageID: '',
          submitted: true
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
          console.log("Login result: ", result.user);
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
        if(user) {
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

    console.log(this.state.userID);

    onValue(trailsRef, (snapshot) => {
      let trails = snapshot.val();
      let newState = [];
      for (let item in trails) {
        if (!trails[item].title) {
          trails[item].Title = "No title"
        }

        newState.push({
          id: item,
          userID: trails[item].userID,
          username: trails[item].username,
          trailName: trails[item].name,
          trailLocation: trails[item].location,
          trailType: trails[item].type,
          trailDescription: trails[item].description,
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
