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

    async function addList (newMovieList, newList, token, refresh_token) {
     
      let newMovie = {...newMovieList}     
      const config = { 
        headers: { 
          authorization: `Bearer ${token}`,
          refresh_token: refresh_token       
      } };

      try{ 
        let expired = false;
       await api.post('userListMovie', newMovie, config).then(({data}) => {
          console.log('dataa', data)
          if( data === 'expired') expired = true;

          if(data.newAccessToken) {
            sessionStorage.setItem('token', data.newAccessToken);
            sessionStorage.setItem('refresh_token', data.newRefreshToken);
          }
        })
       
        if(expired === true) return('expired')
      
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

    async function removeList(myList, deleteMovie, token, refresh_token){
      const user_id = deleteMovie.user_id;
      const movie_id = deleteMovie.movie_id;
      console.log('refresh_token', refresh_token)
      const config = { 
        headers: { 
          authorization: `Bearer ${token}`,
          refresh_token: refresh_token 
        } };

      try{
        let expired = false;     
        await api.delete(`userListMovie/${user_id}/${movie_id}`, config,).then(({data})=>{
          console.log('data', data)
          if( data === 'expired') expired = true;

          if(data.newAccessToken) {
            sessionStorage.setItem('token', data.newAccessToken);
            sessionStorage.setItem('refresh_token', data.newRefreshToken);
          }
        });
 
        if(expired === true) return('expired');
        console.log('PASSEI NO DELETE DPS DE OPERADO')
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
        addList: useCallback((newMovieList, newList, token, refresh_token) => addList(newMovieList, newList, token, refresh_token), []),
        removeList: useCallback((myList, deleteMovie, token, refresh_token) => removeList(myList, deleteMovie, token, refresh_token), []),
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