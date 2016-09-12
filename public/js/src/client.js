import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './components/GameBoard/index.jsx';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1 className="gameTitle">Tic Tac Toe</h1>
        <GameBoard />
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
