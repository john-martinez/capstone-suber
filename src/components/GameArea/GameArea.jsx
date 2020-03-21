import React, { Component } from 'react';
import Road from '../Road/Road';
import './GameArea.scss';

export default class GameArea extends Component {
    state = { crashed: false, finalScore: 0, sleeping: false, drunk: false }
    isGameOver = () => this.setState({crashed: true})
    getFinalScore = score => this.setState({ finalScore: score })
    getSleepStatus = sleep => this.setState({sleeping: sleep})
    getDrunkStatus = drunk => this.setState({drunk})
    restartGame = () => this.setState({crashed: false})
    render(){
        let { sleeping, drunk } = this.state;
        let deathString = "";
        if (!sleeping && !drunk) deathString = 'RECKLESSNESS';
        else {
            if (sleeping) deathString += 'ASLEEP '
            if (drunk) deathString += 'DRUNK'
        }
        return(
            <div className="game-area">
                
                { this.state.crashed 
                    ?   <div className="game-area__overlay">
                            <h2 className="game-area__text">YOU DIED</h2>
                            <h2 className="game-area__text">CAUSE: {deathString}</h2>
                            <h2 className="game-area__text">Score: {this.state.finalScore}</h2>
                            <button onClick={this.restartGame}> P L A Y  A G A I N ? </button>
                        </div> 
                    :   <Road handler={this.isGameOver} scoreHandler={this.getFinalScore} sleepHandler={this.getSleepStatus} drunkHandler={this.getDrunkStatus} crashed={this.state.crashed}/>
                }
            </div>
        );
    }
}