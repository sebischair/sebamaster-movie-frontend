"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { withRouter } from 'react-router-dom'

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class MovieForm extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.movie != undefined) {
            this.state = {
                title : props.movie.title,
                year : props.movie.year,
                rating : props.movie.mpaa_rating,
                synopsis: props.movie.synopsis
            };
        } else {
            this.state = {
                title : '',
                year : '',
                rating : '',
                synopsis: ''
            };
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(value) {
        this.setState(Object.assign({}, this.state, {title: value}));
    }

    handleChangeYear(value) {
        this.setState(Object.assign({}, this.state, {year: value}));
    }

    handleChangeRating(value) {
        this.setState(Object.assign({}, this.state, {rating: value}));
    }

    handleChangeSynopsis(value) {
        this.setState(Object.assign({}, this.state, {synopsis: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let movie = this.props.movie;
        if(movie == undefined) {
            movie = {};
        }

        movie.title = this.state.title;
        movie.mpaa_rating = this.state.rating;
        movie.year = this.state.year;
        movie.synopsis = this.state.synopsis;

        this.props.onSubmit(movie);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Title"
                            id="TitleField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.title}
                            onChange={this.handleChangeTitle}
                            errorText="Title is required"/>
                        <TextField
                            label="Year"
                            id="YearField"
                            type="number"
                            className="md-row"
                            required={true}
                            value={this.state.year}
                            onChange={this.handleChangeYear}
                            errorText="Year is required"
                            maxLength={4}/>
                        <TextField
                            label="Rating"
                            id="RatingField"
                            type="text"
                            className="md-row"
                            required={false}
                            value={this.state.rating}
                            onChange={this.handleChangeRating}/>
                        <TextField
                            label="Synopsis"
                            id="SynopsisField"
                            type="text"
                            className="md-row"
                            rows={5}
                            required={true}
                            value={this.state.synopsis}
                            onChange={this.handleChangeSynopsis}
                            errorText="Synopsis is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.year.toString().length != 4 || this.state.title == undefined || this.state.title == '' || this.state.year == undefined || this.state.year == '' || this.state.synopsis == undefined || this.state.synopsis == ''}
                                raised primary className="md-cell md-cell--2">Save</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(MovieForm);