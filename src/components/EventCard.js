import {Panel, Button, Label, ListGroup, ListGroupItem} from 'react-bootstrap';
import Moment from 'react-moment';
import React from "react";

export default class EventCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let event = this.props.event;

        return <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h4">{event.name}</Panel.Title>
            </Panel.Heading>
            <ListGroup>
                    <ListGroupItem>Activity: {event.activity}</ListGroupItem>
                    <ListGroupItem>Description: {event.description}</ListGroupItem>
                    <ListGroupItem bsStyle={new Date(event.end)<new Date() ? "danger" : undefined}>
                        {'Time: '}
                        <Moment format="DD.MM.YYYY HH:mm">{event.start}</Moment>
                        {' - '}
                        <Moment format={new Date(event.start).toLocaleDateString() !== new Date(event.end).toLocaleDateString() ? "DD.MM.YYYY HH:mm" : "HH:mm"}>
                            {event.end}
                        </Moment>
                    </ListGroupItem>
            </ListGroup>
            <Panel.Footer>
                <Button bsStyle={'primary'}>Join</Button>
                {' '}
                <Button onClick = {()=>{this.props.showEventDetails(this.props.event);}}>Details</Button>
                <h3 style={{float : 'right'}}><Label bsStyle={event.participants.length < event.maxParticipants ? "success" : "danger"}>
                    {event.participants.length + '/' + event.maxParticipants}
                </Label></h3>
            </Panel.Footer>
        </Panel>;
    }
}