import {Alert, Button, Modal} from 'react-bootstrap';
import React from "react";

export default class InfoModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Modal show={this.props.show} onHide={() => {
            this.props.handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title componentClass={'h3'}>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert bsStyle={this.props.type}>
                    {this.props.info}
                </Alert>
            </Modal.Body>
            {this.props.children}
            <Modal.Footer>
                <Button onClick = {() => {this.props.handleClose();}}>Proceed</Button>
            </Modal.Footer>
        </Modal>;
    }
}