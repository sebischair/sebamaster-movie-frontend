"use strict";

import React from 'react';
import {MovieListRow} from './MovieListRow';
import Page from './Page'
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

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
    </Page>
);

