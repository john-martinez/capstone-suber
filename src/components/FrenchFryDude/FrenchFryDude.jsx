import React, { Component } from 'react';
import './FrenchFryDude.scss';
import fries from '../../assets/images/fries.png';
import eye from '../../assets/images/eye.png';
import speechBubble from '../../assets/images/speech-bubble.png';

export default class FrenchFryDude extends Component {
    state = {speech: ''}

    speechArr = [ 
        'testtest test test test',
        'test test test 2testtest',
        'testtest 3test test',
        'test4'
    ]
    ctr = 1;
    componentDidMount(){
        this.setState({speech: this.speechArr[0]});
        setInterval(()=>{
            console.log(this.ctr);
            this.setState({speech: this.speechArr[this.ctr]})
            this.ctr < this.speechArr.length-1 ? this.ctr++ : this.ctr = 0;
        }, 5000);
    }
    render(){
        return(
            <div className="french-fry-dude__container">
                <img className="french-fry-dude" src={fries} alt="fries guy"/>
                <img className="french-fry-dude__left-eye" src={eye} alt="eye"/>
                <img className="french-fry-dude__right-eye" src={eye} alt="eye"/>
                <img className="french-fry-dude__bubble" src={speechBubble} alt="speech bubble"/>
                <p className="french-fry-dude__blurb">{this.state.speech}</p>
            </div>
        )
    }
}