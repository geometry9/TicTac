import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './components/GameBoard/index.jsx';

class Main extends React.Component {
  render() {
    return (
      <div>
        <GameBoard />
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
