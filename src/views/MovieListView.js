"use strict";

import React from 'react';

import MovieService from '../services/MovieService';
import {MovieList} from './../components/MovieList';


export class MovieListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        MovieService.getMovies().then((resp) => {
            this.setState({
                data: [...resp.data],
                loading: false
            });
        });

    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieList data={this.state.data} />);
    }
}
