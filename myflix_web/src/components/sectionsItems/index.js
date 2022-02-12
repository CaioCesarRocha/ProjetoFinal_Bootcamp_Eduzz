import React from "react";
import * as S from "./styled";
import { FiInfo } from 'react-icons/fi';


const SectionItem = ({ name, moreInfoLink, imgLink, duration, iconAdd, iconRem, act, clicked, clickedInfo}) => {
  return (
    <S.Wrapper>
        <S.WrapperImage src={imgLink} alt="Avatar of movie" />
        <S.WrapperContentInfos>
            <S.WrapperTitle href={moreInfoLink} target="_blank" rel="noreferrer">
                {name}
            </S.WrapperTitle>
            <S.WrapperDuration>Duration: {duration}</S.WrapperDuration>
            <S.WrapperIcons>      
              <button onClick={clickedInfo}><FiInfo/></button>
              {act ?  <button onClick={clicked}> {iconAdd}</button>
                  :  <button onClick={clicked}> {iconRem}</button>                
              } 
            </S.WrapperIcons>
            
        </S.WrapperContentInfos>    
    </S.Wrapper>
  );
};

export default SectionItem;