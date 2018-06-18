import {Panel, Button, Label, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import Moment from 'react-moment';
import EventService from '../services/EventService';
import React from "react";
import UserService from "../services/UserService";

export default class EventCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let event = this.props.event;
        const clipTextStyle = {overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace : 'nowrap'};

        return <Panel>
            <Panel.Heading>
                <Panel.Title componentClass = "h4" style = {clipTextStyle}>
                    {event.name}
                </Panel.Title>
            </Panel.Heading>
            <ListGroup>
                <ListGroupItem><h4>{event.activity}</h4>
                    <p style={clipTextStyle}>{event.description}</p>
                </ListGroupItem>
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
                <Button bsStyle={'primary'} disabled = {EventService.checkParticipation(event)} onClick = {() => {this.props.joinEvent(event)}}>Join</Button>
                {' '}
                <Button onClick = {()=>{this.props.showEventDetails(this.props.event);}}>Details</Button>
                <h3 style={{float : 'right'}}><Label bsStyle={event.participants.length < event.maxParticipants ? "success" : "danger"}>
                    {event.participants.length + '/' + event.maxParticipants}
                </Label></h3>
            </Panel.Footer>
        </Panel>;
    }
}