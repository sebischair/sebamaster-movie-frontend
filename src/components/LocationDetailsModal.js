import {Button, Col, Glyphicon, Grid, Label, ListGroup, ListGroupItem, Modal, Panel, Row} from 'react-bootstrap';
import React from "react";
import Moment from "react-moment";
import EventService from "../services/EventService";
import UserService from "../services/UserService";

export default class LocationDetailsModal extends React.Component {

    constructor(props) {
        super(props);
    }

    createActivityList(){
        let acts = [];
        if(this.props.location) {
            for (let i = 0; i < this.props.location.activities.length; i++) {
                let act = this.props.location.activities[i];
                acts.push(<ListGroupItem key={i}>
                    <Glyphicon glyph={'knight'}/>{' ' + act}
                </ListGroupItem>);
            }
        }
        return acts;
    }

    render() {
        let location = this.props.location;

        return <Modal show={this.props.show} onHide={() => {
            this.props.handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title componentClass={'h3'}>{location.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <ListGroup>
                    <ListGroupItem>
                        {'Opening Hours: ' + location.openingHours}
                    </ListGroupItem>
                    <ListGroupItem>{'Description: ' + location.description}</ListGroupItem>
                </ListGroup>
                <hr/>
                <h4>Activities</h4>
                <ListGroup>
                    {this.createActivityList()}
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