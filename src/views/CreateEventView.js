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
import LocationDetailsModal from "../components/LocationDetailsModal";
import {Typeahead} from 'react-bootstrap-typeahead';
import Loading from 'react-loading-components';

export class CreateEventView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // form includes Attributes stored in Database on Submit
            form: {
                name: '',
                activity: '',
                selectedSportPlaceID: '',
                maxParticipants: 2,
                start_date: new Date(),
                start_time: undefined,
                end_date: new Date(),
                end_time: undefined,
                description: '',
            },
            // Temporary Attributes for UI
            activities: undefined,  // Possible Activities to render
            sportPlaces: undefined, // Filterd Sportplaces (by form:activity)
            selectedLocationName: '',       // Name of currently selected Location (to display in Typefield)
            locationValidation: undefined,  // To mark Typefield red/green
            showDetails: false,             // shows details window
            selectedLocation: undefined,    // Showed in details window
            loaded: false,          // Marks if componentWillMount() finished -> render
            // info is for user error messages
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
        this.handleLocationSelect = this.handleLocationSelect.bind(this);   // On Marker / Search Box change
        this.updateLocation = this.updateLocation.bind(this);   // On Select click
        this.handleSubmit = this.handleSubmit.bind(this);   // Input validation and database entry
        this.setModal = this.setModal.bind(this);   // Displays error message on input validation
        this.showLocationDetails= this.showLocationDetails.bind(this);
        this.hideLocationDetails= this.hideLocationDetails.bind(this);
    }

    componentWillMount() {
        // Read possible activities from database
        /*
        ActivityService.getActivities().then((data) => {
            data.sort();    // Alphabetic sort
            let form = this.state.form;
            form.activity = data[0];    // Set selected Activity on first in List
            this.setState({
                form: form,
                activities: data
            });
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });*/

        // Initialize Activity field
        let data = ["Select Location first"]
        let form = this.state.form;
        form.activity = data[0];
        this.setState({
            form: form,
            activities: data
        })

        // Read Sportplaces from database
        SportPlaceService.getSportPlaces().then((data) => {
            data.sort();
            this.setState({
                sportPlaces: data,
                loaded: true
            });
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    // Changes in fillout form
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

    handleLocationTextChange(input) {
        this.setState({
            locationValidation: "error",
            selectedLocationName: input,
        });
    }

    handleLocationSelect(location) {
        this.setState({
            showDetails : true,
            selectedLocation : location
        });
    }

    updateLocation(location) {
        let name = location.name;
        let id = location._id;
        let activities = location.activities
        let form = this.state.form;
        form.selectedSportPlaceID = id;
        activities.sort();  // Sort alphabetical
        form.activity = activities[0];    // Set selected Activity on first in SportsPlace list
        this.setState({
            form: form,
            selectedLocationName: name,
            activities: activities,
            showDetails : false,
            selectedLocation : undefined,
            locationValidation: "success"
        });
    }

    handleSubmit(e) {
        // Input Validation
        let errorArray = [];
        if(!this.state.form.name) {
            errorArray.push("Event Name not set");
        }
        if(!this.state.form.activity || this.state.form.activity == "Select Location first") {
            errorArray.push("Activity not set");
        }
        if(!this.state.form.selectedSportPlaceID) {
            errorArray.push("Location not set");
        }
        if(this.state.form.maxParticipants < 2) {
            errorArray.push("Number of Participants must be at least 2");
        }
        if(!this.state.form.start_date) {
            errorArray.push("Start Date not set");
        }
        if(!this.state.form.start_time) {
            errorArray.push("Start Time not set");
        }
        if(!this.state.form.end_date) {
            errorArray.push("End Date not set");
        }
        if(!this.state.form.end_time) {
            errorArray.push("End Time not set");
        }
        if(!this.state.form.description) {
            errorArray.push("Description not set");
        }
        if(errorArray.length > 0) {
            let errorString = errorArray[0];
            for(let i=1;i<errorArray.length;i++){
                errorString += ", " + errorArray[i];
            }
            this.setModal(true, <div><h4>The following Error(s) occurred</h4><p>{errorString}</p></div>, "danger");
            return;
        }

        // Create json Object to send to backend
        let submitEvent = {};
        submitEvent.name = this.state.form.name;
        submitEvent.activity = this.state.form.activity;
        submitEvent.sportPlace = this.state.form.selectedSportPlaceID;
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
        submitEvent.sportPlace = this.state.form.selectedSportPlaceID;

        EventService.createEvent(submitEvent).then((data) => {
            this.setModal(true, <div><h4>Successfully added Event!</h4><p>{submitEvent.name}</p></div>, "success");
        }).catch((e) => {
            console.log(e);
            this.setModal(true, e, "danger");
        });

    }

    setModal(showInfo, body, type) {
        let info = this.state.info;
        info.showInfo = showInfo;
        info.body = body;
        info.type = type;
        this.setState({ info: info });
    }

    showLocationDetails(location){
        this.setState({
            showDetails : true,
            selectedLocation : location
        });
    }

    hideLocationDetails(){
        this.setState({
            showDetails : false,
            selectedLocation : undefined
        });
    }

    renderActivityOptions(){
        let result = [];
        if(this.state.activities){
            this.state.activities.forEach((activity) => {
                if(activity == "Select Location first") {
                    result.push(<option value="" selected disabled hidden>{activity}</option>);
                } else {
                    result.push(<option value={activity} key={activity}>{activity}</option>);
                }
            });
        }
        return result;
    }

    render() {
        if (!this.state.loaded) return <Loading type='tail_spin'/>;
        return (
            <Page>
                {this.state.showDetails && <LocationDetailsModal location = {this.state.selectedLocation} show={this.state.showDetails}
                                                              handleClose = {this.hideLocationDetails} selectLocation={this.updateLocation}/>}
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
                                    <Panel.Title componentClass="h3">Properties</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <form>
                                        <Row>
                                            <Col xs={12} sm={12} md={4} lg={4}>
                                                <FormGroup controlId="setName">
                                                    <ControlLabel>Name</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.form.name}
                                                        placeholder="Name"
                                                        onChange={this.handleNameChange}>
                                                    </FormControl>
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

                                            <Col xs={12} sm={12} md={8} lg={8}>
                                                <FormGroup controlId="setActivity">
                                                    <ControlLabel>Activity</ControlLabel>
                                                    <InputGroup>
                                                        <InputGroup.Addon><Glyphicon glyph={'knight'}/></InputGroup.Addon>
                                                        <FormControl componentClass="select"
                                                                     onChange = {this.handleActivityChange}>
                                                            {this.state.activities && this.renderActivityOptions()}
                                                        </FormControl>
                                                    </InputGroup>
                                                    <HelpBlock>The activity list updates with location select.</HelpBlock>
                                                </FormGroup>
                                                <ControlLabel>Location</ControlLabel>
                                                <FormGroup controlId="TypeaheadLocation" validationState = {this.state.locationValidation}>
                                                    <InputGroup>
                                                        <InputGroup.Addon><Glyphicon glyph={'map-marker'} /></InputGroup.Addon>
                                                        <Typeahead
                                                            onChange={(location) => {
                                                                if(location.length == 1) {
                                                                    this.handleLocationSelect(location[0]);
                                                                }
                                                            }}
                                                            onInputChange={(input) => {
                                                                this.handleLocationTextChange(input);
                                                            }}
                                                            options={this.state.sportPlaces}
                                                            labelKey="name"
                                                            selected={[this.state.selectedLocationName]}
                                                            maxResults={10}
                                                            selectHintOnEnter={true}
                                                            emptyLabel={'No matching locations found'}
                                                            placeholder="Select a location..."
                                                        />
                                                    </InputGroup>
                                                    <br></br>
                                                    <SportPlaceMap updateLocation={this.handleLocationSelect}></SportPlaceMap>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} sm={12}>
                                                <Button type="submit" bsStyle='primary' onClick={this.handleSubmit}>Submit</Button>
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