"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { Link } from 'react-router-dom'
import { AlertMessage } from './AlertMessage';

const style = { maxWidth: 500 };

export class MovieForm extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.movie != undefined) {
            this.state = {
                title : props.movie.title,
                year : props.movie.year,
                rating : props.movie.mpaa_rating,
                synopsis: props.movie.synopsis,
                doAlert: false
            };
        } else {
            this.state = {
                title : '',
                year : '',
                rating : '',
                synopsis: '',
                doAlert: false
            };
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
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

        if(movie.title == undefined || movie.title == '' || movie.year == undefined || movie.year == '' || movie.synopsis == undefined || movie.synopsis == '') {
            console.log(this.para);
            this.setState(Object.assign({}, this.state, {doAlert: true}));
        }
         else {
            this.props.onSubmit(movie);
        }
    }

    handleAbort(event) {
        if(this.props.movie != undefined) {
            this.props.onAbort(this.props.movie.id);
        } else {
            this.props.onAbort();
        }
    }

    render() {
        return (
            <Card style={style} className="md-block-centered">
                <form className="md-grid" onSubmit={this.handleSubmit} onReset={this.handleAbort}>
                    <TextField
                        label="Title"
                        id="TitleField"
                        type="text"
                        className="md-row"
                        required={true}
                        value={this.state.title}
                        onChange={this.handleChangeTitle}/>
                    <TextField
                        label="Year"
                        id="YearField"
                        type="number"
                        className="md-row"
                        required={true}
                        value={this.state.year}
                        onChange={this.handleChangeYear}/>
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
                        onChange={this.handleChangeSynopsis}/>

                    <Button id="submit" type="submit" raised primary className="md-cell md-cell--2">Save</Button>
                    <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                    <AlertMessage className="md-row md-full-width" >{this.state.doAlert ? 'Please provide all information required' : ''}</AlertMessage>
                </form>
            </Card>
        );
    }
}