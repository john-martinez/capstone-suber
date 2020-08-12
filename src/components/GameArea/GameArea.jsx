import React, { Component } from 'react';
import Road from '../Road/Road';
import MainMenu from '../MainMenu/MainMenu';
import FrenchFryDude from '../FrenchFryDude/FrenchFryDude';
import HighScores from '../HighScores/HighScores';
import Logo from '../Logo/Logo';
import './GameArea.scss';
import dead from '../../assets/images/dead.png';
import hands from '../../assets/images/hands.png';
import lightning from '../../assets/images/lightning.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUndo, faTrophy } from '@fortawesome/free-solid-svg-icons'
import bgsound from '../../assets/sounds/main_menu.mp3';
import deadbg from '../../assets/sounds/dead.mp3';
import thunder from '../../assets/sounds/thunder.mp3';
import crash from '../../assets/sounds/crash.mp3';
import axios from 'axios';

export default class GameArea extends Component {
    state = { 
        crashed: false, 
        finalScore: 0, 
        sleeping: false, 
        drunk: false, 
        gameStart: false,
        clicked: false,
        playerName: '',
        showScores: false,
        isScoreSet: false,
    }
    audio = '';
    audio2 = '';
    audio3 = '';
    audio4 = '';
    isGameOver = () => this.setState({crashed: true})
    getFinalScore = score => this.setState({ finalScore: score })
    getSleepStatus = sleep => this.setState({sleeping: sleep})
    getDrunkStatus = drunk => this.setState({drunk})
    gameStart = () => this.setState({gameStart: true})
    gotoMainMenu = () => this.setState({gameStart: false, crashed: false, isScoreSet: false})
    restartGame = () => {
        this.audio3.play();
        this.refs.gameArea.style.backgroundColor = "white";
        this.refs.lightning.style.visibility = "visible";
        setTimeout(()=>{
            this.audio2.pause();
            this.refs.lightning.style.visibility = "hidden";
            this.refs.gameArea.style.backgroundColor = "#150336";
            this.refs.hand.style.height = "35%"; 
        }, 500);
        setTimeout(()=>this.setState({crashed: false, isScoreSet: false}), 2000)    
    }
    setPlayerNameAndStart = e => {
      e.preventDefault();
      const playerName = e.target.playerName.value;
      this.setState({ playerName, gameStart: true })
    }

    retrieveSpeech = () => {
        let speech = ['NOOOOOOOO HUHUHUHUHU', "Why didn't you just use a ride share app?"];

        if (this.state.drunk) 
            speech = [...speech,'Why did you even decide to drink and drive?']
        
        if (this.state.sleeping)
            speech = [...speech, "You fell asleep while driving"]
        if (!this.state.drunk && !this.state.sleeping)
            speech = [...speech, "Why were you driving recklessly!"];

            speech = [...speech, "You made a french fry cry!", "Now I'm a french CRY...", "Did it make you laugh?", "We'll never know cos you're dead :("]
        

        return speech;
    }
    componentDidMount(){ 
        document.addEventListener('click', ()=>{
            !this.state.clicked ? this.setState({clicked: true}) : this.a = '';
        })
        this.audio = new Audio(bgsound);
        this.audio.volume = 0.2;
        this.audio.addEventListener('ended', ()=>{
            this.audio.currentTime = 0;
            this.audio.play(); 
        }, false)

        this.audio2 = new Audio(deadbg);
        this.audio2.volume = 0.2;
        this.audio2.addEventListener('ended', ()=>{
            this.audio2.currentTime = 0;
            this.audio2.play(); 
        }, false)
        this.audio3 = new Audio(thunder);
        this.audio3.volume = 0.2;

        this.audio4 = new Audio(crash);
        this.audio4.volume = 0.2;
    }

    componentDidUpdate(){
        // this.audio3.pause();
        if (this.state.gameStart ){
            this.audio.pause();
            if (this.state.crashed) {
                this.audio2.currentTime = 2;
                this.audio2.play();
                this.audio4.play();
            }
        }
        else {
            this.audio.currentTime = 0;
            this.audio.play(); 
            this.audio2.pause();
        }
    
        if (this.state.crashed && this.state.finalScore){
            setTimeout(()=> { if (this.refs.overlay) this.refs.overlay.style.filter = "opacity(1)" }, 600)
            setTimeout(()=>{
                if (this.refs.container) this.refs.container.style.filter = "opacity(1)";
            }, 3000);
            if (!this.state.isScoreSet) {
              axios.post('https://suberapi.herokuapp.com/api/highscore', {
                playerName: this.state.playerName,
                playerScore: this.state.finalScore
              }).then(_=>this.setState({ isScoreSet: true }))
            }
        }

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
                { this.state.crashed && this.state.finalScore 
                    ?   <div className="game-area__overlay" ref="overlay">
                            <div className={`game-area__container `} ref="container">
                                <h2 className="game-area__text">Score: {this.state.finalScore}</h2>
                                <span 
                                  className="game-area__highscore-button"
                                  onClick={()=>this.setState({ showScores: !this.state.showScores })}>
                                  <FontAwesomeIcon icon={ faTrophy } />
                                </span>
                                { this.state.showScores 
                                ? <HighScores />
                                : <div className="game-area__img-container">
                                    <img className="game-area__img" src={dead} alt="tombstone"/>
                                    <span className="game-area__img-text1">R I P </span>
                                    <span className="game-area__img-text2">{this.state.playerName}</span>
                                    <span className="game-area__img-text3">{deathString}</span>
                                    <img className="game-area__img2" ref="hand" src={hands} alt="zombie hands"/>
                                  </div>
                              }
                                
                                <FrenchFryDude speech={this.retrieveSpeech()}/>
                                { !this.state.showScores && (<>
                                  <span className="game-area__button game-area__button--green" onClick={this.restartGame}>  <FontAwesomeIcon icon={faUndo}/>  </span>
                                  <span className="game-area__button game-area__button--blue" onClick={this.gotoMainMenu}> <FontAwesomeIcon icon={faHome}/> </span>
                                </>)}
                            </div>
                            <img className="game-area__lightning" src={lightning} alt="lightning" ref="lightning"/>
                        </div>  
                    :   this.state.gameStart
                        ? <Road handler={this.isGameOver} scoreHandler={this.getFinalScore} sleepHandler={this.getSleepStatus} drunkHandler={this.getDrunkStatus} crashed={this.state.crashed}/>
                        : this.state.clicked
                            ? <MainMenu setPlayerNameAndStart={this.setPlayerNameAndStart}/> 
                            : <div className="game-area__container--start">
                                <Logo />
                                <h3 className="game-area__blurb"> {`>> CLICK TO START <<`} </h3>
                            </div>
                }
            </div>
        );
    }
}