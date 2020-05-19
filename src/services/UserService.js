"use strict";

import MovieAPISimulator from "./MovieAPISimulator";

export default class UserService {

    constructor() {
    }

    static register(user, pass) {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await MovieAPISimulator.register(user, pass);
                if(resp != undefined && resp.token != undefined) {
                    window.localStorage['jwtToken'] = resp.token;
                    resolve(resp.token);
                }
                else {
                    reject('Error while signing up user');
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static login(user, pass) {
        return new Promise(async(resolve, reject) => {
            try {
                let resp = await MovieAPISimulator.login(user, pass);
                if(resp != undefined && resp.token != undefined) {
                    window.localStorage['jwtToken'] = resp.token;
                    resolve(resp.token);
                }
                else {
                    reject('Error while logging in');
                }
            } catch(err) {
                reject(err);
            }
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