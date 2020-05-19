"use strict";

import React from 'react';

import { MovieDetail } from '../components/MovieDetail';

import MovieService from '../services/MovieService';


export class MovieDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        MovieService.getMovie(id).then((data) => {
            this.setState({
                movie: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    async deleteMovie(id) {
        try {
            let ret = await MovieService.deleteMovie(id);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MovieDetail movie={this.state.movie} onDelete={(id) => this.deleteMovie(id)}/>
        );
    }
}
