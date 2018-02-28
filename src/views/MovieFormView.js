"use strict";

import React from 'react';

import MovieForm from './../components/MovieForm';

import MovieService from '../services/MovieService';


export class MovieFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                movie: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.movie != undefined) {
            this.setState({
                loading: false,
                movie: this.props.location.state.movie,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            MovieService.getMovie(id).then((resp) => {
                this.setState({
                    movie: resp,
                    loading: false,
                    error: undefined
                });
            });
        }
    }

    updateMovie(movie) {
        if(this.props.location.state != undefined && this.props.location.state.isAdd) {
            MovieService.createMovie(movie).then((resp) => {
                if(resp != undefined) {
                    this.props.history.push('/');
                }
                else {
                    console.log('Error while creating movie');
                    this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
                }
            }).catch((e) => {
                console.log(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            });
        } else {
            MovieService.updateMovie(movie).then((resp) => {
                if(this.props.location.state != undefined && this.props.location.state.fromList) {
                    this.props.history.push('/');
                } else {
                    this.props.history.push(`/show/${movie._id}`)
                }
            }).catch((e) => {
                console.log(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieForm movie={this.state.movie} onSubmit={(movie) => this.updateMovie(movie)} error={this.state.error} />);
    }
}
