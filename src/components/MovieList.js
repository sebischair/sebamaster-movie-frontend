"use strict";

import React from 'react';
import {MovieListRow} from './MovieListRow';
import Page from './Page'
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';
import { Link } from 'react-router-dom'

export const MovieList = ({data, onDelete}) => (
    <Page>
        <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((movie, i) => <MovieListRow key={i} movie={movie} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
        <Link to={{pathname: '/add/', state: {isAdd: true, fromList: true}}} className="md-cell md-cell--11-offset"><Button secondary icon>add</Button></Link>
    </Page>
);

