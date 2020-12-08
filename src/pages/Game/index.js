import React, {useState} from 'react';
import Board from '../../components/Board'
import calculateWinner from '../../utils/calculateWinner'

const Game = () => {
    const [history,setHistory] = useState ([{squares: Array(9).fill(null)}]);
    const [stepNumber,setStepNumber] = useState (0);
    const [xIsNext,setXIsNext] = useState (true);
    const [movment,setMovment] = useState ([]);

    const handleClick = i => {
        const historyCopy = history.slice(0, stepNumber + 1);
        const movmentCopy = movment.slice(0, stepNumber + 1);
        const current = historyCopy[historyCopy.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setMovment(movmentCopy.concat(i));
        setHistory(historyCopy.concat([{squares: squares}]));
        setStepNumber( historyCopy.length);
        setXIsNext (!xIsNext);
      }
    const jumpTo= step => {
       
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
       
        
      }
    
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + '  Last move' + 'C' +((movment[move-1]%3)+1) + 'F' +((Math.floor(movment[move-1]/3))+1)  :
        'Go to game start';
        
        return (
            <li key = {move}>
              <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
          );
        });
      
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
};

export default Game;