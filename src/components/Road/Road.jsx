import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import CrashableObject from '../CrashableObject/CrashableObject';
import Sleep from '../Sleep/Sleep';
import Score from '../Score/Score';
import RoadLines from '../RoadLines/RoadLines';
import blueCar from '../../assets/images/blue-car.png';
import greenCar from '../../assets/images/green-car.png';
import police from '../../assets/images/police-car.png';
import booze from '../../assets/images/booze.png';
import drive from '../../assets/sounds/drivingCutz.mp3';
import yellowCar from '../../assets/images/car-yellow.png'; 
export default class Road extends Component {
  state = { 
    crashed: false, 
    intoxicated: 0
  }
  intervalId = 0;
  audio = "";
  a = '';
  stillMounted = false;
  componentDidMount(){
    this.stillMounted = true;
    this.audio = new Audio(drive);
    this.playSound();
    this.audio.addEventListener('ended', ()=>{
      this.audio.currentTime = 1;
      this.audio.play(); 
    }, false)
    // this.forceUpdate() // initialize game
  }

  componentDidUpdate(){
    if (this.state.crashed) { this.props.handler() }
    let car = document.querySelector('.car');
    console.log('PROPS', this.props.crashed)
    console.log('STATE', this.state.crashed)
    if (this.state.crashed){
      this.audio.pause(); 
      document.querySelector('.car').style.display = "none"; 
      this.props.drunkHandler(this.state.intoxicated > 0 ? true : false);
    } 
  } 
  crashed = () => this.stillMounted ? this.setState({ crashed: true }) : this.a = '';
  intoxicated = () =>  {
    this.stillMounted ? this.setState({intoxicated: 10}) : this.a = '';
    clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>{
      if (this.state.intoxicated !== 0)
      this.stillMounted ? this.setState({ intoxicated: this.state.intoxicated - 1 }) : this.a = '';
      else {
        clearInterval(this.intervalId);
        this.stillMounted ?  this.setState({ intoxicated: 0}) : this.a = '';
      } 
    }, 1000);
  }

  shouldComponentUpdate(_,nextState){
    if (this.state.crashed === false && nextState.crashed === true)
      return true;
    else if (this.state.crashed)
      return false;
    else if (this.state.intoxicated > 0)
      return false;
    else
        return true;
  }

  componentWillUnmount(){ this.stillMounted = false; }
  playSound = () => {this.audio.play() }
  render(){
    return(
      <div className={`road ${this.state.intoxicated !== 0 ? "road--blurred" : '' }`} ref="road" >
        <RoadLines crashed={this.state.crashed} />
        <RoadLines crashed={this.state.crashed} />
        <RoadLines crashed={this.state.crashed} />  
        <Car intoxicated={this.state.intoxicated} img={yellowCar} crashed={this.crashed} crashableObj={this.state.otherCar1}/>  
        <CrashableObject left="150px" bottom={`${window.innerHeight + 700}px`} objName="car2" crashed={this.crashed} didCrash={this.state.crashed} img={police}/>
        <CrashableObject left="50px"  bottom={`${window.innerHeight + 900}px`} objName="car3" crashed={this.crashed} didCrash={this.state.crashed} img={greenCar}/>
        <CrashableObject left="150px" bottom={`${window.innerHeight + 1150}px`} objName="car4" crashed={this.crashed} didCrash={this.state.crashed} img={blueCar}/>
        <CrashableObject left="50px"  bottom={`${window.innerHeight + 1650}px`} objName="car6" crashed={this.crashed} didCrash={this.state.crashed} img={police}/>
        <CrashableObject left="300px" bottom={`${window.innerHeight + 1350}px`} objName="car5" crashed={this.crashed} didCrash={this.state.crashed} img={greenCar}/>
        <CrashableObject left="0px"   bottom={`${window.innerHeight + 1100}px`} objName="car7" crashed={this.crashed} didCrash={this.state.crashed} img={blueCar}/>
        <CrashableObject left="50px"  bottom={`${window.innerHeight + 1000}px`} objName="car8" crashed={this.crashed} didCrash={this.state.crashed} img={greenCar}/>
        <CrashableObject left="350px" bottom={`${window.innerHeight + 800}px`} objName="booze1" crashed={this.intoxicated} didCrash={this.state.crashed} img={booze}/>
        <CrashableObject left="350px" bottom={`${window.innerHeight + 1800}px`} objName="booze2" crashed={this.intoxicated} didCrash={this.state.crashed}  img={booze}/> 
        <Score handler={this.props.scoreHandler} crashed={this.state.crashed} intoxicated={this.state.intoxicated }/>
        <Sleep crashed={this.state.crashed} sleepHandler={this.props.sleepHandler}/>
      </div>
    );
  }
}