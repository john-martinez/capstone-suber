import React from 'react';
import './SleepBar.scss';

export default function SleepBar(props){
    let barClass = "";
    let sleepStatus = "A W A K E";
    if (props.sleep === 0) sleepStatus = "A S L E E P";
    else if (props.sleep <= 10) {
        barClass="progress-bar__value--red";
        sleepStatus = "S N O O Z I N G"
    }
    else if (props.sleep <= 20){
        barClass="progress-bar__value--orange";
        sleepStatus="S L E E P Y"
    } 
    else  barClass="";
    return(
        <div className="progress-bar">
            
            <div className={`progress-bar__value ${barClass}`} 
            style={{width: `${(props.sleep/30)*100}%`}}>
            </div>
            <div className="progress-bar__text">{sleepStatus}</div>
        </div>
    );
}