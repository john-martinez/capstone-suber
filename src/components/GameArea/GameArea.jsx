import React, { Component } from 'react';
import Road from '../Road/Road';
import './GameArea.scss';

export default class GameArea extends Component {
    state = { crashed: false }
    isGameOver = () => this.setState({crashed: true})

    componentDidUpdate(){ 
        document.querySelector('.road').style.filter = "grayscale(100%) blur(3px)"; 
    }
    render(){
        return(
            <div className="game-area">
                <Road handler={this.isGameOver}/>
                { this.state.crashed 
                ? <div className="game-area__overlay">
                    <h1 className="game-area__text">YOU DIED</h1>
                </div> 
                : ''}
            </div>
        );
    }
}