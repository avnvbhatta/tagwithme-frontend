import React from 'react';
import "./button.scss";
const Button = (props) => {
    return ( 
        <button className={props.className}>
            {props.content}
        </button>
     );
}

export default Button;
 