import React from 'react';
import GameArea from './components/GameArea/GameArea';
import SideWindow from './components/SideWindow/SideWindow';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <GameArea />
      <SideWindow />
    </div>
  );
}


