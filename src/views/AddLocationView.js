"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

import Page from '../components/Page';


export class AddLocationView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <Page>
                <PageHeader>
                    Add Location <small>(Work in progress)</small>
                </PageHeader>

                <Grid>
                    <Row className="show-grid">
                        <Col md={3}>
                            1
                        </Col>
                        <Col md={3}>
                            2
                        </Col>
                        <Col md={3}>
                            3
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
