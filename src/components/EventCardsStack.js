import {Col, Glyphicon, Grid, Panel, Row} from 'react-bootstrap';
import React from "react";
import EventCard from './EventCard';

export default class EventCardStack extends React.Component {

    constructor(props) {
        super(props);

        this.createEventCards = this.createEventCards.bind(this);
        this.sortEvents = this.sortEvents.bind(this);
    }

    sortEvents(events){
        if(events && events.length > 0){
            events.sort((a,b)=>{
                let aDate = new Date(a.start);
                let bDate = new Date(b.start);
                if(aDate < bDate){
                    return -1;
                } else {
                    return 1;
                }
            });
        }
        return events;
    }

    createEventCards(){
        let cards = [];
        let events = this.sortEvents(this.props.events);
        for(let i = 0; i<events.length; i++){
            let event = events[i];
            cards.push(<Col xs={12} sm={4} md={3}  key={i}>
                <EventCard event={event} showEventDetails = {this.props.showEventDetails} joinEvent = {this.props.joinEvent}/>
            </Col>);
        }
        return cards;
    }

    render() {
        return <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h3"><Glyphicon glyph = {'list'}/> Events</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <Grid>
                    <Row>
                        {(this.props.events && this.props.events.length > 0) ? this.createEventCards() : "No events found."}
                    </Row>
                </Grid>
            </Panel.Body>
        </Panel>;
    }
}