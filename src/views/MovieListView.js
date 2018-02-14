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

    deleteMovie(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        MovieService.deleteMovie(id).then((resp) => {
            if(resp == 200) {
                let movieIndex = this.state.data.map(movie => movie['id']).indexOf(id);
                let movies = this.state.data;
                movies.splice(movieIndex, 1);
                this.setState({
                   data: [...movies],
                   loading: false
                });
            } else {
                this.setState({
                    data: [...this.state.data],
                    loading: false
                });
                console.log(`The movie with id ${id} was not found`);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieList data={this.state.data} onDelete={(id) => this.deleteMovie(id)} />);
    }
}
