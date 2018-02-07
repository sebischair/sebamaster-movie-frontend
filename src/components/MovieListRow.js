"use strict";

import React from 'react';
import FaFile from 'react-icons/lib/fa/file'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'


export class MovieListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td><FaFile /></td>
                <td>{this.props.movie.title}</td>
                <td><FaEdit /></td>
                <td><FaTrash /></td>
            </tr>
        );
    }
}