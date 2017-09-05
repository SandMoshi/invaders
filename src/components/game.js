import React, {Component} from 'react';

import {gameCode} from '../utility/gamecode';

class Game extends Component{
  constructor(){
    super();
  };

  componentDidMount(){
    gameCode();
  };

  render(){
    return(
      <div className="Game">
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Game;
