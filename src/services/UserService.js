"use strict";

import MovieAPISimulator from "./MovieAPISimulator";

export default class UserService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/auth"; }

    static register(user, pass) {
        return new Promise((resolve, reject) => {
            MovieAPISimulator.register(user, pass).then((resp) => {
                if(resp != undefined && resp.token != undefined) {
                    window.localStorage['jwtToken'] = resp.token;
                    resolve(resp.token);
                }
                else {
                    reject('Error while signing up user');
                }
            }).catch((e) => {
               reject(e);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            MovieAPISimulator.login(user, pass).then((resp) => {
                if(resp != undefined && resp.token != undefined) {
                    window.localStorage['jwtToken'] = resp.token;
                    resolve(resp.token);
                }
                else {
                    reject('Error while logging in');
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}