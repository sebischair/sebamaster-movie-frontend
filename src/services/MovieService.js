"use strict";

import HttpService from './HttpService';

export default class MovieService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/movies" }

    static getMovies(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data, textStatus, jqXHR) {
               if(jqXHR.status == 200) {
                   if(data != undefined) {
                       resolve(data);
                   }
                   else {
                       reject('Error while retrieving movies');
                   }
               }
               else {
                   reject(textStatus);
               }
           }, function(jqXHR, textStatus, error) {
               reject(textStatus);
           });
       });
    }

    static getMovie(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${MovieService.baseURL()}/${id}`, function(data, textStatus, jqXHR) {
                if(jqXHR.status == 200) {
                    if(data != undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    }
                    else {
                        reject('Error while retrieving movie');
                    }
                }
                else {
                    reject(textStatus);
                }
            }, function(jqXHR, textStatus, error) {
                reject(textStatus);
            });
        });
    }

    static deleteMovie(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${MovieService.baseURL()}/${id}`, function(data, textStatus, jqXHR) {
                if(jqXHR.status == 200 || data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(jqXHR, textStatus, error) {
                reject(textStatus);
            });
        });
    }

    static updateMovie(movie) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${movie._id}`, movie, function(data, textStatus, jqXHR) {
                console.log(data);
                if(jqXHR.status == 200 && data != undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while updating movie');
                }
            }, function(jqXHR, textStatus, error) {
               reject(textStatus);
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
            HttpService.post(MovieService.baseURL(), movie, function(data, textStatus, jqXHR) {
                if(jqXHR.status == 201 && data != undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while creating movie');
                }
            }, function(jqXHR, textStatus, error) {
                reject(textStatus);
            });
        });
    }
}