"use strict";

import $ from 'jquery';

export default class HttpService {
    constructor() {
    }

    static apiURL() {return "http://localhost:3000"; }

    static get(url, onSuccess, onError) {
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function(jqXHR, settings) {
                if(settings.url.indexOf(HttpService.apiURL()) === 0) {
                    let token = window.localStorage['jwtToken'];

                    if(token) {
                        jqXHR.setRequestHeader('Authorization', 'JWT ' + token);
                    }
                }
            },
            success: function(data, textStatus, jqXHR) {

                if(data.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = data.token;
                }
                onSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, error) {
                if(HttpService.checkIfUnauthorized(jqXHR)) {
                    window.location = "/#login";
                }
                onError(jqXHR, textStatus, error);
            }
        });
    }

    static put(url, data, onSuccess, onError) {
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            beforeSend: function(jqXHR, settings) {
                if(settings.url.indexOf(HttpService.apiURL()) === 0) {
                    let token = window.localStorage['jwtToken'];

                    if(token) {
                        jqXHR.setRequestHeader('Authorization', 'JWT ' + token);
                    }
                }
            },
            success: function(data, textStatus, jqXHR) {

                if(data.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = data.token;
                }
                onSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, error) {
                if(HttpService.checkIfUnauthorized(jqXHR)) {
                    window.location = "/#login";
                }
                onError(jqXHR, textStatus, error);
            }
        });
    }

    static post(url, data, onSuccess, onError) {
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function(jqXHR, settings) {
                if(settings.url.indexOf(HttpService.apiURL()) === 0) {
                    let token = window.localStorage['jwtToken'];

                    if(token) {
                        jqXHR.setRequestHeader('Authorization', 'JWT ' + token);
                    }
                }
            },
            success: function(data, textStatus, jqXHR) {

                if(data.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = data.token;
                }
                onSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, error) {
                if(HttpService.checkIfUnauthorized(jqXHR)) {
                    window.location = "/#login";
                }
                onError(jqXHR, textStatus, error);
            }
        });
    }

    static remove(url, onSuccess, onError) {
        $.ajax({
            url: url,
            type: 'DELETE',
            beforeSend: function(jqXHR, settings) {
                if(settings.url.indexOf(HttpService.apiURL()) === 0) {
                    let token = window.localStorage['jwtToken'];

                    if(token) {
                        jqXHR.setRequestHeader('Authorization', 'JWT ' + token);
                    }
                }
            },
            success: function(data, textStatus, jqXHR) {

                if(data.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = data.token;
                }
                onSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, error) {
                if(HttpService.checkIfUnauthorized(jqXHR)) {
                    window.location = "/#login";
                }
                onError(jqXHR, textStatus, error);
            }
        });
    }

    static checkIfUnauthorized(res) {
        if(res.status == 401) {
            return true;
        }
        return false;
    }

}