import express , { NextFunction, Request, Response, Router }from 'express';
import UserListMovieController from '../controllers/UserListMovieController';

const userListMovieRoutes = express.Router();

const userListMovieController = new UserListMovieController();


userListMovieRoutes.post('/userListMovie', userListMovieController.create);

userListMovieRoutes.get('/userListMovie/:user_id', userListMovieController.show);



export default userListMovieRoutes;