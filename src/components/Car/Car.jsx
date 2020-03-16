import React, { Component } from 'react';
import yellowCar from '../../assets/images/car-yellow.png';
import './Car.scss';

export default class Car extends Component {
    state = { left: '', bottom: '' }
    getCssProperty = (elmId, property) => {
        let elem = this.refs.car;
        return getComputedStyle(elem,null).getPropertyValue(property);
    }

    componentDidMount(){
        let left = this.getCssProperty("car", "left");
        let bottom = this.getCssProperty("car", "bottom");
        let { car } = this.refs;
        this.setState({left, bottom});
        document.addEventListener('keypress', e=>{
          switch(e.key.toLowerCase()){
            case 'a': this.setState({left: `${parseInt(this.state.left.split('px')[0]) - 40}px`})
                    break;
    
            case 'w': this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) + 40}px`})
                    break;
    
            case 'd': this.setState({left: `${parseInt(this.state.left.split('px')[0]) + 40}px`})
                    break;
    
            case 's': this.setState({bottom: `${parseInt(this.state.bottom.split('px')[0]) - 40}px`})
                    break;
          }
        })
      }
      componentDidUpdate(_, prevState){
        let { car } = this.refs;
        car.style.left = this.state.left;
        car.style.bottom = this.state.bottom;
        console.log(parseInt(this.state.left.split("px")[0]) + 25 < 0 || 
        parseInt(this.state.left.split("px")[0]) + 30 > this.props.roadSize 
        ? this.props.crashed() 
        : 'still good');
      }
    render(){
      console.log(this.props.roadSize);
        return (
            <div className="car" ref="car" id="#car">
                <img src={yellowCar} alt="main-car" className="car__image"/>
            </div>
        )
    }
}