"use strict";

import React from 'react';

import { PageHeader } from 'react-bootstrap';

import Page from '../components/Page';


export class MyEventsView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return (
            <Page>
                <PageHeader>
                    My Events <small>(Work in progress)</small>
                </PageHeader>
            </Page>
        );
    }
}
