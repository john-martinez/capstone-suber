import React from 'react';
import './Logo.scss';
import logo from '../../assets/images/logo.png';
import wheel from '../../assets/images/wheel.png';

export default function Logo(){
    return (
        <div className="logo">
            <img className="logo__img" src={logo} alt="car"/>
            <h1 className="logo__text">S U B E R</h1>
            <img className="logo__wheel1" src={wheel} alt="wheel"/>
            <img className="logo__wheel2" src={wheel} alt="wheel"/>
        </div>
    );
}