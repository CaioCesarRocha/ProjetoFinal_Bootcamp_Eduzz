import  {useState, useEffect} from 'react';
import * as S from "./styled";
import { MdQueuePlayNext } from "react-icons/md";
import useAuth from '../../hooks/authHooks';


const Menu = () =>{
    const [username, setUsername] = useState('');
    const {userState} = useAuth();

    useEffect(() => {
        try{           
          setUsername(userState.username)            
        } catch{}       
    }, []);

    
    return(
        <S.WrapperHeader>
            <S.WrapperLogo href="/">
                    <img src={'https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png'} alt={'Logo'}/>           
            </S.WrapperLogo>

            <S.WrapperOption href="/register-movie" rel="noreferrer">  
                <MdQueuePlayNext/>              
                <h1>Register Movie</h1>                
            </S.WrapperOption>
            <S.WrapperContentTitle>
                <S.WrapperTitle>MYFLIX</S.WrapperTitle>
            </S.WrapperContentTitle>
            <S.WrapperContentUsername>
                <h3>{username}</h3>  
            </S.WrapperContentUsername>
                   
        </S.WrapperHeader>
    )
} 

export default Menu;