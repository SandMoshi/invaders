import React, {Component} from 'react';

import Leaderboard from './Leaderboard';

import gameCode from '../utility/gamecode';
import {leaderboard, createLeaderboard} from '../utility/gamecode';

class Game extends Component{
  constructor(props){
    super();
    this.state = {
    }
  };

  componentDidMount(){
    gameCode();
    gameCode().refresh();
  };

  componentDidUpdate(){
    console.log("componentDidUpdate");
    //will run when the state changes
    if(this.props.leaderboard){
    }
  }

  render(){
    return(
      <div className="Game">
        <Leaderboard leaderboard={this.props.leaderboard} drawL={this.props.drawL}/>
        <canvas id="canvas"></canvas>
        <button onClick={this.props.getleaderboard} className="showleaders">Show leaderboard</button>
      </div>
    );
  }
}

export default Game;
