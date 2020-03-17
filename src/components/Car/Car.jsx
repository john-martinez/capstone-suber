import React, { Component } from 'react';
import yellowCar from '../../assets/images/car-yellow.png';
import './Car.scss';

export default class Car extends Component {
    state = { left: this.props.left || '', bottom: this.props.bottom || '' }

    getCssProperty = (elmId, property) => {
        let elem = this.refs.car;
        return getComputedStyle(elem,null).getPropertyValue(property);
    }

    turnLeft = () => this.setState({left: `${parseInt(this.state.left.split('px')[0]) - 40}px`})
    turnRight = () => this.setState({left: `${parseInt(this.state.left.split('px')[0]) + 40}px`})
    goStraight = () => this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) + 40}px`})
    goBack = () => this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) - 40}px`})

    componentDidMount(){
        let left = this.getCssProperty("car", "left");
        let bottom = this.getCssProperty("car", "bottom");
        this.setState({left, bottom});
        document.addEventListener('keypress', e=>{
          switch(e.key.toLowerCase()){
            case 'a': this.turnLeft();
              break;

            case 'w': this.goStraight();
              break;
    
            case 'd': this.turnRight();
              break;
    
            case 's': this.goBack();
              break;
          }
        })
      }
      componentDidUpdate(_, prevState){
        let { car } = this.refs;
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