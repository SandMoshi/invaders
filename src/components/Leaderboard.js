import React from 'react';
// import {CSSTransitionGroup} from 'react-transition-group';
import gameCode from '../utility/gamecode';
import {showLeaderboard, EscMessage} from '../utility/gamecode';

class Leaderboard extends React.Component{
  constructor(props){
    super(props);
    this.showLeaderboard = showLeaderboard.bind(this);
    this.state = {
    }
  };

  componentDidUpdate(){
    if(this.props.leaderboard){
      console.log(this.props.leaderboard)
      gameCode().refresh("stop");
      this.showLeaderboard();
      EscMessage();
    }
  }

  render(){
    return(
      <div className="leaderboard hidden">
        <h3 className="h1">High Scores</h3>
        <ul className="leaderboard">
          {
            this.props.leaderboard &&
              Object
            .keys(this.props.leaderboard)
            .map(key => <li key={key} className="name">{this.props.leaderboard[key].name}</li>)
          }
          {
            this.props.leaderboard &&
              Object
            .keys(this.props.leaderboard)
            .map(key => <li key={key} className="score">{this.props.leaderboard[key].score}</li>)
          }
        </ul>
      </div>
    )
  }

}

export default Leaderboard;
