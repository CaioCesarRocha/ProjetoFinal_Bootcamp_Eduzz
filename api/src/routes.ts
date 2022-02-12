import express , { NextFunction, Request, Response, Router }from 'express';
import {celebrate, Joi} from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import GenreController from './controllers/GenresController';
import MovieController from './controllers/MovieController';

const routes = express.Router();

const genreController = new GenreController();
const movieController = new MovieController();

routes.get('/genres', genreController.index);

routes.get('/genres/:id', genreController.show);

routes.get('/movie/:title', async (req: Request<{title: string}>, res: Response, next: NextFunction) => {
    try{
        const title = req.params.title;
        const movie = await movieController.show(title); //show quando listar um item unico
        res.status(StatusCodes.OK).send(movie);
    }catch(error){
        next(error);
    }
});
 

routes.post(
    '/movie',
    celebrate({  //validação dos campos no back
        body: Joi.object().keys({
            title: Joi.string().required(),
            cast: Joi.string().required(),
            duration: Joi.string().required(),
            year: Joi.number().required(),
            producer: Joi.string().required(),
            avatar: Joi.string().required(),
            trailer: Joi.string().required(),
            description: Joi.string().required(),
            genres: Joi.array().required(),
        })
    },{
        abortEarly: false, //valida todos de uma vez (nao trava no primeiro)
    }),
    movieController.create
);

export default routes;