import React from 'react';
import GameArea from './components/GameArea/GameArea';
import './App.scss';

export default function App() {
  document.title = "Süber game";
  return (
    <div className="app">
      <GameArea />
    </div>
  );
}


