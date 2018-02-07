"use strict";

import React from 'react';
import MovieListRow from "./MovieListRow";

export default class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((movie, i) => <MovieListRow key={i} movie={movie} />)}
                </tbody>
            </table>
        );
    }
}