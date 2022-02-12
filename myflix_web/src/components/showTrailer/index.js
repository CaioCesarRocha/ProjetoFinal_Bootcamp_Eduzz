import React from "react";
import * as S from "./styled"
import ReactPlayer from 'react-player';
import { FiVideoOff } from 'react-icons/fi';

const ShowTrailer = ({url, onClick}) => {
  return (
    <S.Wrapper>
        <ReactPlayer style={{backgroundColor: '#ececec'}} url={url} controls={true}/>
        <S.WrapperButton onClick={onClick}> <FiVideoOff/> </S.WrapperButton>
    </S.Wrapper>
  );
};

export default ShowTrailer;