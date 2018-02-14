"use strict";

import React from 'react';
import MovieService from '../services/MovieService';
import {MovieDetail} from './../components/MovieDetail';


export class MovieDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        MovieService.getMovie(id).then((resp) => {
            this.setState({
                movie: resp,
                loading: false
            });
        });

    }

    deleteMovie(id) {
        MovieService.deleteMovie(id).then((resp) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieDetail movie={this.state.movie} onDelete={(id) => this.deleteMovie(id)}/>);
    }
}
