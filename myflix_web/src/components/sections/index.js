import React, { useEffect, useState } from "react";
import SectionItem from '../sectionsItems';
import useMovie from '../../hooks/movieHooks';
import * as S from "./styled";
import { useNavigate } from 'react-router-dom';

import { FiPlusCircle , FiXCircle} from 'react-icons/fi';
import Swal from "sweetalert2";



const Sections = () => {
    const { movieState, removeList, addList, getRelated, getMovie, getMyList } = useMovie();
    const [hasUserForSearchsection, setHasUserForSearchsection] = useState(true);
    const [hasMyList, setHasMyList] = useState(false);
    const navigate = useNavigate();



    useEffect(() =>{              
      const getMoviesRelated = async () => {
        await getRelated(movieState)      
      };  
      getMoviesRelated();

      const user = JSON.parse(sessionStorage.getItem('user'))
      getMyList(user.uuid)
    }, []);

    useEffect(() =>{
      if(movieState.myList.length !== 0){
        setHasMyList(true) 
      }else{
        setHasMyList(false);
      }
    }, [movieState.myList]);


    async function addMovie(item, movieState) { 
        let listMovie = [];

        await movieState.myList.map(item =>{ // map para pegar os ids dos movies presentes na lista
          listMovie.push(item.id) 
        });

        if(listMovie.includes(item.id)){ // se o item ja conter na lista, é retornado sem inserir
          alert(`Esse filme já está em sua lista.`);
          return;
        } 
           
        let newList = {myList: [...movieState.myList], movie: {...item}}
        const user = JSON.parse(sessionStorage.getItem('user'))
        const token = sessionStorage.getItem('token');

        let newMovieList = {
          user_id:  user.uuid,
          movie_id: item.id       
        }
        
        const response = await addList(newMovieList, newList, token)

        if(response === 'success'){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Filme ${item.title} adicionado a lista.`,
              showConfirmButton: false,
              timer: 2500
            }) 
        }
        else if(response === 'expired'){
          navigate('/session-expired');
        }     
    }

    async function removeMovie(movieState, id){ 
      const user = JSON.parse(sessionStorage.getItem('user'))
      const token = sessionStorage.getItem('token');
      
      let deleteMovie = {
        user_id:  user.uuid,
        movie_id: id       
      }
       
      const response = await removeList(movieState.myList, deleteMovie, token);

      if(response === 'expired')  { navigate('/session-expired');}     
    }

    const getInfo  = (title) =>{
      return getMovie(title);
    }
    

    return (
        <>
          {hasUserForSearchsection ? (
            <>         
            <S.WrapperTabs
              selectedTabClassName="is-selected"
              selectedTabPanelClassName="is-selected"
            >
              <S.WrapperTabList>
                <S.WrapperTab>Related movies</S.WrapperTab>
                <S.WrapperTab>My list</S.WrapperTab>
              </S.WrapperTabList>
              
              <S.WrapperTabPanel>
                <S.WrapperList>
                  {movieState.related.map(item => (         
                    <SectionItem
                      key={item.id}
                      name={item.title}
                      imgLink={item.avatar}
                      moreInfoLink={item.description}
                      duration={item.duration}
                      iconRem= {<FiPlusCircle/>}
                      act={false}
                      clickedInfo={() => getInfo(item.title)}
                      clicked={() => addMovie(item, movieState)}
                    />  
                  ))} 
                </S.WrapperList>             
              </S.WrapperTabPanel>
                           
              <S.WrapperTabPanel>
                { hasMyList ?
                  <S.WrapperList>                
                    {movieState.myList.map(item => (         
                      <SectionItem
                        key={item.id}
                        name={item.title}
                        imgLink={item.avatar}
                        moreInfoLink={item.description}
                        duration={item.duration}
                        iconRem= {<FiXCircle/>}
                        act={false}
                        clickedInfo={() => getInfo(item.title)}
                        clicked={() => removeMovie(movieState, item.id)}
                      />  
                    ))}
                  </S.WrapperList>
                :
                  <span>Nenhum filme adicionado.</span>
                }
              </S.WrapperTabPanel>
             
              
            </S.WrapperTabs>
            </>
          ) : (
            <><span>ninguem aqui</span></>
          )}
        </>
    );
}

export default Sections;