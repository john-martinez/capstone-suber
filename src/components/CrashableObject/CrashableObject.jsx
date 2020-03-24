import React, { Component } from 'react';
import './CrashableObject.scss';


export default class CrashableObject extends Component {
    state = { left: this.props.left, bottom: this.props.bottom}
    
    gameTime = 0;
    speed = 15;
    timeoutId = 0;
    intervalId = 0;
    a='';
    stillMounted = false;
    handler = (bottom, left="") => this.stillMounted ? left ? this.setState({ bottom: bottom + "px", left }) : this.setState({ bottom: bottom + "px" }) : this.a='';
    componentDidMount(){
        this.stillMounted = true;
        this.intervalId = setInterval(()=>{
            this.gameTime++;
            if (this.gameTime % 5 === 0) this.speed++;
        }, 1000)
        this.forceUpdate();
    }
    componentDidUpdate(_,prevState){
        let obj = document.querySelector(`.${this.props.objName}`);
        if (this.state.bottom.split('px')[0] === this.props.bottom.split('px')[0]){ obj.style.display = "block"; }
        let car = document.querySelector('#car');
        let obsLeft = parseInt(this.state.left.split('px')[0]);
        let obsBottom =  parseInt(this.state.bottom.split('px')[0])+15;
        let obsTop = obsBottom + 70;
        let obsRight = obsLeft + 40;
        let carLeft = parseInt(car.style.left.split("px")[0]);
        let carBottom = parseInt(car.style.bottom.split("px")[0]);
        let carRight = carLeft + 40;
        let carTop = carBottom + 80;
        let a;

        if ( carTop < obsBottom || carLeft > obsRight || carRight < obsLeft || carBottom > obsTop) 
            a = '';
        else {
            this.props.crashed();
            obj.style.display = "none";
        }

        if (obj){
            let newBottom =  parseInt(obj.style.bottom.split('px')[0]) - this.speed;
            let left = "";
            obj.style.left = this.state.left;
            obj.style.bottom = this.state.bottom;
            if (newBottom < -100){
                newBottom = this.props.bottom.split('px')[0];
                left = Math.floor(Math.random()*430) + "px";
                obj.style.display = 'none';
            }
            this.timeoutId = setTimeout(()=>this.handler(newBottom, left), 50)
        }
    }   

    componentWillUnmount(){
        this.stillMounted = false;
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
    }
    
    render(){
        return (
            <div className={`crashable ${this.props.objName}`}>
                <img src={this.props.img} alt="blue-car" className="crashable__img" />
            </div>
        );
    }
}