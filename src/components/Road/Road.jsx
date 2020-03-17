import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import CrashableObject from '../CrashableObject/CrashableObject';
import RoadLines from '../RoadLines/RoadLines';

export default class Road extends Component {
  state = {
    roadSize: "", 
    crashed: false, 
    otherCar1:{name: 'car', left: '50px', bottom:'500px'}, 
    otherCar2:{name: 'car', left: '300px', bottom:'500px'}
  }

  componentDidMount(){
    this.setState({roadSize: this.refs.road.offsetWidth})
  }

  crashed = () => this.setState({crashed: true});
  shouldComponentUpdate(){
    return !this.state.crashed;
  }
  render(){
    return(
        <div className="road" ref="road" >
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <RoadLines crashed={this.state.crashed} />
          <Car roadSize={this.state.roadSize} crashed={this.crashed} crashableObj={this.state.otherCar1}/>       
          <CrashableObject left={"150px"} bottom={"700px"} objName="car2" crashed={this.crashed}/>
          <CrashableObject left={"50px"} bottom={"900px"} objName="car3" crashed={this.crashed} />
          <CrashableObject left={"150px"} bottom={"1150px"} objName="car4" crashed={this.crashed}/>
          <CrashableObject left={"300px"} bottom={"1350px"} objName="car5" crashed={this.crashed}/>
          <CrashableObject left={"50px"} bottom={"1650px"} objName="car7" crashed={this.crashed}/>
          <CrashableObject left={"350px"} bottom={"1800px"} objName="car8" crashed={this.crashed}/>
        </div>
    );
  }
}