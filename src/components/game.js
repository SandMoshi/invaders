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
          <canvas id="canvas"></canvas>
        </div>
        <button onClick={this.props.getleaderboard} className="showleaders hidden">Show leaderboard</button>
      </div>
    );
  }
}

export default Game;
