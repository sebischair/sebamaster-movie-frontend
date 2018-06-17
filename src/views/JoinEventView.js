"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
import EventFilter from '../components/EventFilter';
import EventMap from '../components/EventMap';
import Page from '../components/Page';

import EventService from '../services/EventService';
import EventCardStack from "../components/EventCardsStack";


export class JoinEventView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events : undefined
        };

        this.onFilterSubmit = this.onFilterSubmit.bind(this);
        this.showEventDetails= this.showEventDetails.bind(this);
    }

    componentWillMount(){

    }

    onFilterSubmit(filter){
        EventService.getEvents(filter).then((data) => {
            this.setState({events : data});
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    showEventDetails(event){
        alert(event.activity + ", " + event.participants.length + "/" + event.maxParticipants);
    }

    render() {
        return (
            <Page>
                <Grid>
                    <Row>
                        <Col xs={12} sm={12}><PageHeader style={{marginTop : '10px',}}>
                            <small>Join Event</small>
                        </PageHeader></Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4}><EventFilter onFilterSubmit = {this.onFilterSubmit} /></Col>
                        <Col xsHidden sm={12} md={8}><EventMap events = {this.state.events} showEventDetails = {this.showEventDetails}/></Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12}><EventCardStack events = {this.state.events} showEventDetails = {this.showEventDetails}/></Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
