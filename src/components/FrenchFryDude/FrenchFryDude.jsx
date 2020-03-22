import React, { Component } from 'react';
import './FrenchFryDude.scss';
import fries from '../../assets/images/friesflowers.png';
import eye from '../../assets/images/eye.png';
import speechBubble from '../../assets/images/speech-bubble.png';


export default class FrenchFryDude extends Component {
    state = {speech: ''}

    ctr = 1;
    intervalId = 0;
    componentDidMount(){
        this.setState({speech: this.props.speech[0]});
        this.intervalId = setInterval(()=>{
            this.setState({speech: this.props.speech[this.ctr]})
            this.ctr < this.props.speech.length-1 ? this.ctr++ : this.ctr = 0;
        }, 5000);
    }
    componentWillUnmount(){ clearInterval(this.intervalId) }
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