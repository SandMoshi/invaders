import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';
import { provider , auth, database} from './components/Firebase';

import Game from './components/Game';

class App extends Component {
  constructor(){
    super()
    this.logout = this.logout.bind(this);
    this.getleaderboard = this.getleaderboard.bind(this);
    this.state = {
      user: null,
    };
  }

  async componentWillMount(){
    //check if user is already logged in
    const user = await auth.onAuthStateChanged((user)=>{
    if(user){
      this.setState({user})
    };
    });
  }
  async login(){
    //runs when someone clicks login
    const result = await auth.signInWithPopup(provider);
    console.log(result);
    this.setState({user: result.user});
  }

  async logout(){
    //runs when someone clicks logout
    await auth.signOut()
    this.setState({user:null});
  }

  getleaderboard(){
    //read the leaderboard data from the database
    var leaderboard = firebase.database().ref('leaderboard'); //just a reference object
    var snapshot;
    leaderboard.on('value', function(snapshot){
      var snapshot = snapshot.val(); //this is the array of data
      console.log(snapshot);
      this.setState({leaderboard:snapshot, drawL: true});
   }.bind(this));
  }

  render() {
    const {user} = this.state; //the user that is logged in
    return (
      <div className="App">
        <Game getleaderboard={this.getleaderboard} drawL={this.state.drawL} leaderboard={this.state.leaderboard}/>
        <div className="login"> {/* Shows the facebook login buttons */}
          <p>{user ? `Hi, ${user.displayName}!` : "Hi, Please sign in."}</p>
          <button onClick={this.login.bind(this)}>Login with Facebook</button>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}

export default App;
