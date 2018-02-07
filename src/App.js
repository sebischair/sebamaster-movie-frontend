"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import MovieListView    from './views/MovieListView';
import MovieDetailView    from './views/MovieDetailView';
import MovieEditAddView    from './views/MovieEditAddView';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Master/Detail Example in React',
            routes: [
                { component: MovieListView , path: '/', exact: true },
                { component: MovieDetailView , path: '/show/:id'},
                { component: MovieEditAddView , path: '/edit/:id'},
                { component: MovieEditAddView , path: '/add'}
            ]
        };

    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
             <Router>
                 <Switch>
                    {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                 </Switch>
             </Router>
        );
    }
}

