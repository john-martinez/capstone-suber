import React, { Component } from 'react';
import './CrashableObject.scss';
import blueCar from '../../assets/images/blue-car.png'

export default class CrashableObject extends Component {
    state = { left: this.props.left, bottom: this.props.bottom }
    handler = (bottom, left="") => {
        if (left){
            this.setState({ bottom: bottom + "px", left })
        } else 
            this.setState({ bottom: bottom + "px" })
    } 
    componentDidUpdate(_,prevState){
        let car = document.querySelector('#car');
        let obsLeft = parseInt(this.state.left.split('px')[0]);
        let obsBottom =  parseInt(this.state.bottom.split('px')[0]);
        let obsTop = obsBottom + 50;
        let obsRight = obsLeft + 40;
        let carLeft = parseInt(car.style.left.split("px")[0]);
        let carBottom = parseInt(car.style.bottom.split("px")[0]);
        let carRight = carLeft + 40;
        let carTop = carBottom + 80;
        let a;

        if ( carTop < obsBottom || carLeft > obsRight || carRight < obsLeft || carBottom > obsTop) 
            a = '';
        else 
          this.props.crashed();

        let obj = document.querySelector(`.${this.props.objName}`);
        if (obj){
            let newBottom =  parseInt(obj.style.bottom.split('px')[0]) - 30;
            let left = "";
            obj.style.left = this.state.left;
            obj.style.bottom = this.state.bottom;
            if (newBottom < -100){
                newBottom = this.props.bottom.split('px')[0];
                left = Math.floor(Math.random()*400) + "px";
            }
            setTimeout(()=>this.handler(newBottom, left), 50)
        } 
    }   
    
    render(){
        return (
            <div className={`crashable ${this.props.objName}`}>
                <img src={blueCar} alt="blue-car" className="crashable__img" />
            </div>
        );
    }
}