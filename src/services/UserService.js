"use strict";

import $ from 'jquery';

export default class UserService {
    constructor() {
    }

    static baseURL() {return "http://localhost:3000/api/user"; }

    static register(user, pass) {
        return new Promise((resolve, reject) => {
           $.ajax({
               url: `${UserService.baseURL()}/signup`,
               type: 'POST',
               data: {
                   username: user,
                   password: pass
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
                   console.log(resp);
               },
               error: function(err) {
                   console.log(err);
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

    isAuthenticated() {
        return !!this.window.localStorage['jwtToken'];
    }
}