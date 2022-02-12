import {Request, Response} from 'express';
import knex from '../database/connection';

class GenreController {

    async index (req: Request, res: Response){
        const genres = await knex('genres').select('*');
        console.log(genres)
        const serializedGenres = genres.map(item =>{
            return {
                id: item.id,
                name: item.name,
            };
        });
        return res.json(serializedGenres);  
    }

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