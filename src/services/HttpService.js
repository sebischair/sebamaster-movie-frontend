"use strict";

export default class HttpService {
    constructor() {
    }

    static apiURL() {return "http://localhost:3000"; }

    static get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('authorization', `${token}`);
        }

        fetch(url, {
            method: 'GET',
            headers: header
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                });
            } else if (this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                onError("Authorization failed. Log in with correct user and password.");
            } else {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('message')) {
                        onError(resp.message);
                    }
                    onError("An unknown error occurred");
                });
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('authorization', `${token}`);
        }
        header.append('content-type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                });
            } else if (this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                onError("Authorization failed. Log in with correct user and password.");
            } else {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('message')) {
                        onError(resp.message);
                    }
                    onError("An unknown error occurred");
                });
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('authorization', `${token}`);
        }
        header.append('content-type', 'application/json');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
             if(resp.ok) {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                });
            } else if (this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                onError("Authorization failed. Log in with correct user and password.");
            } else {
                 resp.json().then(resp => {
                     if (resp.hasOwnProperty('message')) {
                         onError(resp.message);
                     }
                     onError("An unknown error occurred");
                 });
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('authorization', `${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                });
            } else if (this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                onError("Authorization failed. Log in with correct user and password.");
            } else {
                resp.json().then(resp => {
                    if (resp.hasOwnProperty('message')) {
                        onError(resp.message);
                    }
                    onError("An unknown error occurred");
                });
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static checkIfUnauthorized(res) {
        if(res.status == 401) {
            return true;
        }
        return false;
    }

}