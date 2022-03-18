import { useContext } from "react";
import { MovieContext } from "../providers/movieProvider";

const useMovie = () => { //function passadas no context para ser usada em toda app
  const { movieState, getMovie, addList, removeList, getMyList, getRelated } = useContext(
    MovieContext
  );

  return { movieState, getMovie, addList, removeList, getMyList, getRelated};
};

export default useMovie;