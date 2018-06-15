"use strict";

import React from 'react';

import { PageHeader } from 'react-bootstrap';

import Page from '../components/Page';


export class AddLocationView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return (
            <Page>
                <PageHeader>
                    Add Location <small>(Work in progress)</small>
                </PageHeader>
            </Page>
        );
    }
}
