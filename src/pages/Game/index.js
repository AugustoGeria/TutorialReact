import React, { useState} from 'react';
import Board from '../../components/Board'
import calculateWinner from '../../utils/calculateWinner'
import  './styles.css'

const Game = () => {
    const [history,setHistory] = useState ([{squares: Array(9).fill(null)}]);
    const [stepNumber,setStepNumber] = useState (0);
    const [xIsNext,setXIsNext] = useState (true);
    const [movment,setMovment] = useState ([]);
    const [ascOrder,setAscOrder] = useState (true); 

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
    const line = calculateWinner(current.squares);
    const moves = history.map((step, move) => { 
      const desc = move ?
        'Go to move #' + move + '  Last move  C' +((movment[move-1]%3)+1) + 'F' +((Math.floor(movment[move-1]/3))+1)  :
        'Go to game start';
        
          return (          
            <li key = {move}>
              <button onClick={() => jumpTo(move)} className = {( move === stepNumber) ? 'currentMove' : ''}>{desc}</button>
            </li>
            );              
        }
      )
    const sortedMoves = ascOrder? moves : moves.reverse();  
    let status;
    if (line) {
      const winner = current.squares[line[0]]
      status = 'Winner: ' + winner;
    } else {
      history.length === 10 ?status= 'Empate': status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }
    return (
        <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => handleClick(i)} highlight={line? line : null }/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{sortedMoves}</ol>
        </div>
        <button onClick = {()=> setAscOrder(!ascOrder)}>Reverse
        </button>  
      </div>
    );
};

export default Game;
