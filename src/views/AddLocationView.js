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
                <Grid>
                    <Row>
                        <Col xs={12} sm={12}><PageHeader style={{ marginTop: '10px', }}>
                            <small>Add Location</small>
                        </PageHeader></Col>
                    </Row>

                </Grid>
            </Page>
        );
    }
}
