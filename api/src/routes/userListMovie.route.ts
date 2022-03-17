import express from 'express';
import UserListMovieController from '../controllers/UserListMovieController';
import bearerAuthenticationMiddleware from '../middlewares/bearer-authentication.middleware';

const userListMovieRoutes = express.Router();

const userListMovieController = new UserListMovieController();

//ROTA PARA ADICIONAR FILME NA MYLIST DO USUÁRIO
userListMovieRoutes.post('/userListMovie', bearerAuthenticationMiddleware, userListMovieController.create);

//PEGA A MYLIST DO USUÁRIO
userListMovieRoutes.get('/userListMovie/:user_id', userListMovieController.show);

//ROTA PARA DELETAR FILME NA MYLIST DO USUÁRIO
userListMovieRoutes.delete('/userListMovie/:user_id/:movie_id', bearerAuthenticationMiddleware, userListMovieController.delete)



export default userListMovieRoutes;