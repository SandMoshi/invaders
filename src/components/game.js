import React, {Component} from 'react';

import Leaderboard from './Leaderboard';

import gameCode from '../utility/gamecode';

class Game extends Component{
  constructor(props){
    super();
    this.state = {
    }
  };

  componentDidMount(){
    console.log("component mounted!")
    gameCode();
    gameCode().refresh();
  };

  componentDidUpdate(){
    console.log("componentDidUpdate");
    //will run when the state changes
  }

  render(){
    return(
      <div>
        <div className="Game">
          <Leaderboard leaderboard={this.props.leaderboard} drawL={this.props.drawL}/>
          <canvas id="canvas"></canvas>
        </div>
        <button onClick={this.props.getleaderboard} className="showleaders">Show leaderboard</button>
      </div>
    );
  }
}

export default Game;
