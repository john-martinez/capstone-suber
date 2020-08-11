import React, { Component } from 'react';
import axios from 'axios';
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
    console.log(scores);

    if (scores.length){
      return (
        <div className="highscores">
          
        </div>
      );
    } else {
      return <h2>Loading...</h2>
    }
    
  }
}