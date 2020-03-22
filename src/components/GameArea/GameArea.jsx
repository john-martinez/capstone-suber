import React, { Component } from 'react';
import Road from '../Road/Road';
import MainMenu from '../MainMenu/MainMenu';
import FrenchFryDude from '../FrenchFryDude/FrenchFryDude';
import './GameArea.scss';
import dead from '../../assets/images/dead.png';
import hands from '../../assets/images/hands.png';
import lightning from '../../assets/images/lightning.png';

export default class GameArea extends Component {
    state = { crashed: true, finalScore: 2, sleeping: false, drunk: false, gameStart: true }
    isGameOver = () => this.setState({crashed: true})
    getFinalScore = score => this.setState({ finalScore: score })
    getSleepStatus = sleep => this.setState({sleeping: sleep})
    getDrunkStatus = drunk => this.setState({drunk})
    gameStart = () => this.setState({gameStart: true})
    gotoMainMenu = () => this.setState({gameStart: false, crashed: false})
    restartGame = () => {
          
        this.refs.gameArea.style.backgroundColor = "white";
        this.refs.lightning.style.visibility = "visible";
        setTimeout(()=>{
            this.refs.lightning.style.visibility = "hidden";
            this.refs.gameArea.style.backgroundColor = "#150336";
            this.refs.hand.style.height = "35%"; 
        }, 500);
        setTimeout(()=>this.setState({crashed: false}), 2000)    
    }
    render(){
        let { sleeping, drunk } = this.state;
        let deathString = "";
        if (!sleeping && !drunk) deathString = 'Died in a traffic accident due to recklessness';
        else {
            if (sleeping && drunk) deathString = 'Fell asleep while drunk driving. Dumbass'
            else if (sleeping) deathString = 'Fell asleep while driving'
            else if (drunk) deathString = 'Died in a traffic accident due to impaired driving from intoxication'
        }
        return(
            <div className="game-area" ref="gameArea">
                { this.state.crashed && this.state.finalScore > 0 
                    ?   <div className="game-area__overlay">
                            <div className="game-area__container">
                                <h2 className="game-area__text">Score: {this.state.finalScore}</h2>
                                <FrenchFryDude />
                                <div className="game-area__img-container">
                                    <img className="game-area__img" src={dead} alt="tombstone"/>
                                    <span className="game-area__img-text1">R I P </span>
                                    <span className="game-area__img-text2">YOU</span>
                                    <span className="game-area__img-text3">{deathString}</span>
                                    <img className="game-area__img2" ref="hand" src={hands} alt="zombie hands"/>
                                </div>
                                <button className="game-area__button" onClick={this.restartGame}> P L A Y  A G A I N </button>
                                <button className="game-area__button" onClick={this.gotoMainMenu}> M A I N   M E N U </button>
                            </div>
                            <img className="game-area__lightning" src={lightning} alt="lightning" ref="lightning"/>
                        </div>  
                    :   this.state.gameStart 
                        ? <Road handler={this.isGameOver} scoreHandler={this.getFinalScore} sleepHandler={this.getSleepStatus} drunkHandler={this.getDrunkStatus} crashed={this.state.crashed}/>
                        : <MainMenu gameStart={this.gameStart}/>
                }
            </div>
        );
    }
}