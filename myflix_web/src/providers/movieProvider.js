import React, { createContext, useCallback, useState } from "react";
import api from "../services/api";

export const MovieContext = createContext({
  loading: false,
  movie: {},
  related: [],
  myList: {},
});


const MovieProvider = ({ children }) => {
    const [movieState, setMovieState] = useState({
        hasUser: false,
        loading: false,
        hasMovie: false,
        movie: {
          id: undefined,
          title: undefined,
          cast: undefined,
          year: undefined,
          duration: undefined,
          producer: undefined,
          genres: undefined,
          avatar: undefined,
          description: undefined,
          trailer: undefined
        },
        related: [],
        myList: []
    });

    const getMovie = (movieName) => {
        setMovieState((prevState) => ({
          ...prevState,
          loading: !prevState.loading,
        }));

        api.get(`movie/${movieName}`)
        .then(( {data} ) => {
          //console.log(data)
          if(data.length !== 0){
            const dataMovie = data.movie[0];
            const dataGenres = [data.genres[0], data.genres[1]]

            setMovieState((prevState)=> ({
              ...prevState,
              hasUser: true,
              hasMovie: true,
              movie:{
                id: dataMovie.id,
                title: dataMovie.title,
                cast: dataMovie.cast,
                year: dataMovie.year,
                duration: dataMovie.duration,
                producer: dataMovie.producer,
                genres: dataGenres,
                avatar: dataMovie.avatar,
                description: dataMovie.description,
                trailer: dataMovie.trailer,
              },
            }));
        }})
        .finally(() => {
          setMovieState((prevState) => ({
            ...prevState,          
            loading: !prevState.loading,
            hasMovie: true,
          }));
        });       
    }

    const addList = (newMovieList, newList) => {
      let newMovie = {...newMovieList}
      try{
        api.post('userListMovie', newMovie);
        setMovieState((prevState)=> ({
          ...prevState,
          hasUser: true,
          myList: [...newList.myList, newList.movie]
        }));  
        return('success')
      }catch(error){
        return('failed')
      }
   
    
    }

    const removeList = (myList, deleteMovie) => {
      const user_id = deleteMovie.user_id;
      const movie_id = deleteMovie.movie_id;

      try{
        api.delete(`userListMovie/${user_id}/${movie_id}`);
        setMovieState((prevState) => ({
          ...prevState,
          myList: []
        }));

        let newList = [];

        myList.map((item) => {
          if(movie_id !== item.id){
            newList.push(item)            
            setMovieState((prevState) => ({
              ...prevState,
              myList: [...newList]
            }));
          }
        })
      }catch(error){
        return('failed')
      }     
    }

    const getMyList = (user_id) =>{
      try{
        api.get(`userListMovie/${user_id}`).then(({data}) =>{
          setMovieState((prevState) => ({
            ...prevState,
            myList: [...data]
          }));
        });
        //return('success')
      }catch(error){
        return('failed')
      }
    }

     
    const getRelated = (movie) =>{
      let relateds = []
      //console.log(movie.movie)
      api.get(`genres/${movie.movie.genres[1].id}`)
      .then(( {data} ) => {   
        data.map(item => {
          if(item.title !== movie.movie.title){ 
            relateds.push(item)
            setMovieState((prevState)=> ({
              ...prevState,
              related: [ ...relateds]
            })); 
          }
        })               
      })
    }


    const contextValue = {
        movieState,     
        getMovie: useCallback((movieName) => getMovie(movieName), []),
        addList: useCallback((newMovieList, newList) => addList(newMovieList, newList), []),
        removeList: useCallback((myList, deleteMovie) => removeList(myList, deleteMovie), []),
        getMyList: useCallback((user_id) => getMyList(user_id), []),
        getRelated: useCallback((movie) => getRelated(movie), []),
    };


    return (
        <MovieContext.Provider value={contextValue}>
          {children}
        </MovieContext.Provider>
    );
}


export default MovieProvider;