"use strict";

import MoviesAPISimulator from "./Movie.API.Simulator";

export default class MovieService {
    constructor(){

    }

    static getMovies(){
       return new Promise((resolve, reject) => {
           MoviesAPISimulator.getMoviesAsync().then((resp) => {
              resolve(resp);
           }).catch((e) => {
               console.log(e);
               reject(e);
           });
       });
    }

    static getMovie(id) {
        return new Promise((resolve, reject) => {
            MoviesAPISimulator.getMoviesAsync().then((resp) => {
                let movies = resp.data.filter(item => item.id.toString() == id)
                if (movies.length < 1) {
                    reject(new Error(`The movie with id ${id} was not found`));
                } else {
                    resolve(movies[0]);
                }
            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }
}