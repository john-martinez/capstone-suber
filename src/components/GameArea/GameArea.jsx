import React from 'react';
import Road from '../Road/Road';
import './GameArea.scss';

export default function GameArea(){
    return(
        <div className="game-area">
            <Road />
        </div>
    );
}