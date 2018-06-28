"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { HomeView } from "./views/HomeView";
import { MyEventsView } from "./views/MyEventsView";
import { JoinEventView } from "./views/JoinEventView";
import { CreateEventView } from "./views/CreateEventView";
import { AddLocationView } from "./views/AddLocationView";

import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";

import UserService from "./services/UserService";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Meet2Sport',
            routes: [
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<HomeView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }} , path: '/', exact: true},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<MyEventsView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/myevents'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<JoinEventView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/joinevent',},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<CreateEventView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/createevent',},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<AddLocationView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/addlocation',},
                { render: (props) => {
                        if(!UserService.isAuthenticated()) {
                            return (<UserLoginView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/'}/>)
                        }}, path: '/login'},
                { render: (props) => {
                        if(!UserService.isAuthenticated()) {
                            return (<UserSignupView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/'}/>)
                        }}, path: '/register'},
            ]
        };
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

