import React, { Component } from 'react';
import './Score.scss';

export default class Score extends Component {
    state = { score: 0 }

    componentDidMount(){
        setInterval(()=>this.setState({score: this.state.score + 1}), 100)
    }

    componentDidUpdate(_,nextState){ 
        if (this.props.crashed) this.props.handler(this.state.score);
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