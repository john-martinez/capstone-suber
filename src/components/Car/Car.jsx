import React, { Component } from 'react';
import yellowCar from '../../assets/images/car-yellow.png';
import './Car.scss';

export default class Car extends Component {
    state = { left: this.props.left || '', bottom: this.props.bottom || '' , keyState: {w: false, a: false, s: false, d: false}}
    intervalId1 = "";
    getCssProperty = (elmId, property) => {
        let elem = this.refs.car;
        return getComputedStyle(elem,null).getPropertyValue(property);
    }

    turnLeft = () => this.setState({left: `${parseInt(this.state.left.split('px')[0]) - 5}px`})
    turnRight = () => this.setState({left: `${parseInt(this.state.left.split('px')[0]) + 5}px`})
    goStraight = () => this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) + 5}px`})
    goBack = () => this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) - 5}px`})

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
                <img src={yellowCar} alt="main-car" className="car__image"/>
            </div>
        )
    }
}