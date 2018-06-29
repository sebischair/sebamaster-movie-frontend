import {Button, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import React from "react";

export default class EventListModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let events = this.props.events;
        let listItems = [];
        for(let i = 0; i<events.length; i++){
            let event = events[i];
            listItems.push(<ListGroupItem key={i} header={event.name}
                                          bsStyle={event.participants.length >= event.maxParticipants ? "danger" : undefined}
                                          onClick={() => {
                                              this.props.handleClose();
                                              this.props.showEventDetails(event);
                                          }}>
                {event.activity}
            </ListGroupItem>);
        }

        return <Modal show={this.props.show} onHide={() => {
            this.props.handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title componentClass={'h3'}>{"Select an event."}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    this.props.handleClose();
                }}>Close</Button>
            </Modal.Footer>
        </Modal>;
    }
}