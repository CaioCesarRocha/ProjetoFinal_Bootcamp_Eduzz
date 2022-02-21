import express , { Request, Response, NextFunction} from 'express';
const BodyParser = require('body-parser');
import cors from 'cors';
import {errors} from 'celebrate';
import errorHandler from './middlewares/error-handler.middleware';

import moviesRoutes from './routes/movies.route';
import genresRoutes from './routes/genres.route';
import usersRoutes from './routes/users.route';
import userListMovieRoutes from './routes/userListMovie.route';
import authorizationRoute from './routes/authorization.route';


const app = express();

//configuração
app.use(cors());
app.use(BodyParser.json());
app.use(express.json());

//rotas da aplicação
app.use(moviesRoutes);
app.use(genresRoutes);
app.use(usersRoutes);
app.use(userListMovieRoutes)
app.use(authorizationRoute);


//LIDAR COM ERRORS
app.use(errors()); //lida automaticamente com a forma que retornamos o erro no front
app.use(errorHandler);//error personalizado


app.listen(3000, () =>{
    console.log('App executando na porta 3000');
});
