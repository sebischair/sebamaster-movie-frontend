"use strict";

import MoviesAPISimulator from "./MovieAPISimulator";

export default class MovieService {

    constructor(){
    }

    static getMovies(){
       return new Promise((resolve, reject) => {
           MoviesAPISimulator.getMoviesAsync().then((resp) => {
               if(resp.data != undefined) {
                   resolve(resp.data);
               }
               else {
                   reject('Error while retrieving movies');
               }
               resolve(resp);
           }).catch((e) => {
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
                    reject('Error while retrieving movie');
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }

    static deleteMovie(id) {
        return new Promise((resolve, reject) => {
            const token = window.localStorage['jwtToken'];
            MoviesAPISimulator.deleteMovie(id, token).then((resp) => {
                if(resp.status == 200) {
                    resolve(resp.message);
                }
                else {
                    reject('Error while deleting movie');
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }

    static updateMovie(movie) {
        return new Promise((resolve, reject) => {
            const token = window.localStorage['jwtToken'];
            MoviesAPISimulator.updateMovie(movie, token).then((resp) => {
                if(resp != undefined && Object.keys(resp).length > 0) {
                    resolve(resp);
                }
                else {
                    reject('Error while updating movie');
                }
            }).catch((e) => {
                reject(e);
            })
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
            const token = window.localStorage['jwtToken'];
            MoviesAPISimulator.createMovie(movie, token).then((resp) => {
                if(resp != undefined && Object.keys(resp).length > 0) {
                    resolve(resp);
                }
                else {
                    reject('Error while creating movie');
                }
            }).catch((e) => {
               reject(e);
            });
        });
    }
}