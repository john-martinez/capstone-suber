import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import CrashableObject from '../CrashableObject/CrashableObject';
import Score from '../Score/Score';
import RoadLines from '../RoadLines/RoadLines';
import blueCar from '../../assets/images/blue-car.png';
import greenCar from '../../assets/images/green-car.png';
import police from '../../assets/images/police-car.png';
import booze from '../../assets/images/booze.png';
import drive from '../../assets/sounds/drivingCutz.mp3';
import yellowCar from '../../assets/images/car-yellow.png';
import { isCompositeComponent } from 'react-dom/test-utils';
 
export default class Road extends Component {
  state = { 
    crashed: false, 
    intoxicated: 0
  }
  intervalId = 0;
  audio = "";
  componentDidMount(){
    this.audio = new Audio(drive);
    this.playSound();
    this.audio.addEventListener('ended', ()=>{
      this.audio.currentTime = 1;
      this.audio.play(); 
    }, false)
    this.forceUpdate(); // to initialize game
  }

  componentDidUpdate(){
    if (this.state.crashed){
      this.audio.pause(); 
      document.querySelector('.car').style.display = "none"; 
    } 
  } 
  crashed = () => this.setState({ crashed: true });
  intoxicated = () =>  {
    this.setState({intoxicated: 10})
    clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>{
      if (this.state.intoxicated !== 0)
       this.setState({ intoxicated: this.state.intoxicated - 1 })
      else {
        clearInterval(this.intervalId);
        this.setState({ intoxicated: 0})
      } 
    }, 1000);
  }

  shouldComponentUpdate(_,nextState){
    if (this.state.crashed === false && nextState.crashed === true)
      return true;
    if (this.state.crashed)
      return false;
    if (this.state.intoxicated > 0)
      return false;
    return true;
  }

  playSound = () => {this.audio.play() }
  render(){
    if (this.state.crashed) this.props.handler();
    return(
        <div className={`road ${this.state.intoxicated !== 0 ? "road--blurred" : '' }`} ref="road" >
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <Car intoxicated={this.state.intoxicated} img={yellowCar} crashed={this.crashed} crashableObj={this.state.otherCar1}/>       
          <CrashableObject left={"150px"} bottom={"700px"} objName="car2" crashed={this.crashed} img={police}/>
          <CrashableObject left={"50px"} bottom={"900px"} objName="car3" crashed={this.crashed}  img={greenCar}/>
          <CrashableObject left={"150px"} bottom={"1150px"} objName="car4" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"300px"} bottom={"1350px"} objName="car5" crashed={this.crashed}  img={greenCar}/>
          <CrashableObject left={"50px"} bottom={"1650px"} objName="car6" crashed={this.crashed}  img={police}/>
          <CrashableObject left={"0px"} bottom={"1100px"} objName="car7" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"50px"} bottom={"1000px"} objName="car8" crashed={this.crashed}  img={greenCar}/>
          <CrashableObject left={"350px"} bottom={"800px"} objName="booze1" crashed={this.intoxicated}  img={booze}/>
          <CrashableObject left={"350px"} bottom={"1800px"} objName="booze2" crashed={this.intoxicated}  img={booze}/>
          <Score handler={this.props.scoreHandler} crashed={this.state.crashed} intoxicated={this.state.intoxicated }/>
        </div>
    );
  }
}