import React from 'react';
//import * as S from './styled';

const Button = ({text}) => {
    return(
        <button type='submit' style={{fontSize: 23}}>          
            {text}
            
        </button>
    )
}

export default Button;