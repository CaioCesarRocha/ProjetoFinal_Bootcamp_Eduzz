import  {useState, useEffect} from 'react';
import * as S from "./styled";
import { MdQueuePlayNext , MdLogout} from "react-icons/md";


const Menu = () =>{
    const [username, setUsername] = useState('');
    const [signed, setSigned] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {

        setSigned(false) 
        try{
            const user = JSON.parse(sessionStorage.getItem('user'));
            setUsername(user.username);
            setAdmin(user.admin);
            const signed = sessionStorage.getItem('signed');
            setSigned(signed);            
        }catch(error){console.log(error)}                     
    }, []);

    function logout(){
        sessionStorage.setItem('user', {});
        sessionStorage.setItem('signed', false);
    }
    
    return(
        
        <S.WrapperHeader>
            <S.WrapperLogo href="/">
                    <img src={'https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png'} alt={'Logo'}/>           
            </S.WrapperLogo>
            { admin 
            ?
                <S.WrapperOption href="/register-movie" rel="noreferrer" >  
                    <MdQueuePlayNext/>              
                    <h1>Register Movie</h1>                
                </S.WrapperOption>           
            :
                ''
            }
            
            <S.WrapperContentTitle>
                <S.WrapperTitle>MYFLIX</S.WrapperTitle>
            </S.WrapperContentTitle>
            <S.WrapperContentUsername>
                <h3>{username}</h3> 
            </S.WrapperContentUsername>   
            

            {
            signed ?
                <button onClick={() => logout()}>
                    <S.WrapperOption href="/" rel="noreferrer" >  
                        <MdLogout/>         
                    </S.WrapperOption>         
                </button>
            :
                ''
            } 
                       
        </S.WrapperHeader>      
    )
} 

export default Menu;