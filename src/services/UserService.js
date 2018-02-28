"use strict";

import $ from 'jquery';

export default class UserService {
    constructor() {
    }

    static apiURL() {return "http://localhost:3000/api"; }

    static baseURL() {return "http://localhost:3000/auth"; }

    static register(user, pass) {
        return new Promise((resolve, reject) => {
           $.ajax({
               url: `${UserService.baseURL()}/signup`,
               type: 'POST',
               data: {
                   username: user,
                   password: pass
               },
               success: function(resp) {
                   resolve(resp);
               },
               error: function(err) {
                   if(err.responseJSON.errmsg == "E11000 duplicate key error collection: moviedb.users index: username_1 dup key: { : \"ingo\" }") {
                       reject("Username exists");
                   }
                   else {
                       reject(err.responseJSON.errmsg);
                   }
               }
           });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
           $.ajax({
               url: `${UserService.baseURL()}/login`,
               type: 'POST',
               data: {
                   username: user,
                   password: pass
               },
               success: function(resp) {
                   resolve(resp);
               },
               error: function(err) {
                   reject(err.responseText);
               }
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
        return JSON.parse(window.atob(base64)).user;
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}