"use strict";

import React from 'react';

import MovieService from '../services/MovieService';
import MovieList from './../components/MovieList';


export default class ListView extends React.Component {

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

        MovieService.getMovies().then((data) => {
            this.setState({
                data: [...data],
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
