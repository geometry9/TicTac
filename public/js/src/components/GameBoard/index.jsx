import React from 'react';
import swal from 'sweetalert';
import req from 'superagent';

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
    return [null,null,null,
     null,null,null,
     null,null,null];
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
      if(b[check.list[i]] && b[check.list[i]] === b[check.list[i] + check.sum] &&
        b[check.list[i] + check.sum] === b[check.list[i] + check.sum * 2]){
        this.setState({ winner: b[check.list[i] + check.sum * 2] });
      }
    }
  }

  move(pos, player) {
    var matrix = this.state.boardMatrix;
    if(!matrix[pos]){
      matrix[pos] = (player === 'user') ? 'O' : 'X';
      this.setState({ boardMatrix: matrix }, this.checkWin());
    }else{
      swal({
        title: "Error!",
        text: "Wrong move!",
        type: "error",
        confirmButtonText: "Got it!"
      });
    }
    if (this.state.winner) {
      swal({
        title: "Winner!",
        text: `${this.state.winner} wins the game!`,
        type: "success",
        confirmButtonText: "Got it!"
      });
    }
  }

  computerMove(){
    const self = this;
    req.post('/plays')
      .send({ board: this.state.boardMatrix, player: 1 })
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.move(res.body.move, 'computer');
        self.setState({frozen: false});
      });
  }

  render() {
    const clickHandler = (e) => {
      if(!this.state.frozen && this.state.turn)
      this.move(e.target.dataset.cell, 'user');
      this.setState({frozen: true});
      this.computerMove();
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
