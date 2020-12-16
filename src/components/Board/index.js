import React from 'react';
import Square from '../Square';



const Board = (props) => {

    
    const renderSquare = i => { 
       
        return (<Square value = {props.squares[i]}
          onClick={()=> props.onClick(i)} key = {i} bright = {  (props.highlight != null &&  props.highlight.includes(i))  ?  true : false  } />
        );
      }

    const bucleIntern = (j) => {
      return [0,1,2].map((value,index) => {
        return renderSquare(j + value);
      })         
    }
   

    const bucleExtern = () => {
      return [0,3,6].map((value,index) => {
        return (
          <div className="board-row" key ={value}>
            {bucleIntern(value)}
          </div>    
        )
      })
      
    }


    return (
      <div>
        {bucleExtern()}
      </div>    
    )
};

export default Board;
