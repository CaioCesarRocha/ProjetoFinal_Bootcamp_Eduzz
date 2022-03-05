import React, {useState} from "react";
import { FiPlusCircle, FiDownload,FiPlayCircle } from 'react-icons/fi';
import Swal from "sweetalert2";

import useMovie from "../../hooks/movieHooks";
import ShowTrailer from "../showTrailer";
import * as S from "./styled";


const Description = () => {
    const { movieState, addList } = useMovie();
    const [trailerURL, setTrailerURL] = useState("https://www.youtube.com/watch?v=QPYneV_pfec");
    const [hasTrailer, setHasTrailer] = useState(false);
    

    const showDownload = (props) => {
      Swal.fire(`Fazendo download do filme ${props}...`)
    }

    const showTrailer = (trailer) => {
        setHasTrailer(true);
        setTrailerURL(trailer);
    }

    const add = (props) =>{ //adicionar o id na lista
        let newList = {myList: [...movieState.myList], movie: {...props.movie}}
        const user = JSON.parse(sessionStorage.getItem('user'))

        let newMovieList = {
          user_id:  user.uuid,
          movie_id: props.movie.id       
        }
        
        const response = addList(newMovieList, newList)

        if(response === 'success'){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Filme ${props.movie.title} adicionado a lista.`,
              showConfirmButton: false,
              timer: 2500
            })
        } 
    }
  
    return (
      <S.Wrapper>
        <S.WrapperContent>
          <S.WrapperImage src={movieState.movie.avatar} alt="Avatar of movie" />
          <S.WrapperInfoMovie>
            
              <S.WrapperTitle
                  href={movieState.movie.description}
                  target="_blank"
                  rel="noreferrer" 
              >         
                  <h1>{movieState.movie.title}</h1>             
              </S.WrapperTitle>
                      
              <S.WrapperMovieGeneric>
                <h3>Cast:</h3>
                  <span>{movieState.movie.cast}</span> 
              </S.WrapperMovieGeneric>
              <S.WrapperMovieGeneric>
                <h3>Year Release:</h3>
                <span>{movieState.movie.year}</span>
              </S.WrapperMovieGeneric>
              <S.WrapperMovieGeneric>
                <h3>Duration:</h3>
                <span>{movieState.movie.duration}</span>
              </S.WrapperMovieGeneric>
              <S.WrapperMovieGeneric>
                <h3>Producer:</h3>
                <span>{movieState.movie.producer}</span>          
              </S.WrapperMovieGeneric> 
              <S.WrapperMovieGeneric>
                <h3>Genres:</h3>
                  <span>{movieState.movie.genres[0].name}, {movieState.movie.genres[1].name} </span> 
              </S.WrapperMovieGeneric>   
                   
          </S.WrapperInfoMovie>

          <S.WrapperContainerOptions>
            <S.WrapperOptions>          
              <S.WrapperButton onClick={() => showTrailer(movieState.movie.trailer)}> <FiPlayCircle/> </S.WrapperButton>
              <span>Trailer</span>
            </S.WrapperOptions>

            <S.WrapperOptions>          
              <S.WrapperButton onClick={() => showDownload(movieState.movie.title)}> <FiDownload/>  </S.WrapperButton>
              <span>Download</span>
            </S.WrapperOptions>

            <S.WrapperOptions>          
              <S.WrapperButton onClick={() => add(movieState)}> <FiPlusCircle/> </S.WrapperButton>
              <span>Add Lista</span>
            </S.WrapperOptions> 
          </S.WrapperContainerOptions>
        
        </S.WrapperContent>
        {hasTrailer ? 
            <ShowTrailer url={trailerURL} onClick={() => {setHasTrailer(false)}}  />
          :
            <span></span>
        }
      
      </S.Wrapper>
    );
  };
  
  export default Description;
 