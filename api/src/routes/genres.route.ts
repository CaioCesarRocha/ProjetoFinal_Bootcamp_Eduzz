import express from 'express';
import GenreController from '../controllers/GenresController';


const genresRoutes = express.Router();

const genreController = new GenreController();

//PEGA OS GENÊROS DE FILMES CADASTRADOS NO BANCO
genresRoutes.get('/genres', genreController.index);

//PEGA OS FILMES RELACIONADOS
genresRoutes.get('/genres/:id', genreController.show);

export default genresRoutes;