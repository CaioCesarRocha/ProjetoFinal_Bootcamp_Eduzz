import React, { useEffect, useState } from "react";
import SectionItem from '../sectionsItems';
import useMovie from '../../hooks/movieHooks';
import * as S from "./styled";

import { FiPlusCircle , FiXCircle} from 'react-icons/fi';
import Swal from "sweetalert2";



const Sections = () => {
    const { movieState, removeList, addList, getRelated, getMovie } = useMovie();
    const [username, setUsername] = useState('');
    const [hasUserForSearchsection, setHasUserForSearchsection] = useState(true);
    const [hasMyList, setHasMyList] = useState(false);



    useEffect(() =>{              
      const getMoviesRelated = async () => {
        await getRelated(movieState)
      };  
      getMoviesRelated();
    }, [movieState.hasUser]);

    useEffect(() =>{
      if(movieState.myList.length !== 0){
        setHasMyList(true) 
      }else{
        setHasMyList(false);
      }
    }, [movieState.myList]);


    const addMovie = (item, movieState) => {      
        //let newMovieList = {myList: [...movieState.myList], movie: {...item}}
        const user = JSON.parse(sessionStorage.getItem('user'))

        let newMovieList = {
          user_id:  user.uuid,
          movie_id: item.id       
        }
        
        const response = addList(newMovieList)

        if(response === 'success'){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Filme ${item.title} adicionado a lista.`,
              showConfirmButton: false,
              timer: 2500
            }) 
        }       
    }

    const removeMovie = (movieState, id) => {    
      return removeList(movieState.myList, id);
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