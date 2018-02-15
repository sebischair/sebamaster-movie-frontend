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

    static updateMovie(movie) {
        return new Promise((resolve, reject) => {
            MoviesAPISimulator.updateMovie(movie).then((resp) => {
                if(resp.data != undefined) {
                    resolve(resp.data);
                }
                else {
                    reject(new Error(`Error while updating movie with id ${movie.id}`));
                }
            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }

    static createMovie(movie) {
        movie.id = Math.floor((Math.random() * 100000000) + 1).toString();
        movie.posters = {
            thumbnail: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            profile: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            detailed: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            original: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
        };
        return new Promise((resolve, reject) => {
           MoviesAPISimulator.createMovie(movie).then((resp) => {
                if(resp.data != undefined) {
                    resolve(resp.data);
                }
                else {
                    reject(new Error('Error while creating movie'));
                }
           }).catch((e) => {
               console.log(e);
               reject(e);
           })
        });
    }
}