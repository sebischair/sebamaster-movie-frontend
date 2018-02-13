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

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieForm movie={this.state.movie} />);
    }
}
