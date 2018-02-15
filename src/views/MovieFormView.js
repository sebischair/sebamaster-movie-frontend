"use strict";

import React from 'react';
import MovieService from '../services/MovieService';
import {MovieForm} from './../components/MovieForm';


export class MovieFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        if(this.props.location != undefined && this.props.location.state != undefined && this.props.location.state.movie != undefined) {
            this.setState({
                loading: false,
                movie: this.props.location.state.movie
            });
        } else {
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
    }

    goBack(id) {
        console.log(this.props.location);
        if(this.props.location.state != undefined && this.props.location.state.fromList) {
            this.props.history.push('/');
        } else {
            this.props.history.push(`/show/${id}`)
        }
    }

    updateMovie(movie) {
        MovieService.updateMovie(movie).then((resp) => {
            if(this.props.location.state != undefined && this.props.location.state.fromList) {
                this.props.history.push('/');
            } else {
                this.props.history.push(`/show/${movie.id}`)
            }
        }).catch((e) => {
           console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieForm movie={this.state.movie} onAbort={(id) => this.goBack(id)} onSubmit={(movie) => this.updateMovie(movie)} />);
    }
}
