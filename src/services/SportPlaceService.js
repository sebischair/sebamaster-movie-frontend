"use strict";

import HttpService from './HttpService';
import ActivityService from "./ActivityService";

export default class SportPlaceService {

    constructor() {
    }

    static baseURL() { return "http://localhost:3000/sportPlace" }

    static createSportPlace(sportPlace) {
        return new Promise((resolve, reject) => {
            HttpService.post(SportPlaceService.baseURL(), sportPlace, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getSportPlaces() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SportPlaceService.baseURL()}`,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }
}