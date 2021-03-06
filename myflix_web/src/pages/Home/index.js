import {useEffect} from 'react';

import Menu from '../../components/menu';
import Layout from '../../components/layout';
import NoSearch from '../../components/noSearch';
import Sections from '../../components/sections';
import Description from '../../components/description';
import useMovie from '../../hooks/movieHooks';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const {movieState} = useMovie();
    const navigate = useNavigate();

    useEffect(() =>{    
      const signed = sessionStorage.getItem('signed');

      if(signed === 'false'){
        navigate('/')
        return
      }
    }, [])
    

    return (
      <>
        <Menu />
        <Layout>  
          {movieState.hasUser ? (
            <>
              {movieState.loading ? (
                <p>Loading</p>
              ) : (
                <>
                  <Description />
                  <Sections />
                </>
              )}
            </>
          ) : (
            <NoSearch />
          )}
        </Layout>
      </>
      
    );
  }
  
  export default Home;