import React, { useState } from "react";
import * as S from "./styled";
import useMovie from '../../hooks/movieHooks'

const Header = () => {
  const { getMovie } = useMovie();
  const [movieNameForSearch, setMovieNameForSearch] = useState();

  const submitGetMovie = () => {
    if (!movieNameForSearch) return;
    return getMovie(movieNameForSearch);
  };

  return (
    <header>
      <S.Wrapper>
        <input
          type="text"
          placeholder="Digite o nome do filme para pesquisa..."
          onChange={(event) => setMovieNameForSearch(event.target.value)}
        />
        <button type="submit" onClick={submitGetMovie}>
          <span>Buscar</span>
        </button>
      </S.Wrapper>
    </header>
  );
};

export default Header;