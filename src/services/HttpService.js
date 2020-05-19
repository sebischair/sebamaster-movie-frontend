"use strict";

export default class HttpService {
    constructor() {
    }

    static apiURL() {return 'http://localhost:3000'; }

    static async get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'GET',
                headers: header
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
            } else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            } else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(err.message);
        }

        // fetch(url, {
        //     method: 'GET',
        //     headers: header
        // }).then((resp) => {
        //     if(this.checkIfUnauthorized(resp)) {
        //         window.location = "/#login";
        //     }
        //     else {
        //         return resp.json();
        //     }
        // }).then((resp) => {
        //     if(resp.error) {
        //         onError(resp.error);
        //     }
        //     else {
        //         if(resp.hasOwnProperty('token')) {
        //             window.localStorage['jwtToken'] = resp.token;
        //         }
        //         onSuccess(resp);
        //     }
        // }).catch((e) => {
        //     onError(e.message);
        // });
    }

    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(err.message);
        }
        // fetch(url, {
        //     method: 'PUT',
        //     headers: header,
        //     body: JSON.stringify(data)
        // }).then((resp) => {
        //     if(this.checkIfUnauthorized(resp)) {
        //         window.location = '/#login';
        //         return;
        //     }
        //     else {
        //         return resp.json();
        //     }
        // }).then((resp) => {
        //     if(resp.error) {
        //         onError(resp.error);
        //     }
        //     else {
        //         if(resp.hasOwnProperty('token')) {
        //             window.localStorage['jwtToken'] = resp.token;
        //         }
        //         onSuccess(resp);
        //     }
        // }).catch((e) => {
        //     onError(e.message);
        // });
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(e.message);
        }
        // fetch(url, {
        //     method: 'POST',
        //     headers: header,
        //     body: JSON.stringify(data)
        // }).then((resp) => {
        //     if(this.checkIfUnauthorized(resp)) {
        //         window.location = "/#login";
        //         return;
        //     }
        //     else {
        //         return resp.json();
        //     }
        // }).then((resp) => {
        //     if(resp.error) {
        //         onError(resp.error);
        //     }
        //     else {
        //         if(resp.hasOwnProperty('token')) {
        //             window.localStorage['jwtToken'] = resp.token;
        //         }
        //         onSuccess(resp);
        //     }
        // }).catch((e) => {
        //     onError(e.message);
        // });
    }

    static async remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'DELETE',
                headers: header
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                onSuccess(resp)
            }
        } catch(err) {
            onError(err.message);
        }
        // fetch(url, {
        //     method: 'DELETE',
        //     headers: header
        // }).then((resp) => {
        //     if(this.checkIfUnauthorized(resp)) {
        //         window.location = "/#login";
        //         return;
        //     }
        //     else {
        //         return resp.json();
        //     }
        // }).then((resp) => {
        //     if(resp.error) {
        //         onError(resp.error);
        //     }
        //     else {
        //         onSuccess(resp)
        //     }
        // }).catch((e) => {
        //     onError(e.message);
        // });
    }

    static checkIfUnauthorized(res) {
        if(res.status === 401) {
            return true;
        }
        return false;
    }

}