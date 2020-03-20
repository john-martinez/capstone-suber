import React, { Component } from 'react';
import './Sleep.scss';

export default class Sleep extends Component {
    state = {sleep: 30}

    intervalId = 0;
    wakeUpCount = 0;
    componentDidMount(){
        this.intervalId = setInterval(()=>this.setState({sleep: this.state.sleep - 1}), 1000)
        window.addEventListener('mousemove', ()=>{
            this.wakeUpCount += 0.1;
            if (this.wakeUpCount >= 30){
                this.wakeUpCount = 0;
                this.setState({sleep: 25});
            }
        })
    }

    componentDidUpdate(){
        console.log(this.state.sleep)
        if (this.state.sleep === 0){
            this.refs.eye.style.backgroundColor = "black";
        }
    }
    isSleepy = () => {
        if (Math.floor(this.state.sleep % 5) === 0 && this.state.sleep < 21) return true;
        return false;
    }

    render(){
        return(
            <div className="sleep" ref="eye">
                <div className={`sleep__top ${ this.isSleepy() ? 'sleep--blink': '' }`}></div>
                <div className={`sleep__bottom ${this.isSleepy() ? 'sleep--blink': '' }`}></div>
            </div>
        );
    }
}
