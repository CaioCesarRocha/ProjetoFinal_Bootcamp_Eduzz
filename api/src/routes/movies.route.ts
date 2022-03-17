import express , { NextFunction, Request, Response}from 'express';
import {celebrate, Joi} from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import MovieController from '../controllers/MovieController';

const moviesRoutes = express.Router();

const movieController = new MovieController()

//PEGA UM FILME ESPECÍFICO A PARTIR DO TÍTULO
moviesRoutes.get('/movie/:title', async (req: Request<{title: string}>, res: Response, next: NextFunction) => {
    try{
        const title = req.params.title;
        const movie = await movieController.show(title); //show quando listar um item unico
        res.status(StatusCodes.OK).send(movie);
    }catch(error){
        next(error);
    }
});

//ROTA PARA CRIAÇÃO DE UM FILME
moviesRoutes.post(
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

export default moviesRoutes;