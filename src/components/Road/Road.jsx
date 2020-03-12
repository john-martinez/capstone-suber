import React from 'react';
import '../RoadLines/RoadLines';
import './Road.scss';
import Car from '../Car/Car';
import RoadLines from '../RoadLines/RoadLines';

export default function Road() {
  return(
      <div className="road">
        <RoadLines />
        <RoadLines />
        <RoadLines />
        <Car />
      </div>
  );
}