import {Request, Response} from 'express';
import knex from '../database/connection';

import DatabaseError from '../models/errors/database.error.model';

class MovieController {
    //cria o filme na tablea movies
    async create (req: Request, res: Response){

        const {
            title,
            cast,
            duration, 
            year,
            producer,
            avatar,
            trailer,
            description,
            genres
        } = req.body

        //evitar que caso a segunda operação de errado, por nao ter vinculo com a outra, insera dados errados no banco
        const trx = await knex.transaction();

        // set as info pegadas no req.body numa const chamada movie;
        const movie = {
            title, cast, duration, year, producer, avatar, trailer, description
        }

        const insertedIds = await trx('movies').insert(movie).returning('id');

        //pega o id do movie no momento em que foi inserido.
        const movie_id = insertedIds[0].id;

        //ADD O ID(EMPRESA) RELACIONANDO OS ITEMS COM A EMPRESA (SERIA GENEROS COM O FILME)       
        let genre_id = genres[0];
        const movieGenres1 = { movie_id, genre_id }        
        await trx('movies_genres').insert(movieGenres1);

        genre_id = genres[1];
        const movieGenres2 = { movie_id, genre_id }       
        await trx('movies_genres').insert(movieGenres2);
  
        
        await trx.commit();
    
        return res.json({
            id: movie_id,
            ...movie,
        });
    }


    //pega as info do filme selecionado pelo usuário na tabela movie, e os generos dele na tabela genres...
    async show(title: string){
        //const {title} = req.params;

        const dataMovie = await knex('movies').where('title', title);
        
        try{
            const id = dataMovie[0].id

            const genres = await knex('genres')
            .join('movies_genres', 'genres.id', '=' , 'movies_genres.genre_id')
            .where('movies_genres.movie_id', id)
            .select('genres.*');
            
            const data = {movie: dataMovie, genres}
            return(data);
        }
        catch(error){
            throw new DatabaseError('Erro na consulta por ID/MOVIE', error);
            //return res.status(404).json({message: "Movie not found"});
        }      
    }
}

export default MovieController;