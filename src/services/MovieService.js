"use strict";

import $ from 'jquery';

export default class MovieService {
    constructor(){
    }

    static apiURL() {return "http://localhost:3000/api"; }

    static baseURL() {return "http://localhost:3000/api/movies"; }

    static getMovies(){
       return new Promise((resolve, reject) => {
           $.ajax({
               url: MovieService.baseURL(),
               type: 'GET',
               success: function (data) {
                   resolve({data: data});
               }
           });
       });
    }

    static getMovie(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: MovieService.baseURL() + `/${id}`,
                type: 'GET',
                success: function (data) {
                    if (data != undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    }
                    else {
                        reject(new Error(`The movie with id ${id} was not found`));
                    }
                }
            });
        });
    }

    static deleteMovie(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: MovieService.baseURL() + `/${id}`,
                type: 'DELETE',
                success: function (data) {
                    if(data == 'OK') {
                        resolve(200);
                    } else {
                        reject('Error while deleting');
                    }
                }
            });
        });
    }

    static updateMovie(movie) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: MovieService.baseURL() + `/${movie._id}`,
                type: 'PUT',
                data: movie,
                success: function(data) {
                    console.log(data);
                    if(data != undefined && Object.keys(data).length !== 0) {
                        resolve(data);
                    }
                    else {
                        reject(`Error while updating movie with id ${movie._id}`);
                    }
                }
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
            $.ajax({
                url: MovieService.baseURL(),
                type: 'POST',
                data: movie,
                success: function(data) {
                    if(data != undefined && Object.keys(data).length !== 0) {
                        resolve(data);
                    }
                    else {
                        reject('Error while creating movie');
                    }
                }
            });
        });
    }
}