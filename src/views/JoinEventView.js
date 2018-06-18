"use strict";

import React from 'react';

import {PageHeader, Grid, Row, Col, Modal, Button} from 'react-bootstrap';
import EventFilter from '../components/EventFilter';
import EventMap from '../components/EventMap';
import Page from '../components/Page';

import EventService from '../services/EventService';
import EventCardStack from "../components/EventCardsStack";
import EventDetailsModal from "../components/EventDetailsModal";
import InfoModal from "../components/InfoModal";


export class JoinEventView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events : undefined,
            showDetails : false,
            selectedEvent : undefined,
            info : {
                showInfo : false,
                body : undefined,
                type : undefined
            },
            filter : undefined
        };

        this.loadEvents = this.loadEvents.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
        this.showInfoModal = this.showInfoModal.bind(this);
        this.hideInfoModal = this.hideInfoModal.bind(this);
        this.showEventDetails= this.showEventDetails.bind(this);
        this.hideEventDetails= this.hideEventDetails.bind(this);
    }

    componentWillMount(){

    }

    loadEvents(filter){
        this.setState({filter : filter});
        EventService.getEvents(filter).then((data) => {
            this.setState({events : data});
        }).catch((e) => {
            console.error(e);
            this.showInfoModal(e, "danger");
        });
    }

    joinEvent(event){
        EventService.joinEvent(event).then((data) => {
            this.showInfoModal(<div><h4>{"Successfully joined event!"}</h4>
                <p>{event.name + ' @ ' + event.sportPlace.name}</p>
                <Button bsStyle = {'success'} onClick={() => {this.props.history.push('/myevents');}}>Go to My Events</Button>
            </div>, "success");
            this.loadEvents(this.state.filter);
        }).catch((e) => {
            console.log(e);
            this.showInfoModal(e, "danger");
        });
    }

    showInfoModal(body, type){
        let info = this.state.info;
        info.showInfo = true;
        info.body = body;
        info.type = type;
        this.setState({info : info});
    }

    hideInfoModal(){
        let info = this.state.info;
        info.showInfo = false;
        this.setState({info : info});
    }

    showEventDetails(event){
        this.setState({
            showDetails : true,
            selectedEvent : event
        });
    }

    hideEventDetails(){
        this.setState({
            showDetails : false,
            selectedEvent : undefined
        });
    }

    render() {
        return (
            <Page>
                {this.state.showDetails && <EventDetailsModal event = {this.state.selectedEvent} show={this.state.showDetails}
                                                              handleClose = {this.hideEventDetails} joinEvent = {this.joinEvent} />}
                {this.state.info.showInfo && <InfoModal show={this.state.info.showInfo} info={this.state.info.body}
                                                        type={this.state.info.type} handleClose={this.hideInfoModal}/>}
                <Grid>
                    <Row>
                        <Col xs={12} sm={12}><PageHeader style={{marginTop : '10px',}}>
                            <small>Join Event</small>
                        </PageHeader></Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4}><EventFilter onFilterSubmit = {this.loadEvents} /></Col>
                        <Col xsHidden sm={12} md={8}><EventMap events = {this.state.events} showEventDetails = {this.showEventDetails}/></Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12}><EventCardStack events = {this.state.events} showEventDetails = {this.showEventDetails} joinEvent={this.joinEvent}/></Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
