import React from 'react';
import { uniq } from 'lodash';

class GameBoard extends React.Component {

  constructor() {
    super();
    this.state = {
      stalemate: false,
      winner: false,
      boardMatrix: this.clearBoard(),
      turn: true,
      frozen: false,
    };
  }

  clearBoard() {
    return [0,0,0,
     0,0,0,
     0,0,0];
  }

  checkWin(){
    const horizontalCheck = {list: [0,3,6], sum: 1 };
    const verticalCheck = {list: [0,1,2], sum: 3 };
    const diagonalCheck1 = {list: [0], sum: 4};
    const diagonalCheck2 = {list: [2], sum: 2};

    if(!this.state.winner){
      this.iterateArray(horizontalCheck);
    }
    if(!this.state.winner){
      this.iterateArray(verticalCheck);
    }
    if(!this.state.winner){
      this.iterateArray(diagonalCheck1);
    }
    if(!this.state.winner){
      this.iterateArray(diagonalCheck2);
    }
  }

  iterateArray(check){
    const b = this.state.boardMatrix;
    for (var i = 0; i < check.list.length; i++) {
      console.log('Checking these items: ', b[check.list[i]], b[check.list[i] + check.sum], b[check.list[i] + check.sum * 2]);

      // console.log(b[check.list[i]], b[check.list[i + check.sum]],
      //   b[check.list[i + check.sum]], b[check.list[i + check.sum * 2]]);

      if(b[check.list[i]] && b[check.list[i]] === b[check.list[i] + check.sum] &&
        b[check.list[i] + check.sum] === b[check.list[i] + check.sum * 2]){
        this.setState({ winner: true });
      }
    }
  }

  move(pos, player) {
    var matrix = this.state.boardMatrix;
    if(!matrix[pos]){
      matrix[pos] = (player === 'user') ? 'o' : 'x';
      this.setState({ boardMatrix: matrix }, this.checkWin());
    }else{
      console.log('wrong move bucko');
    }
    console.log(this.state)
    if (this.state.winner) {
      alert('win')
    } else {
      console.log('keep playin');
    }
  }

  render() {
    const clickHandler = (e) => {
      if(!this.state.frozen && this.state.turn)
      this.move(e.target.dataset.cell, 'user');
    }

    return (
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div key={ 0 } onClick={ clickHandler } data-cell={ 0 }>{this.state.boardMatrix[0]}</div>
          </div>
          <div className="col-3">
            <div key={ 1 } onClick={ clickHandler } data-cell={ 1 }>{this.state.boardMatrix[1]}</div>
          </div>
          <div className="col-3">
            <div key={ 2 } onClick={ clickHandler } data-cell={ 2 }>{this.state.boardMatrix[2]}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div key={ 3 } onClick={ clickHandler } data-cell={ 3 }>{this.state.boardMatrix[3]}</div>
          </div>
          <div className="col-3">
            <div key={ 4 } onClick={ clickHandler } data-cell={ 4 }>{this.state.boardMatrix[4]}</div>
          </div>
          <div className="col-3">
            <div key={ 5 } onClick={ clickHandler } data-cell={ 5 }>{this.state.boardMatrix[5]}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div key={ 6 } onClick={ clickHandler } data-cell={ 6 }>{this.state.boardMatrix[6]}</div>
          </div>
          <div className="col-3">
            <div key={ 7 } onClick={ clickHandler } data-cell={ 7 }>{this.state.boardMatrix[7]}</div>
          </div>
          <div className="col-3">
            <div key={ 8 } onClick={ clickHandler } data-cell={ 8 }>{this.state.boardMatrix[8]}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
