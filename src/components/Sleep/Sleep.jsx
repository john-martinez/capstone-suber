import React, { Component } from 'react';
import SleepBar from '../SleepBar/SleepBar';
import './Sleep.scss';

export default class Sleep extends Component {
    state = {sleep: 30}

    intervalId = 0;
    wakeUpCount = 0;
    a = 0;
    stillMounted = false;
    componentDidMount(){
        this.stillMounted = true;
        this.intervalId = setInterval(()=> this.state.sleep === 0 ? clearInterval(this.intervalId) : this.stillMounted ? this.setState({sleep: this.state.sleep - 1}) : this.a='', 1000)
        window.addEventListener('mousemove', ()=>{
            this.wakeUpCount += 0.1;
            if (this.wakeUpCount >= 30){
                this.wakeUpCount = 0;
                this.setState({sleep: 25});
            }
        })
    }

    componentDidUpdate(){
        if (this.state.sleep === 0){
            this.refs.eye.style.backgroundColor = "black";
        }
        if (this.props.crashed){
            clearInterval(this.intervalId);
            this.props.sleepHandler(this.state.sleep === 0 ? true : false)
        } 
    }
    isSleepy = () => {
        if (Math.floor(this.state.sleep % 5) === 0 && this.state.sleep < 21) return true;
        return false;
    }

    componentWillUnmount(){ clearInterval(this.intervalId); this.stillMounted = false;}
    render(){
        return(
            <>
                <div className="sleep" ref="eye">
                    <div className={`sleep__top ${ this.isSleepy() ? 'sleep--blink': '' }`}></div>
                    <div className={`sleep__bottom ${this.isSleepy() ? 'sleep--blink': '' }`}></div>
                </div>
                <SleepBar sleep={this.state.sleep}/>
            </>
        );
    }
}
