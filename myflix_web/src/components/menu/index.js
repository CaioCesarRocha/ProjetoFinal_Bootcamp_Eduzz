import * as S from "./styled";
import { MdQueuePlayNext } from "react-icons/md";


const Menu = () =>{
    return(
        <S.WrapperHeader>
            <S.WrapperLogo href="/">
                    <img src={'https://blog.tudoprafoto.com/wp-content/uploads/2016/07/filmes.png'} alt={'Logo'}/>           
            </S.WrapperLogo>

            <S.WrapperOption href="/register-movie" rel="noreferrer" >  
                <MdQueuePlayNext/>              
                <h1>Register Movie</h1>                
            </S.WrapperOption>
            <S.WrapperContentTitle>
                <S.WrapperTitle>MYFLIX</S.WrapperTitle>
            </S.WrapperContentTitle>          
        </S.WrapperHeader>
    )
} 

export default Menu;