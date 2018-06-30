"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col, Panel, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup, Button, Checkbox, HelpBlock } from 'react-bootstrap';

import Page from '../components/Page';
import LocationMap from '../components/LocationMap';
import ActivityService from '../services/ActivityService';
import SportPlaceService from '../services/SportPlaceService';
import InfoModal from '../components/InfoModal';
import {LocationSearchField} from "../components/LocationSearchField";


export class AddLocationView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                openingHours: '',
                description: '',
                loc: {
                    type: 'Point',
                    coordinates: []
                },
                activities: [],
            },
            activities: undefined,
            locationName: '',
            info: {
                showInfo: false,
                body: undefined,
                type: undefined
            },
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOpeningHoursChange = this.handleOpeningHoursChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderActivities = this.renderActivities.bind(this);
        this.onLocationSet = this.onLocationSet.bind(this);
        this.isEverythingFilled = this.isEverythingFilled.bind(this);
        this.setModal = this.setModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentWillMount() {
        ActivityService.getActivities().then((data) => {
            data.sort();
            this.setState({ activities: data })
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
        const sportPlace = this.state.form;
        SportPlaceService.createSportPlace(sportPlace).then((data) => {
            this.setModal(true, <div><h4>Successfully added location!</h4><p>{sportPlace.name}</p></div>, "success");
            this.resetForm();
        }).catch((e) => {
            console.log(e);
            this.setModal(true, e, "danger");
        });
    }

    renderActivities() {
        let result = [];
        if (this.state.activities) {
            this.state.activities.forEach((activity) => {
                result.push(<Checkbox key={activity} checked={this.state.form.activities.includes(activity)} onChange={e => this.handleCheckboxChange(activity, e.target.checked)} >{activity}</Checkbox>);
            });
        }
        return result;
    }

    onLocationSet(name, location) {
        let form = this.state.form;
        form.loc.coordinates = [location.lng, location.lat];
        this.setState(
            {
                form: form,
                locationName: name
            }
        );
    }

    isEverythingFilled() {
        const state = this.state;
        return state.form.name != '' && state.form.openingHours != '' && state.form.description != '' && state.form.activities.length > 0 && state.form.loc.coordinates.length == 2;
    }

    setModal(showInfo, body, type) {
        let info = this.state.info;
        info.showInfo = showInfo;
        info.body = body;
        info.type = type;
        this.setState({ info: info });
    }

    resetForm() {
        this.setState({
            form: {
                name: '',
                openingHours: '',
                description: '',
                loc: {
                    type: 'Point',
                    coordinates: []
                },
                activities: [],
            },
            locationName: ''
        })
    }

    render() {
        return (
            <Page>
                {this.state.info.showInfo && <InfoModal show={this.state.info.showInfo} info={this.state.info.body}
                    type={this.state.info.type} handleClose={ () => {this.setModal(false)}} />}
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
                                                        <LocationSearchField locName={this.state.locationName} handleLocationChange={this.onLocationSet}/>
                                                        <InputGroup.Addon><Glyphicon glyph={'map-marker'} /></InputGroup.Addon>
                                                    </InputGroup>
                                                    <HelpBlock>Type in address of location or select via right click on map.</HelpBlock>
                                                    <br></br>
                                                    <LocationMap marker = {this.state.form.loc.coordinates.length === 2 ?
                                                        {position : {lng : this.state.form.loc.coordinates[0], lat : this.state.form.loc.coordinates[1]}}
                                                        : undefined} onLocationSet = {this.onLocationSet} />
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
