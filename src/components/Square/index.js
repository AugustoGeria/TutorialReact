import React from 'react';

const Square = (props) => {
    return (
        <button className={ props.bright ?"squareBright": "square"}
        onClick = {props.onClick}>
          {props.value}
        </button>  
    
    );
};

export default Square;
