import Menu from '../../components/menu';
import Layout from '../../components/layout';
import NoSearch from '../../components/noSearch';
import Sections from '../../components/sections';
import Description from '../../components/description';
import useMovie from '../../hooks/movieHooks';


const Home = () => {
    const {movieState} = useMovie();
  
    return (
      <>
        <Menu/>
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