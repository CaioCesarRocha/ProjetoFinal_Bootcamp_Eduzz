import React from 'react';
import * as S from './styled';

const Button = ({text}) => {
    return(
        <S.WrapperContentButton>
            <button type='submit' style={{fontSize: 23, justifyContent: 'space-between'}}>          
                {text}                         
            </button>
        </S.WrapperContentButton>
    )
}

export default Button;