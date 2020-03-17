import React, { Component } from 'react';
import './Score.scss';

export default class Score extends Component {
    state = { score: 0 }

    componentDidMount(){
        setInterval(()=>this.setState({score: this.state.score + 1}), 100)
    }
    
    shouldComponentUpdate(_,prevProps){
        return !this.props.crashed;
    }
    render(){
        return(
            <div className="score">
                <p>{this.state.score}</p>
            </div>
        );
    }
}