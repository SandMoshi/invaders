import React from 'react';
// import {CSSTransitionGroup} from 'react-transition-group';
import {leaderboard, createLeaderboard} from '../utility/gamecode';

class Leaderboard extends React.Component{
  constructor(props){
    super();
    this.state = {
    }
  };

  componentDidUpdate(){
    if(this.props.leaderboard){
      createLeaderboard(this.props);
    }
  }

  render(){
    return(
      <div className="leaderboard">
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
