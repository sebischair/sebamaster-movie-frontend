"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import { MovieListView } from './views/MovieListView';
import { MovieDetailView }   from './views/MovieDetailView';
import { MovieFormView }   from './views/MovieFormView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import UserService from "./services/UserService";




export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Movie Example App',
            routes: [
                { component: MovieListView , path: '/', exact: true},
                { component: MovieDetailView , path: '/show/:id'},
                { component: MovieFormView , path: '/edit/:id'},
                { component: MovieFormView , path: '/add'},
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'}
            ]
        };

        $(document).ajaxSend(function(event, jqXHR, ajaxOptions, data) {
            if(ajaxOptions.url.indexOf(UserService.apiURL()) === 0) {
                let token = window.localStorage['jwtToken'];

                if(token) {
                    jqXHR.setRequestHeader('Authorization', 'JWT ' + token);
                }
            }
        });

        $(document).ajaxSuccess(function(event, jqXHR, ajaxOptions, data) {
            if(data.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = data.token;
            }
        });
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

