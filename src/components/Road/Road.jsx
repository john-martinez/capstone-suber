import React, { Component } from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import RoadLines from '../RoadLines/RoadLines';

export default class Road extends Component {
  state = {roadSize: ""}
  componentDidMount(){
    this.setState({roadSize: this.refs.road.offsetWidth})
  }

  componentDidUpdate(_,prevState){
    console.log(this.state)
  }
  render(){
    return(
        <div className="road" ref="road" >
          <RoadLines />
          <RoadLines />
          <RoadLines />
          <Car roadSize={this.state.roadSize} />
        </div>
    );
  }
}