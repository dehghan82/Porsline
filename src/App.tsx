import React from 'react';
import Game from './components/game';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Wordle Game</h1>
      <Game />
    </div>
  );
};

export default App;
