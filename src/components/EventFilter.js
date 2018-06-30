"use strict";

import React from 'react';
import {geolocated} from 'react-geolocated';

import {
    Button,
    Glyphicon,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    Panel
} from 'react-bootstrap'
import ActivityService from '../services/ActivityService'
import 'react-day-picker/lib/style.css';
import {LocationSearchField} from "./LocationSearchField";
import DateTimeField from "./DateTimeField";
import Geocode from "react-geocode";

class EventFilter extends React.Component {

    constructor(props) {
        super(props);

        const defaultFilter = {
            activity : 'All',
            location : {lng : 11.576006, lat : 48.137079},
            locName : "München, DE",
            radius : 3,
            start_date: new Date(),
            start_time: undefined,
            end_date: undefined,
            end_time: undefined
        };
        this.state = {
            filter : defaultFilter,
            activities : undefined,
            initialLocFetch : false
        };

        Geocode.setApiKey("AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU");

        this.handleActivityChange = this.handleActivityChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

        this.resetFilter = this.resetFilter.bind(this);
        this.renderActivityOptions = this.renderActivityOptions.bind(this);
    }

    componentWillMount(){
        // Initial data load
        this.handleFilterSubmit();

        // Load activities
        ActivityService.getActivities().then((data) => {
            data.sort();
            this.state.activities = data;
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });

        // Set location + radius for map
        this.props.locationCallback(this.state.filter.location, this.state.filter.radius);
    }

    // If Geolocation is activated, reload
    componentWillReceiveProps(nextProps) {
        if (!this.state.initialLocFetch && nextProps.isGeolocationAvailable && nextProps.isGeolocationEnabled){
            if(nextProps.coords && nextProps.coords.latitude && nextProps.coords.longitude){
                let that = this;
                this.setState({initialLocFetch : true});
                // Get address from latidude & longitude.
                Geocode.fromLatLng(nextProps.coords.latitude, nextProps.coords.longitude).then(
                    response => {
                        let filter = that.state.filter;
                        filter.location = { lat : nextProps.coords.latitude, lng : nextProps.coords.longitude};
                        filter.locName = response.results[0].formatted_address;
                        that.setState({filter : filter});
                        that.handleFilterSubmit();
                        that.props.locationCallback(that.state.filter.location, that.state.filter.radius);
                    },
                    error => {
                        console.error(error);
                    }
                );
            }
        }
    }

    handleActivityChange(e){
        let filter = this.state.filter;
        filter.activity = e.target.value;
        this.setState({filter : filter});
    }
    handleLocationChange(name, loc){
        let filter = this.state.filter;
        filter.locName = name;
        filter.location = loc;
        this.setState({filter : filter});

    }
    handleRadiusChange(e){
        let filter = this.state.filter;
        filter.radius = e.target.value;
        this.setState({filter : filter});
    }
    handleStartDateChange(day){
        let filter = this.state.filter;
        filter.start_date = day;
        this.setState({filter : filter});
        // Close date picker without using refs
        document.body.click();
    }
    handleStartTimeChange(e){
        let filter = this.state.filter;
        filter.start_time = e.target.value;
        this.setState({filter : filter});
    }
    handleEndDateChange(day){
        let filter = this.state.filter;
        filter.end_date= day;
        this.setState({filter : filter});
        // Close date picker without using refs
        document.body.click();
    }
    handleEndTimeChange(e) {
        let filter = this.state.filter;
        filter.end_time = e.target.value;
        this.setState({filter : filter});
    }
    resetFilter(){
        const defaultFilter = {
            activity : 'All',
            location : {lng : 11.576006, lat : 48.137079},
            locName : "München, DE",
            radius : 3,
            start_date: new Date(),
            start_time: undefined,
            end_date: undefined,
            end_time: undefined
        };
        this.setState({
            filter : defaultFilter
        });
        this.handleFilterSubmit();
    }

    // build consumable filter object for backend request
    handleFilterSubmit(){
        let filter = {};
        // Specify start time
        if(this.state.filter.start_date) {
            filter.start = this.state.filter.start_date;
            // Check and validate optional hour:minute field, overwrite current start time only on valid input
            if (this.state.filter.start_time) {
                let split = this.state.filter.start_time.split(':');
                if (split.length == 2) {
                    let hour = parseInt(split[0]);
                    let min = parseInt(split[1]);
                    if(hour !== undefined && hour !== "" && !isNaN(hour) && min !== undefined && min !== "" && !isNaN(min) && hour >= 0 && hour < 24 && min <= 59 && min >= 0){
                        filter.start.setHours(hour, min, 0);
                    }
                }
            } else {
                filter.start.setHours(0, 0, 0);
            }
        }
        // Specify end time
        if(this.state.filter.end_date) {
            filter.end = this.state.filter.end_date;
            // Check and validate optional hour:minute, overwrite current end time only on valid input
            if (this.state.filter.end_time) {
                let split = this.state.filter.end_time.split(':');
                if (split.length == 2) {
                    let hour = parseInt(split[0]);
                    let min = parseInt(split[1]);
                    if(hour !== undefined && hour !== "" && !isNaN(hour) && min !== undefined && min !== "" && !isNaN(min) && hour >= 0 && hour < 24 && min <= 59 && min >= 0){
                        filter.end.setHours(hour, min, 59);
                    }
                }
            } else {
                filter.end.setHours(23, 59, 59);
            }
        }
        // Specify selected activity
        if(this.state.filter.activity !== "All"){
            filter.activity = this.state.filter.activity;
        }
        // Specify location filter string
        if(this.state.filter.location && this.state.filter.radius){
            filter.location = this.state.filter.location.lng + "," + this.state.filter.location.lat + "," + this.state.filter.radius;
        }

        // Update map location and submit filter
        this.props.locationCallback(this.state.filter.location, this.state.filter.radius);
        this.props.onFilterSubmit(filter);
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
            <Panel defaultExpanded>
                <Panel.Heading>
                    <Panel.Title componentClass="h3"><Glyphicon glyph = {'filter'}/><Panel.Toggle> Filter Events</Panel.Toggle></Panel.Title>
                </Panel.Heading>
                <Panel.Collapse><Panel.Body>
                    <form>
                            <FormGroup controlId="filterActivity">
                                <ControlLabel>Activity</ControlLabel>
                                <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph={'knight'}/></InputGroup.Addon>
                                <FormControl placeholder="All"
                                             componentClass="select"
                                             onChange = {this.handleActivityChange}>
                                    <option value="All" key={"All"}>All</option>
                                    {this.state.activities && this.renderActivityOptions()}
                                </FormControl>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup controlId="filterLocation">
                                <ControlLabel>Location</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph={'map-marker'}/></InputGroup.Addon>
                                        <LocationSearchField locName = {this.state.filter.locName} handleLocationChange = {(name,loc) => {this.handleLocationChange(name,loc);}}/>
                                </InputGroup>
                                <InputGroup style = {{marginTop : "5px"}}>
                                    <InputGroup.Addon><Glyphicon glyph={'record'}/></InputGroup.Addon>
                                    <FormControl placeholder="Radius"
                                                 componentClass="select"
                                                 onChange = {this.handleRadiusChange}
                                                    value = {this.state.filter.radius}>
                                        <option value={1} key={"1km"}>1km</option>
                                        <option value={3} key={"3km"}>3km</option>
                                        <option value={5} key={"5km"}>5km</option>
                                        <option value={10} key={"10km"}>10km</option>
                                        <option value={20} key={"20km"}>20km</option>
                                    </FormControl>
                                </InputGroup>
                            </FormGroup>
                        <DateTimeField label={"Start Time"} date={this.state.filter.start_date} time={this.state.filter.start_time} handleDateChange = {this.handleStartDateChange} handleTimeChange = {this.handleStartTimeChange}/>
                        <DateTimeField label={"End Time"} date={this.state.filter.end_date} time={this.state.filter.end_time} handleDateChange = {this.handleEndDateChange} handleTimeChange = {this.handleEndTimeChange}/>
                    </form>
                </Panel.Body></Panel.Collapse>
                <Panel.Footer>
                    <Button type="submit" bsStyle='primary' onClick = {this.handleFilterSubmit}><Glyphicon glyph={'search'}/> Search</Button>
                    {' '}
                    <Button onClick = {this.resetFilter}>Reset</Button>
                </Panel.Footer>
            </Panel>
        );
    }
};

export default geolocated()(EventFilter);
