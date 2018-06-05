"use strict";

import React from 'react';

import { PageHeader } from 'react-bootstrap';

import Page from '../components/Page';


export class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return (
            <Page>
                <PageHeader>
                    Welcome to Meet2Sport <small>(Work in progress)</small>
                </PageHeader>
            </Page>
        );
    }
}
