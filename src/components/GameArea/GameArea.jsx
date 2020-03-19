import React, { Component } from 'react';
import Road from '../Road/Road';
import './GameArea.scss';

export default class GameArea extends Component {
    state = { crashed: false, finalScore: 0 }
    isGameOver = () => this.setState({crashed: true})
    getFinalScore = score => this.setState({ finalScore: score })
    componentDidUpdate(){ 
        document.querySelector('.road').style.filter = "grayscale(100%) blur(3px)"; 
    }
    render(){
        return(
            <div className="game-area">
                <Road handler={this.isGameOver} scoreHandler={this.getFinalScore}/>
                { this.state.crashed 
                ? <div className="game-area__overlay">
                    <h2 className="game-area__text">YOU DIED</h2>
                    <h2 className="game-area__text">Score: {this.state.finalScore}</h2>
                </div> 
                : ''}
            </div>
        );
    }
}