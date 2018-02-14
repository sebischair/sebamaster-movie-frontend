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
            MoviesAPISimulator.getMovieByIdAsync(id).then((resp) => {
                if(resp.data != undefined && Object.keys(resp.data).length !== 0) {
                    resolve(resp.data);
                } else {
                    reject(new Error(`The movie with id ${id} was not found`));
                }
            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }

    static deleteMovie(id) {
        return new Promise((resolve, reject) => {
            MoviesAPISimulator.deleteMovie(id).then((resp) => {
                resolve(resp.status);
            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }
}