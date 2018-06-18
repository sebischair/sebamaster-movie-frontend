"use strict";

import HttpService from "./HttpService";
import UserService from "./UserService";

export default class EventService {

    constructor() {

    }

    static baseURL() {return "http://localhost:3000"; }

    static buildQueryParamsString(filter){
        let queryParams = "";
        if(filter.activity)
            queryParams += "activity=" + filter.activity + "&";
        if(filter.location){
            // Need to query for sportsplace???
            // queryParams += "location=" + filter.location + "&";
        }
        if(filter.start) {
            queryParams += "start=" + filter.start.toISOString() + "&";
        }
        if(filter.end) {
            queryParams += "end=" + filter.end.toISOString() + "&";
        }
        return queryParams;
    };

    static getEvents(filter) {
        let queryParams = EventService.buildQueryParamsString(filter);
        console.log(queryParams);
        return new Promise((resolve, reject) => {
            HttpService.get(`${EventService.baseURL()}` + "/event/resolved?" + queryParams,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getActivities() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${EventService.baseURL()}` + "/activity",
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }

    static joinEvent(event){

        let user = UserService.getCurrentUser();
        let userID = user.id;

        return new Promise((resolve, reject) => {
            HttpService.put(`${EventService.baseURL()}` + "/event/join/" + event._id,
                {participant : userID},
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }

    static checkParticipation(event){
        let user = UserService.getCurrentUser();
        let userID = user.id;

        for(let i = 0; i < event.participants.length; i++){
            if(userID === event.participants[i]._id){
                return true;
            }
        }
        return false;
    }

}