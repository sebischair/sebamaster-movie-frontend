"use strict";

import React from 'react';
import {
    TableRow,
    TableColumn,
    FontIcon
} from 'react-md';


export class MovieListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn><FontIcon>image</FontIcon></TableColumn>
                <TableColumn>{this.props.movie.title}</TableColumn>
                <TableColumn><FontIcon>mode edit</FontIcon></TableColumn>
                <TableColumn><FontIcon>home</FontIcon></TableColumn>
            </TableRow>
        );
    }
}