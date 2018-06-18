"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col, Panel, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup, Button, Checkbox, HelpBlock } from 'react-bootstrap';

import Page from '../components/Page';
import LocationMap from '../components/LocationMap';
import ActivityService from '../services/ActivityService';


export class AddLocationView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                openingHours: '',
                description: '',
                location: {
                    name: '',
                },
                activities: [],
            },
            activities: undefined
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOpeningHoursChange = this.handleOpeningHoursChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderActivities = this.renderActivities.bind(this);
        this.onLocationSet = this.onLocationSet.bind(this);
        this.isEverythingFilled = this.isEverythingFilled.bind(this);
    }

    componentWillMount() {
        //Mocked
        //this.state.activities = ["Running", "Hiking"]

        // Load activities
        ActivityService.getActivities().then((data) => {
            data.sort();
            this.setState({ activities: data})
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    handleNameChange(e) {
        let form = this.state.form;
        form.name = e.target.value;
        this.setState({ form: form });
    }

    handleOpeningHoursChange(e) {
        let form = this.state.form;
        form.openingHours = e.target.value;
        this.setState({ form: form });
    }

    handleDescriptionChange(e) {
        let form = this.state.form;
        form.description = e.target.value;
        this.setState({ form: form });
    }

    handleCheckboxChange(activity, checked) {
        var form = this.state.form;
        if (checked) {
            form.activities.push(activity);
        } else {
            let index = form.activities.indexOf(activity);
            form.activities.splice(index, 1);
        }
        this.setState({ form: form });
    }

    handleSubmit(e) {
        console.log(this.state.form)
    }

    renderActivities() {
        let result = [];
        if (this.state.activities) {
            this.state.activities.forEach((activity) => {
                result.push(<Checkbox key={activity} onClick={e => this.handleCheckboxChange(activity, e.target.checked)} >{activity}</Checkbox>);
            });
        }
        return result;
    }

    onLocationSet(location) {
        let form = this.state.form;
        form.location = location;
        this.setState({ form: form });
    }

    isEverythingFilled() {
        const state = this.state;
        return state.form.name != '' && state.form.openingHours != '' && state.form.description != '' && state.form.activities.length > 0 && state.form.location.name != '';
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
                    <Row>
                        <Col xs={12} sm={12}>
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3"><Glyphicon glyph={'plus'} /> Properties</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <form>
                                        <Row>
                                            <Col xs={12} sm={12} md={8} lg={4}>
                                                <FormGroup controlId="setName">
                                                    <ControlLabel>Name</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.form.name}
                                                        placeholder="Name"
                                                        onChange={this.handleNameChange}>
                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup controlId="setOpeningHours">
                                                    <ControlLabel>Opening Hours</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.form.openingHours}
                                                        placeholder="Opening Hours"
                                                        onChange={this.handleOpeningHoursChange}>
                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup controlId="setDescription">
                                                    <ControlLabel>Description</ControlLabel>
                                                    <FormControl
                                                        componentClass="textarea"
                                                        rows={10}
                                                        value={this.state.form.description}
                                                        placeholder="Description"
                                                        onChange={this.handleDescriptionChange}>
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} sm={12} md={4} lg={2}>
                                                <FormGroup controlId="setActivities">
                                                    <ControlLabel>Activities</ControlLabel>
                                                    {this.state.activities && this.renderActivities()}
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <FormGroup controlId="setLocation">
                                                    <ControlLabel>Location</ControlLabel>
                                                    <InputGroup>
                                                        <FormControl
                                                            type="text"
                                                            value={this.state.form.location.name}
                                                            placeholder="Location"
                                                            disabled={true}>
                                                        </FormControl>
                                                        <InputGroup.Addon><Glyphicon glyph={'map-marker'} /></InputGroup.Addon>
                                                    </InputGroup>
                                                    <HelpBlock>The location has to be selected via the map.</HelpBlock>
                                                    <br></br>
                                                    <LocationMap onLocationSet={this.onLocationSet}></LocationMap>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} sm={12}>
                                                <Button disabled={!this.isEverythingFilled()} type="submit" bsStyle='primary' onClick={this.handleSubmit}>Submit</Button>
                                                {' '}
                                            </Col>
                                        </Row>
                                    </form>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
