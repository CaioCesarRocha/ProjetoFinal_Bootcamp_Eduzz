import React from "react";
import * as S from "./styled";

import useMovie from "../../hooks/movieHooks";

const NoSearch = () => {
  const {movieState} = useMovie();
  return (
    <S.Wrapper>
      {movieState.hasMovie ?       
        <h1>Nenhum filme com este nome foi encontrado.</h1>   
        : 
        <h1>Nenhum filme pesquisado.</h1>           
      }      
    </S.Wrapper>
  );
};

export default NoSearch;