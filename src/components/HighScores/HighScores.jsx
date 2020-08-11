import React, { Component } from 'react';
import axios from 'axios';
import './HighScores.scss';
export default class HighScores extends Component {
  state = {
    scores: [],
  }

  componentDidMount(){
    axios
      .get('http://localhost:3000/api/highscore')
      .then(res=>this.setState({ scores: res.data }))
      .catch(err=>console.error(err));
  }

  render(){
    const { scores } = this.state;

    if (scores.length){
      return (
        <div className="highscores">
          <div className="highscores__item">
            <div></div>
            <div>Player</div>
            <div>Score</div>
          </div>

          { scores.map((score, i) => (
            <div className="highscores__item">
              <div>{ `${i + 1}. ` } </div>
              <div>{ score.playerName }</div>
              <div>{ score.playerScore }</div>
            </div>
          )) }
        </div>
      );
    } else {
      return <h2>Loading...</h2>
    }
    
  }
}