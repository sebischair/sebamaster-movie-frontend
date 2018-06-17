import {Col, Glyphicon, Grid, Panel, Row} from 'react-bootstrap';
import React from "react";
import EventCard from './EventCard';

export default class EventCardStack extends React.Component {

    constructor(props) {
        super(props);

        this.createEventCards = this.createEventCards.bind(this);
    }

    createEventCards(){
        let cards = [];
        this.props.events.forEach((event) => {
            cards.push(<Col xs={12} sm={4} md={3}>
                <EventCard event={event} showEventDetails = {this.props.showEventDetails}/>
            </Col>);
        });
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