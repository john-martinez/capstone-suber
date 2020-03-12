import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import RoadLines from '../RoadLines/RoadLines';

export default class Road extends Component {
  state = {roadSize: "", crashed: false}
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
          <Car roadSize={this.state.roadSize} crashed={this.crashed} />
        </div>
    );
  }
}