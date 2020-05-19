"use strict";

import MoviesAPISimulator from './MovieAPISimulator';

export default class MovieService {

    constructor(){
    }

    static getMovies(){
       return new Promise(async (resolve, reject) => {
           try {
               let resp = await MoviesAPISimulator.getMoviesAsync();
               if(resp.data != undefined) {
                   resolve(resp.data);
               } else {
                   reject('Error while retrieving movies');
               }
           } catch(err) {
               reject(err);
           }
       });
    }

    static getMovie(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await MoviesAPISimulator.getMovieByIdAsync(id);
                if(resp.data != undefined && Object.keys(resp.data).length !== 0) {
                    resolve(resp.data);
                } else {
                    reject('Error while retrieving movie');
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static deleteMovie(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = window.localStorage['jwtToken'];
                let resp = await MoviesAPISimulator.deleteMovie(id, token);
                if(resp.status == 200) {
                    resolve(resp.message);
                }
                else {
                    reject('Error while deleting movie');
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static updateMovie(movie) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = window.localStorage['jwtToken'];
                let resp = await MoviesAPISimulator.updateMovie(movie, token);
                if(resp != undefined && Object.keys(resp).length > 0) {
                    resolve(resp);
                }
                else {
                    reject('Error while updating movie');
                }
            } catch(err) {
                reject(err);
            }
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
        return new Promise(async (resolve, reject) => {
            try {
                const token = window.localStorage['jwtToken'];
                let resp = await MoviesAPISimulator.createMovie(movie, token);
                if(resp != undefined && Object.keys(resp).length > 0) {
                    resolve(resp);
                }
                else {
                    reject('Error while creating movie');
                }
            } catch(err) {
                reject(err);
            }
        });
    }
}