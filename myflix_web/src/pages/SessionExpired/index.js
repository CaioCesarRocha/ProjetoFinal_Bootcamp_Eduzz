import React, {useEffect} from 'react';

import * as S from './styled';
import Menu from '../../components/menu';

const SessionExpired = () => {

    useEffect(() => {
        sessionStorage.setItem('user', {});
        sessionStorage.setItem('signed', false);  
    }, []);

    return(
        <S.WrapperContent>
             <Menu/>
             <h1>sesssão expiradaaaaaaa</h1>
        </S.WrapperContent>
       
    )
} 


export default SessionExpired;