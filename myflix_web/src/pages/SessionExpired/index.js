import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import * as S from './styled';
import Menu from '../../components/menu';
import sessionExpired from '../../assets/session_expired.png';

const SessionExpired = () => {

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem('user', {});
        sessionStorage.setItem('signed', false);  
    }, []);

    const getLogin = () =>{
        navigate('/')
    }

    return(
        <S.WrapperPage>
             <Menu/>
             
             <S.WrapperContent>
                
                <img src={sessionExpired} alt={'Logo'}/>
                <S.WrapperInfo>
                    <h1>Sessão expirada...</h1>

                    <button onClick={() => getLogin()}>Fazer login</button>
                </S.WrapperInfo>
                

             </S.WrapperContent>

             
        </S.WrapperPage>
       
    )
} 


export default SessionExpired;