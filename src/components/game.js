import React, {Component} from 'react';

import Leaderboard from './Leaderboard';

import gameCode from '../utility/gamecode';

import laser3 from '../media/laser3.wav';
import retroExplosion from '../media/retro-game-sfx-explosion.wav';
import dogwhimper from '../media/puppy-whine.wav';
import gameoveraudio from '../media/game-over-arcade.wav';

class Game extends Component{
  constructor(props){
    super();
    this.state = {
    }
  };

  componentDidMount(){
    console.log("component mounted!")
    var comp  = this;
    gameCode();
    var mytimer = gameCode().refresh("start",comp);
    console.log(mytimer);
    this.setState({mytimer: mytimer});
  };

  componentDidUpdate(){
    //will run when the state changes
    console.log("componentDidUpdate");
    //show the leaderboard button
    const btnShowLeaderboard = document.querySelector("button.showleaders");
    if(this.props.user){
      btnShowLeaderboard.classList.remove("hidden");
    }
    else{
      btnShowLeaderboard.classList.add("hidden");
    }
  }

  render(){
    return(
      <div>
        <div className="Game">
          <Leaderboard leaderboard={this.props.leaderboard} drawL={this.props.drawL} changeDrawL={this.props.changeDrawL} mytimer={this.state.mytimer}/>
          <canvas id="canvas">
            Your browser does not support HTML5 Canvas.
          </canvas>
        </div>
        <button onClick={this.props.getleaderboard} className="showleaders hidden">Show leaderboard</button>
        <audio id="laser3" src={laser3} type="audio/wav"/>
        <audio id="retroExplosion" src={retroExplosion} type="audio/wav"/>
        <audio id="dogwhimper" src={dogwhimper} type="audio/wav"/>
        <audio id="gameoveraudio" src={gameoveraudio} type="audio/wav"/>
      </div>
            );
  }
}

export default Game;
