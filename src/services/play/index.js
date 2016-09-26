'use strict';
import { random } from 'lodash';

const hooks = require('./hooks');

class AI {
  constructor(board){
    this.state = {
      board: board,
      maxPlayer: 'X',
      minPlayer: 'O',
    };
    const probability = 70;
    const r = random(1, 100);
    let move = null;
    if(r < probability){
        move = this.findMove(this.state.board);
    } else {
      move = this.dumbMove();
    }

    return { move };
  }

  dumbMove(){
   for (var i = 0; i < this.state.board.length; i++) {
     if(!this.state.board[i]){
       return i;
     }
   }
  }

  setMinMaxPlayers(maxPlayer, minPlayer) {
      this.minPlayer = minPlayer;
      this.maxPlayer = maxPlayer;
  }

  cloneBoard(board) {
      return board.slice(0);
  }

  checkWinner(player, board) {
      if (
          (board[0] === player && board[1] === player && board[2] === player) ||
          (board[3] === player && board[4] === player && board[5] === player) ||
          (board[6] === player && board[7] === player && board[8] === player) ||
          (board[0] === player && board[3] === player && board[6] === player) ||
          (board[1] === player && board[4] === player && board[7] === player) ||
          (board[2] === player && board[5] === player && board[8] === player) ||
          (board[0] === player && board[4] === player && board[8] === player) ||
          (board[2] === player && board[4] === player && board[6] === player)
          ) {
          return true;
      } else {
          return false;
      }
  }

  checkTie(board) {
      for (var i = 0; i < board.length; i++) {
          if (board[i] === null) {
              return false;
          }
      }
      return true;
  }

  makeMove(move, player, board) {

      var newBoard = this.cloneBoard(board);
      if (newBoard[move] === null) {
          newBoard[move] = player;
          return newBoard;
      } else {
          return null;
      }
  }

  findMove(board) {
      var bestMoveValue = -100;
      var move = 0;
      for (var i = 0; i < board.length; i++) {
          var newBoard = this.makeMove(i, this.state.maxPlayer, board);
          if (newBoard) {
              var predictedMoveValue = this.minValue(newBoard);
              if (predictedMoveValue > bestMoveValue) {
                  bestMoveValue = predictedMoveValue;
                  move = i;
              }
          }
      }
      return move;
  }

  minValue(board) {

      if (this.checkWinner(this.state.maxPlayer, board)) {
          return 1;
      } else if (this.checkWinner(this.state.minPlayer, board)) {
          return -1;
      } else if (this.checkTie(board)) {
          return 0;
      } else {
          var bestMoveValue = 100;
          var move = 0;
          for (var i = 0; i < board.length; i++) {
              var newBoard = this.makeMove(i, this.state.minPlayer, board);
              if (newBoard) {
                  var predictedMoveValue = this.maxValue(newBoard);
                  if (predictedMoveValue < bestMoveValue) {
                      bestMoveValue = predictedMoveValue;
                      move = i;
                  }
              }
          }
          return bestMoveValue;
      }
  }

  maxValue(board) {
      if (this.checkWinner(this.state.maxPlayer, board)) {
          return 1;
      } else if (this.checkWinner(this.state.minPlayer, board)) {
          return -1;
      } else if (this.checkTie(board)) {
          return 0;
      } else {
          var bestMoveValue = -100;
          var move = 0;
          for (var i = 0; i < board.length; i++) {
              var newBoard = this.makeMove(i, this.state.maxPlayer, board);
              if (newBoard) {
                  var predictedMoveValue = this.minValue(newBoard);
                  if (predictedMoveValue > bestMoveValue) {
                      bestMoveValue = predictedMoveValue;
                      move = i;
                  }
              }
          }
          return bestMoveValue;
      }
  }
}
class Service {
  constructor(options) {
    this.options = options || {};
  }

  create(data, params) {
    const aiInstance = new AI(data.board);
    return Promise.resolve({ move: aiInstance.move });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/plays', new Service());

  // Get our initialize service to that we can bind hooks
  const playService = app.service('/plays');

  // Set up our before hooks
  playService.before(hooks.before);

  // Set up our after hooks
  playService.after(hooks.after);
};

module.exports.Service = Service;
