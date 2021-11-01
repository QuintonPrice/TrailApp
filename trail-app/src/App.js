import React, { Component } from 'react';
import './App.css';
import { ref, push, onValue, remove } from 'firebase/database'; // used to  modify database
import database from './components/utils/firebase.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // <-- add this line
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault(); // prevents page refresh

    const item = {
      user: this.state.username,
      title: this.state.currentItem
    }
    push(ref(database, 'people/'), item); // pushes the item to the database under the "people" tree
    console.log("Pushed item to Firebase!"); // for debugging
    console.log(item);
    this.setState({ // clears state so it can be used again
      currentItem: '',
      username: ''
    });
  }

  removeItem(itemID) {
    console.log("Item: " + itemID + " removed")
    var itemsRef = ref(database, 'people/' + itemID);
    remove(itemsRef);
  }

  // used to load results from Firebase
  componentDidMount() {
    const itemsRef = ref(database, 'people/');

    onValue(itemsRef, (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        // checks for empty string
        if (!items[item].title) {
          items[item].title = "No title";
        }

        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }

      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Firebase Testing</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?"  onChange={this.handleChange} value={this.state.username}/>
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>Brought by: {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;