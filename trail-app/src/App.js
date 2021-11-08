// Pages
import './App.css';
import Home from "./pages/Home/Home.js";
import Info from "./pages/Info/Info.js";
import Trails from './pages/Trails/Trails';

// Components
import NavBar from "./components/NavBar/NavBar";
import { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

// Firebase
import { ref, push, onValue, remove } from 'firebase/database'; // used to  modify database
import database, { auth, provider } from './components/utils/firebase.js';
import { onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth';

class App extends Component {

  constructor() {
    super();
    this.state = {
      trailName: "",
      trailLocation: "",
      user: null,
      photoURL: "https://i.imgur.com/fPUbDpF.png",
      items: []
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {

    e.preventDefault(); // prevents page refresh

    const item = {
      name: this.state.trailName,
      location: this.state.trailLocation
    }
    
    push(ref(database, 'trails/'), item); // pushes item to database under 'trails/' directory
    
    console.log("Pushed item to Firebase!") // for debugging
    console.log(item);
   
    this.setState ({ // clears state so it can be used again
      trailName: '',
      trailLocation: ''
    });

  }

  login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      });
  }

  logout() {
    signOut(auth)
      .then(() => {
        this.setState({
          user: null,
          photoURL: "https://i.imgur.com/fPUbDpF.png"
        })
      });
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ 
          user,
          photoURL: user.photoURL
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
        <NavBar loginFunction={this.login} logoutFunction={this.logout} user={this.state.user} photoURL={this.state.photoURL}/>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/trails" render={() => <Trails handleChange={this.handleChange} handleSubmit={this.handleSubmit} trailName={this.state.trailName}/>} />
            <Route path="/info" component={Info} />
            <Redirect exact from="/" to="/home" />
            <Redirect to={{ pathname: "/" }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
