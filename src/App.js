"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import ListView    from './views/ListView';
import ItemView    from './views/ItemView';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Master/Detail Example in React',
            routes: [
                { component: ListView , path: '/', exact: true },
                { component: ItemView , path: '/:id'},
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

