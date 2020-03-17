import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import CrashableObject from '../CrashableObject/CrashableObject';
import Score from '../Score/Score';
import RoadLines from '../RoadLines/RoadLines';
import blueCar from '../../assets/images/blue-car.png';
import booze from '../../assets/images/booze.png';

export default class Road extends Component {
  state = {
    roadSize: "", 
    crashed: false, 
    intoxicated: 0
  }
  
  intervalId = 0;
  componentDidMount(){
    this.setState({ roadSize: this.refs.road.offsetWidth })
  }

  crashed = () => this.setState({ crashed: true });
  intoxicated = () =>  {
    this.setState({intoxicated: 15 })
    clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>this.setState({ intoxicated: this.state.intoxicated - 1 }), 1000);
  }

  shouldComponentUpdate(_,nextState){
    console.log(this.state);
    if (this.state.crashed === false && nextState.crashed === true)
      return true;
    if (this.state.crashed)
      return false;
    if (this.state.intoxicated > 0)
      return false;
    return true;
  }

  render(){
    return(
        <div className="road" ref="road" >
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <Car roadSize={this.state.roadSize} crashed={this.crashed} crashableObj={this.state.otherCar1}/>       
          <CrashableObject left={"150px"} bottom={"700px"} objName="car2" crashed={this.crashed} img={blueCar}/>
          <CrashableObject left={"50px"} bottom={"900px"} objName="car3" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"150px"} bottom={"1150px"} objName="car4" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"300px"} bottom={"1350px"} objName="car5" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"50px"} bottom={"1650px"} objName="car7" crashed={this.crashed}  img={blueCar}/>
          <CrashableObject left={"350px"} bottom={"1800px"} objName="car8" crashed={this.intoxicated}  img={booze}/>
          <Score crashed={this.state.crashed} intoxicated={this.state.intoxicated}/>
        </div>
    );
  }
}