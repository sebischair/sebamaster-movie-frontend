"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col, Panel, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup, Button, Checkbox, HelpBlock } from 'react-bootstrap';

import Page from '../components/Page';
import ActivityService from '../services/ActivityService';
import EventService from '../services/EventService';
import InfoModal from '../components/InfoModal';
import DateTimeField from "../components/DateTimeField";
import CounterInput from 'react-bootstrap-personalized-counter';
import SportPlaceService from "../services/SportPlaceService";
import SportPlaceMap from "../components/SportPlaceMap";
import UserService from "../services/UserService";

export class CreateEventView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                activity: '',
                sportPlace: '',
                maxParticipants: 2,
                start_date: new Date(),
                start_time: undefined,
                end_date: new Date(),
                end_time: undefined,
                description: '',
            },
            activities: undefined,
            sportPlaces: undefined,
            locationName: '',
            info: {
                showInfo: false,
                body: undefined,
                type: undefined
            },
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleActivityChange = this.handleActivityChange.bind(this);

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLocationTextChange = this.handleLocationTextChange.bind(this);
        this.handleLocationMapChange = this.handleLocationMapChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isEverythingFilled = this.isEverythingFilled.bind(this);
        this.setModal = this.setModal.bind(this);
    }

    componentWillMount() {
        ActivityService.getActivities().then((data) => {
            data.sort();
            this.setState({ activities: data });
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });

        SportPlaceService.getSportPlaces().then((data) => {
            data.sort();
            this.setState({ sportPlaces: data});
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

    handleActivityChange(e) {
        let form = this.state.form;
        form.activity = e.target.value;
        this.setState({ form: form });
    }

    handleParticipantsChange(number) {
        let form = this.state.form;
        form.maxParticipants = number;
        this.setState({ form: form });
    }

    handleStartDateChange(day){
        let form = this.state.form;
        form.start_date = day;
        this.setState({form : form});
        // Close date picker without using refs
        document.body.click();
    }

    handleStartTimeChange(e){
        let form = this.state.form;
        form.start_time = e.target.value;
        this.setState({form : form});
    }

    handleEndDateChange(day){
        let form = this.state.form;
        form.end_date= day;
        this.setState({form : form});
        // Close date picker without using refs
        document.body.click();
    }

    handleEndTimeChange(e) {
        let form = this.state.form;
        form.end_time = e.target.value;
        this.setState({form : form});
    }

    handleDescriptionChange(e) {
        let form = this.state.form;
        form.description = e.target.value;
        this.setState({ form: form });
    }

    handleSubmit(e) {

        let submitEvent = {};

        submitEvent.name = this.state.form.name;
        submitEvent.activity = this.state.form.activity;
        submitEvent.sportPlace = this.state.form.sportPlace;
        submitEvent.maxParticipants = this.state.form.maxParticipants;

        if(this.state.form.start_date) {
            submitEvent.start = this.state.form.start_date;
            submitEvent.start.setHours(0, 0, 0);
            if (this.state.form.start_time) {
                let split = this.state.form.start_time.split(':');
                if (split.length == 2) {
                    submitEvent.start.setHours(split[0], split[1], 0);
                }
            }
        }
        if(this.state.form.end_date) {
            submitEvent.end = this.state.form.end_date;
            submitEvent.end.setHours(23, 59, 59);
            if (this.state.form.end_time) {
                let split = this.state.form.end_time.split(':');
                if (split.length == 2) {
                    submitEvent.end.setHours(split[0], split[1], 59);
                }
            }
        }

        submitEvent.creator = UserService.getCurrentUser().id;
        submitEvent.participants = [submitEvent.creator];
        submitEvent.description = this.state.form.description;
        submitEvent.sportPlace = this.state.form.sportPlace;

        //console.log(JSON.stringify(submitForm));

        EventService.createEvent(submitEvent).then((data) => {
            this.setModal(true, <div><h4>Successfully added Event!</h4><p>{submitEvent.name}</p></div>, "success");
        }).catch((e) => {
            console.log(e);
            this.setModal(true, e, "danger");
        });

    }

    handleLocationMapChange(name,id) {
        let form = this.state.form;
        form.sportPlace = id;
        this.setState({
            form: form,
            locationName: name
        });
    }

    handleLocationTextChange(e) {
        this.setState({ locationName: e.target.value });
    }

    isEverythingFilled() {
        const state = this.state;
        return true;
        // return state.form.name != '' && state.form.description != '' && state.form.loc.coordinates.length == 2;
    }

    setModal(showInfo, body, type) {
        let info = this.state.info;
        info.showInfo = showInfo;
        info.body = body;
        info.type = type;
        this.setState({ info: info });
    }

    renderActivityOptions(){
        let result = [];
        if(this.state.activities){
            this.state.activities.forEach((activity) => {
                result.push(<option value={activity} key={activity}>{activity}</option>);
            });
        }
        return result;
    }

    render() {
        return (
            <Page>
                {this.state.info.showInfo && <InfoModal show={this.state.info.showInfo} info={this.state.info.body}
                                                        type={this.state.info.type} handleClose={ () => {this.setModal(false)}} />}
                <Grid>
                    <Row>
                        <Col xs={12} sm={12}><PageHeader style={{ marginTop: '10px', }}>
                            <small>Create Event</small>
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
                                                <FormGroup controlId="setActivity">
                                                    <ControlLabel>Activity</ControlLabel>
                                                    <InputGroup>
                                                        <InputGroup.Addon><Glyphicon glyph={'knight'}/></InputGroup.Addon>
                                                        <FormControl componentClass="select"
                                                                     onChange = {this.handleActivityChange}>
                                                            {this.state.activities && this.renderActivityOptions()}
                                                        </FormControl>
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup controlId="setMaxParticipants">
                                                    <ControlLabel>Maximum Number of Participants</ControlLabel>
                                                    <CounterInput value={this.state.form.maxParticipants} min={0} max={500} glyphPlus={{glyph:'glyphicon glyphicon-plus', position:'right'}} glyphMinus={{glyph:'glyphicon glyphicon-minus', position:'left'}} onChange={ (value) => { this.handleParticipantsChange(value) } } />
                                                </FormGroup>
                                                <DateTimeField label={"Start Time"} date={this.state.form.start_date} time={this.state.form.start_time} handleDateChange = {this.handleStartDateChange} handleTimeChange = {this.handleStartTimeChange}/>
                                                <DateTimeField label={"End Time"} date={this.state.form.end_date} time={this.state.form.end_time} handleDateChange = {this.handleEndDateChange} handleTimeChange = {this.handleEndTimeChange}/>
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

                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <FormGroup controlId="setLocation">
                                                    <ControlLabel>Location</ControlLabel>
                                                    <InputGroup>
                                                        <FormControl
                                                            type="text"
                                                            value={this.state.locationName}
                                                            placeholder="Location Name"
                                                            onChange={this.handleLocationTextChange}>
                                                        </FormControl>
                                                        <InputGroup.Addon><Glyphicon glyph={'map-marker'} /></InputGroup.Addon>
                                                    </InputGroup>
                                                    <HelpBlock>The location has to be selected via the map.</HelpBlock>
                                                    <br></br>
                                                    <SportPlaceMap updateLocation={this.handleLocationMapChange}></SportPlaceMap>
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