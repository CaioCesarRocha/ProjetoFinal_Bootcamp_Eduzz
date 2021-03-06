import {Request, Response} from 'express';
import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

class UserListMovieController {

    //inseri movie escolhido pelo usuário na myList dele
    async create (req: Request, res: Response){        
        const {
            user_id,
            movie_id,
        } = req.body

        const userList = { user_id, movie_id} 

        try{
            await knex('user_myListMovie').insert(userList);
        }catch(error){
            throw new DatabaseError('Erro ao inserir o filme do usuário', error);
        }
    }


    //pega os movies da myList de um usuário específico.
    async show (req: Request, res: Response){ 
        const { user_id } = req.params;

        try{
            const myListMovies = await knex('movies')
            .join('user_myListMovie', 'movies.id', '=' , 'user_myListMovie.movie_id')
            .where('user_myListMovie.user_id', user_id)
            .select('movies.*');

            return res.json(myListMovies);  

        }catch(error){
            throw new DatabaseError('Erro ao buscar lista do usuário', error);
        }
    }


    //deleta movie escolhido pelo usuário da myList dele
    async delete (req: Request, res: Response){ 

        const { 
            user_id, 
            movie_id 
        } = req.params;

        try{
            await knex('user_myListMovie')
            .where('user_id', user_id)
            .andWhere('movie_id', movie_id)
            .del();
        }catch(error){
            throw new DatabaseError('Erro ao deletar filme do usuário', error);
        }
        
    }




}


export default UserListMovieController;