import React from 'react';

class GameBoard extends React.Component {

  constructor() {
    super();
    this.state = {
      stalemate: false,
      winner: false,
      boardMatrix: this.clearBoard(),
      turn: 0,
    };
  }

  clearBoard() {
    return [0,0,0,
     0,0,0,
     0,0,0];
  }

  checkWin(){
    console.log('checkingWinner');
  }

  move(pos, player) {
    const winner = this.checkWin();

    if (winner) {
      console.log('win')
    } else {
      callback();
    }
  }

  render() {
    const clickHandler = () => console.log('CLICKED!');

    return (
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div key={ 0 } onClick={ clickHandler } data-cell={ 0 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 1 } onClick={ clickHandler } data-cell={ 1 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 2 } onClick={ clickHandler } data-cell={ 2 }>-</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div key={ 3 } onClick={ clickHandler } data-cell={ 3 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 4 } onClick={ clickHandler } data-cell={ 4 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 5 } onClick={ clickHandler } data-cell={ 5 }>-</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div key={ 6 } onClick={ clickHandler } data-cell={ 6 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 7 } onClick={ clickHandler } data-cell={ 7 }>-</div>
          </div>
          <div className="col-3">
            <div key={ 8 } onClick={ clickHandler } data-cell={ 8 }>-</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
