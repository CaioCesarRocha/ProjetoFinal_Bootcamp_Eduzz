import express , { NextFunction, Request, Response, Router }from 'express';
import GenreController from '../controllers/GenresController';


const genresRoutes = express.Router();

const genreController = new GenreController();


genresRoutes.get('/genres', genreController.index);

//PEGA OS FILMES RELACIONADOS
genresRoutes.get('/genres/:id', genreController.show);

export default genresRoutes;