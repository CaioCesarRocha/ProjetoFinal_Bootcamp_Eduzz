import express , { NextFunction, Request, Response, Router }from 'express';
import UserListMovieController from '../controllers/UserListMovieController';
import bearerAuthenticationMiddleware from '../middlewares/bearer-authentication.middleware';

const userListMovieRoutes = express.Router();

const userListMovieController = new UserListMovieController();


userListMovieRoutes.post('/userListMovie', bearerAuthenticationMiddleware, userListMovieController.create);

userListMovieRoutes.get('/userListMovie/:user_id', userListMovieController.show);

userListMovieRoutes.delete('/userListMovie/:user_id/:movie_id', bearerAuthenticationMiddleware, userListMovieController.delete)



export default userListMovieRoutes;