import React, {Component} from 'react';

import {gameCode} from '../utility/gamecode';

class Game extends Component{
  constructor(props){
    super();
  };

  componentDidMount(){
    gameCode();
  };

  // const btn_leaders = document.querySelector(".showleaders");
  // btn_leaders.addEventListener("click",(e) =>{
  //   showLeaderboard();
  // });

  render(){
    return(
      <div className="Game">
        <canvas id="canvas"></canvas>
        <button onClick={this.props.getleaderboard} className="showleaders">Show leaderboard</button>
      </div>
    );
  }
}

export default Game;
