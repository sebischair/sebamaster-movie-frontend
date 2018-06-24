"use strict";

import HttpService from "./HttpService";

export default class ActivityService {

    constructor() {

    }

    static baseURL() {return "http://localhost:3000"; }

    static getActivities() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ActivityService.baseURL()}` + "/activity",
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }

}