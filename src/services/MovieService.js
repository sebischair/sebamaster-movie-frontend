"use strict";

import MoviesAPISimulator from "./Movie.API.Simulator";

export default class MovieService {
    constructor(){

    }

    static getMovies(){
       return new Promise((resolve, reject) => {
           resolve(MoviesAPISimulator.getMoviesAsync());
       });
    }

    static getMovie(id) {
        return new Promise((resolve, reject) => {
            let movies = items.filter(item => item.id.toString() == id);

            if (movies.length < 1) {
                reject(new Error(`The movie with id ${id} was not found`));
            } else {
                resolve(movies[0]);
            }
        });
    }
}