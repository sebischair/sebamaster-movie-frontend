"use strict";

import React from 'react';

import { PageHeader, Grid, Row, Col, Panel, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup, Button, Checkbox, HelpBlock } from 'react-bootstrap';

import Page from '../components/Page';
import LocationMap from '../components/LocationMap';
import ActivityService from '../services/ActivityService';
import EventService from '../services/EventService';
import InfoModal from '../components/InfoModal';
import DateTimeField from "../components/DateTimeField";
import CounterInput from 'react-bootstrap-personalized-counter';
import SportPlaceService from "../services/SportPlaceService";

export class CreateEventView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                activity: '',
                start_date: new Date(),
                start_time: undefined,
                end_date: undefined,
                end_time: undefined,
                description: '',
                loc: {
                    type: 'Point',
                    coordinates: []
                },
            },
            activities: undefined,
            locations: undefined,
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLocationSet = this.onLocationSet.bind(this);
        this.isEverythingFilled = this.isEverythingFilled.bind(this);
        this.setModal = this.setModal.bind(this);
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

        SportPlaceService.getSportPlaces().then((data) => {
            data.sort();
            this.setState({ locations: data})
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
        const event = this.state.form;
        EventService.createEvent(event).then((data) => {
            this.setModal(true, <div><h4>Successfully added location!</h4><p>{sportPlace.name}</p></div>, "success");
        }).catch((e) => {
            console.log(e);
            this.setModal(true, e, "danger");
        });
    }

    onLocationSet(location) {
        let form = this.state.form;
        form.loc.coordinates = [location.longitude, location.latitude];
        this.setState(
            {
                form: form,
                locationName: location.name
            }
        );
    }

    isEverythingFilled() {
        const state = this.state;
        return state.form.name != '' && state.form.description != '' && state.form.loc.coordinates.length == 2;
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
                                                    <CounterInput value={2} min={0} max={500} glyphPlus={{glyph:'glyphicon glyphicon-plus', position:'right'}} glyphMinus={{glyph:'glyphicon glyphicon-minus', position:'left'}} onChange={ (value) => { console.log(value) } } />
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
