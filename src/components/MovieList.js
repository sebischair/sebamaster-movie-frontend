"use strict";

import React from 'react';
import {MovieListRow} from './MovieListRow';
import Page from './Page'
import { List, ListItem } from 'react-md';

export const MovieList = ({data}) => (
/*    <Page>
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
                {data.map((movie, i) => <MovieListRow key={i} movie={movie} />)}
            </tbody>
        </table>
    </Page>
  */
    <Page>
        <div className="md-grid">
            <List className="md-cell md-paper md-paper--1">
                {data.map((movie, i) => <MovieListRow key={i} movie={movie} />)}
            </List>
        </div>
    </Page>
);

