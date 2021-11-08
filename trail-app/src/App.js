import './App.css';
import { Component } from 'react';
import Home from "./pages/Home/Home.js";
import NavBar from "./components/NavBar/NavBar";

import { ref, push, onValue, remove } from 'firebase/database'; // used to  modify database
import database, { auth, provider } from './components/utils/firebase.js';
import { onAuthStateChanged, signInWithRedirect, signInWithPopup, signOut } from '@firebase/auth';

class App extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      user: null,
      photoURL: "https://i.imgur.com/fPUbDpF.png"
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
        <NavBar loginFunction={this.login} logoutFunction={this.logout} user={this.state.user} photoURL={this.state.photoURL}/>
        <Home />
      </div>
    );
  }
}

export default App;
