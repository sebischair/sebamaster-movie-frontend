"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { Link } from 'react-router-dom'

const style = { maxWidth: 500 };

export class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            title : props.movie.title,
            year : props.movie.year,
            rating : props.movie.mpaa_rating,
            synopsis: props.movie.synopsis
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeYear(event) {
        this.setState({year: event.target.value});
    }

    handleChangeRating(event) {
        this.setState({rating: event.target.value});
    }

    handleChangeSynopsis(event) {
        this.setState({synopsis: event.target.value});
    }

    handleSubmit(event) {

    }

    handleAbort(event) {

    }

    render() {
        return (
            <Card style={style} className="md-block-centered">
                <form className="md-grid" onSubmit={this.handleSubmit} onReset={this.handleAbort}>
                    <TextField
                        label="Title"
                        type="text"
                        className="md-row"
                        required={true}
                        value={this.state.title}
                        onChange={this.handleChangeTitle}/>
                    <TextField
                        label="Year"
                        type="number"
                        className="md-row"
                        required={true}
                        value={this.state.year}
                        onChange={this.handleChangeYear}/>
                    <TextField
                        label="Rating"
                        type="text"
                        className="md-row"
                        required={false}
                        value={this.state.rating}
                        onChange={this.handleChangeRating}/>
                    <TextField
                        label="Synopsis"
                        type="text"
                        className="md-row"
                        rows={5}
                        required={true}
                        value={this.state.synopsis}
                        onChange={this.handleChangeSynopsis}/>

                    <Button id="submit" type="submit" raised primary className="md-cell md-cell--2">Save</Button>
                    <Button id="submit" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                </form>
            </Card>
        );
    }
}