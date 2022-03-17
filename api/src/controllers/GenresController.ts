import {Request, Response} from 'express';
import knex from '../database/connection';

class GenreController {

    //pega todos os genêros cadastrados no banco
    async index (req: Request, res: Response){
        const genres = await knex('genres').select('*');

        const serializedGenres = genres.map(item =>{
            return {
                id: item.id,
                name: item.name,
            };
        });
        return res.json(serializedGenres);  
    }

    //a partir do id de um filme base, é pego os filmes relacionados que possuem o mesmo gênero.
    async show (req: Request, res: Response){
        const {id} = req.params;
 
        try{
            const relatedMovies = await knex('movies')
            .join('movies_genres', 'movies.id', '=' , 'movies_genres.movie_id')
            .where('movies_genres.genre_id', id)
            .select('movies.*');

            return res.json(relatedMovies);       
        }catch(err){
            return res.status(400).json({message: "No one movie related found"});
        }
    }

}

export default GenreController;