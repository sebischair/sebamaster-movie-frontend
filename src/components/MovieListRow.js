"use strict";

import React from 'react';
import FaFile from 'react-icons/lib/fa/file'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'
import { Link } from 'react-router-dom'
import { ListItem, Button } from 'react-md';

export class MovieListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            /*<tr>
                <td><FaFile /></td>
                <td></td>
                <td><FaEdit /></td>
                <td><FaTrash /></td>
            </tr>*/
                <ListItem
                    leftNode={<FaFile />}
                    rightIcon={<FaEdit /><FaTrash />}
                    primaryText={<Link to={`/show/${this.props.movie.id}`}>{this.props.movie.title}</Link>}
                />
        )
    }
}