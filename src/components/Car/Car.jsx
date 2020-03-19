import React, { Component } from 'react';
import './Car.scss';

export default class Car extends Component {
    state = { left: this.props.left || '', bottom: this.props.bottom || '' , keyState: {w: false, a: false, s: false, d: false}}
    intervalId1 = "";
    getCssProperty = (elmId, property) => {
        let elem = this.refs.car;
        return getComputedStyle(elem,null).getPropertyValue(property);
    }

    turnLeft = () => {
      let left = `${parseInt(this.state.left.split('px')[0]) - 5}px`;
      if (parseInt(this.state.left.split('px')[0]) - 7 < 0) left = "0px";
      this.setState({left})
    }
    turnRight = () => {
      let left = `${parseInt(this.state.left.split('px')[0]) + 5}px`;
      if (parseInt(this.state.left.split('px')[0]) + 7 > 440) left = "440px";
      this.setState({left})
    }
    goStraight = () => {
      let roadHeight = document.querySelector('.road').offsetHeight;
      let bottom = `${parseInt(this.state.bottom.split('px')[0]) + 5}px`
      if (parseInt(this.state.bottom.split('px')[0]) + 7 > roadHeight - 90) bottom = `${roadHeight-90}px`;
      this.setState({bottom})
    } 
    goBack = () =>{
      let bottom = `${parseInt(this.state.bottom.split('px')[0]) - 5}px`
      if (parseInt(this.state.bottom.split('px')[0]) - 7 < 0) bottom = "0px";
      this.setState({bottom})
    }

    componentDidMount(){
        let left = this.getCssProperty("car", "left");
        let bottom = this.getCssProperty("car", "bottom");
        this.setState({left, bottom});
        document.addEventListener('keydown', e=>{
          let keyState = this.state.keyState;
          keyState[e.key] = true;
          this.setState({keyState});
        })
        document.addEventListener('keyup', e=>{
          let keyState = this.state.keyState;
          keyState[e.key] = false;
          this.setState({keyState});
        })
      }

      componentDidUpdate(_, prevState){
        let { car } = this.refs;
        clearInterval(this.intervalId1);
        this.intervalId1 = setInterval(()=>{
          this.state.keyState['a'] ? this.props.intoxicated !== 0 ? this.turnRight() : this.turnLeft() : clearInterval(this.intervalId1)
          this.state.keyState['w'] ? this.props.intoxicated !== 0 ? this.goBack() : this.goStraight()  : clearInterval(this.intervalId2)
          this.state.keyState['s'] ? this.props.intoxicated !== 0 ? this.goStraight() : this.goBack() : clearInterval(this.intervalId3)
          this.state.keyState['d'] ? this.props.intoxicated !== 0 ? this.turnLeft() : this.turnRight()  : clearInterval(this.intervalId4)
        }, 10)

        car.style.left = this.state.left;
        car.style.bottom = this.state.bottom;
        if ( parseInt(this.state.left.split("px")[0]) + 25 < 0 || 
          parseInt(this.state.left.split("px")[0]) + 30 > this.props.roadSize )
          this.props.crashed();
    }
    render(){       
        return (
            <div className="car" ref="car" id="car">
                <img src={this.props.img} alt="main-car" className="car__image"/>
            </div>
        )
    }
}