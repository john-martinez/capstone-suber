import React, { Component } from 'react';
import awake from '../../assets/images/awake.png';
import asleep from '../../assets/images/asleep.png';
import sleepy from '../../assets/images/sleepy.png';
import snoozing from '../../assets/images/snoozing.png';
import booze from '../../assets/images/booze.png';
import './MainMenu.scss';

export default class MainMenu extends Component{
    state = {currentPage: "main"}
    content = "";
    render(){
        switch(this.state.currentPage){
            case "main": this.content = (<>
                <button className="main-menu__button" onClick={this.props.gameStart}>PLAY</button>
                <button className="main-menu__button" onClick={()=>this.setState({currentPage: 'instructions'})}>INSTRUCTIONS</button>
                <button className="main-menu__button">ABOUT</button> 
            </>)
            break;

            case "instructions": this.content =(<>
                <h2 className="main-menu__header"><span className="main-menu__back-button" onClick={()=>this.setState({currentPage: "main"})}>⬅</span> INSTRUCTIONS</h2> 
                <div className="main-menu__instructions-container">
                    <div className="main-menu__instructions">
                        <p><strong>MOVEMENT KEYS</strong></p>
                        <p><strong>W</strong>: Move Forward</p>
                        <p><strong>A</strong>: Move Forward</p>
                        <p><strong>S</strong>: Move Forward</p>
                        <p><strong>D</strong>: Move Forward</p>
                    </div>
                    <div className="main-menu__instructions">
                        <p><strong>DEALING WITH SLEEPINESS</strong> </p>
                        <img src={awake} alt="awake bar"/>
                        <p><strong>Keep shaking your mouse</strong> to fill up your bar back to green</p>
                        <img src={sleepy} alt="sleepy bar"/> <img src={snoozing} alt="snoozing bar"/>
                        <p>When you are <strong>snoozing</strong> or <strong>sleepy</strong>, your eyes will start to close </p>
                        <img src={asleep} alt="asleep bar"/>
                        <p><strong>Your screen will fade to black</strong> once your character falls <strong>asleep</strong> and will be <strong className="main-menu__text--emphasize">irreversible</strong></p>
                    </div>
                    <div className="main-menu__instructions">
                        <p><strong>DRIVING WHILE INTOXICATED</strong></p>
                        <img className="main-menu__instructions-pic" src={booze} alt="beer cup"/>
                        <p><strong>Picking up beer cups</strong> will cause you to be <span className="main-menu__text--emphasize">DRUNK</span></p>  
                        <p><strong>CONTROLS</strong> will be <span className="main-menu__text--emphasize">MIRRORED</span></p>
                        <p><strong>VISION</strong> will be <span className="main-menu__text--emphasize">BLURRED</span></p>
                        <p>EFFECTS WILL STAY FOR THE DURATION OF THE STATUS</p>
                    </div>
                </div>
            </>)
        }
        return(
            <div className="main-menu">
                <h1 className="main-menu__header">SÜBER</h1>
                {this.content}
            </div>
        );
    }
}