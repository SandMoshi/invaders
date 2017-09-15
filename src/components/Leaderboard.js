import React from 'react';
// import {CSSTransitionGroup} from 'react-transition-group';
import gameCode from '../utility/gamecode';
import {showLeaderboard, EscMessage, EscListen} from '../utility/gamecode';

class Leaderboard extends React.Component{
  constructor(props){
    super();
    this.showLeaderboard = showLeaderboard.bind(this);
    this.EscListen = EscListen.bind(this);
    this.state = {
    }
  };

  componentDidMount(){
    console.log("leaderboard component did mount");
    this.EscListen();
  }

  componentDidUpdate(prevProps, prevState){
    console.log(this.props);
    if(this.props.leaderboard && this.props.drawL === true){
      console.log(this.props.leaderboard)
      var comp = this;
      gameCode().refresh("stop",comp);
      this.showLeaderboard();
      EscMessage(comp);
      this.props.changeDrawL(false);
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
