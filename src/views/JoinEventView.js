"use strict";

import React from 'react';

import { PageHeader } from 'react-bootstrap';

import Page from '../components/Page';


export class JoinEventView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return (
            <Page>
                <PageHeader>
                    Join Event <small>(Work in progress)</small>
                </PageHeader>
            </Page>
        );
    }
}
