import React from 'react';
import GameArea from './components/GameArea/GameArea';
import SideWindow from './components/SideWindow/SideWindow';
import './App.scss';

export default function App() {
  document.title = "Süber game";
  return (
    <div className="app">
      <GameArea />
    </div>
  );
}


