"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon } from 'react-md';
import { Link } from 'react-router-dom';
import { SimpleLink } from './SimpleLink';

export class MovieListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn><Link to={`/show/${this.props.movie.id}`}><FontIcon>image</FontIcon></Link></TableColumn>
                <TableColumn><SimpleLink to={`/show/${this.props.movie.id}`}>{this.props.movie.title}</SimpleLink></TableColumn>
                <TableColumn><Link to={`/edit/${this.props.movie.id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                <TableColumn><FontIcon>delete</FontIcon></TableColumn>
            </TableRow>
        );
    }
}