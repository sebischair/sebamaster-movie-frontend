"use strict";

import React from 'react';

import {
    Button,
    Glyphicon,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    OverlayTrigger,
    Popover,
    PageHeader,
    Panel
} from 'react-bootstrap';
import DayPicker from 'react-day-picker/DayPicker';
import EventService from '../services/EventService'
import 'react-day-picker/lib/style.css';
import {LocationSearchField} from "./LocationSearchField";

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter : {
                activity : 'All',
                location : '11.587,48.145,5',
                radius : 5,
                start_date: new Date(),
                start_time: undefined,
                end_date: undefined,
                end_time: undefined
            },
            activities : undefined
        };

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
        EventService.getActivities().then((data) => {
            data.sort();
            this.state.activities = data;
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    handleActivityChange(e){
        let filter = this.state.filter;
        filter.activity = e.target.value;
        this.setState({filter : filter});
    }
    handleLocationChange(e){
        let filter = this.state.filter;
        filter.location = e.target.value;
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
        this.setState({
            filter : {
                activity : 'All',
                location : '11.587,48.145,5',
                radius : 5,
                start_date: new Date(),
                start_time: undefined,
                end_date: undefined,
                end_time: undefined
            }
        });
        this.handleFilterSubmit();
    }

    // build consumable filter object
    handleFilterSubmit(){
        let filter = {};
        if(this.state.filter.start_date) {
            filter.start = this.state.filter.start_date;
            filter.start.setHours(0, 0, 0);
            if (this.state.filter.start_time) {
                let split = this.state.filter.start_time.split(':');
                if (split.length == 2) {
                    filter.start.setHours(split[0], split[1], 0);
                }
            }
        }
        if(this.state.filter.end_date) {
            filter.end = this.state.filter.end_date;
            filter.end.setHours(23, 59, 59);
            if (this.state.filter.end_time) {
                let split = this.state.filter.end_time.split(':');
                if (split.length == 2) {
                    filter.end.setHours(split[0], split[1], 59);
                }
            }
        }
        if(this.state.filter.activity !== "All"){
            filter.activity = this.state.filter.activity;
        }
        if(this.state.filter.location){
            filter.location = this.state.filter.location;
        }
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
                                <FormControl placeholder="All"
                                             componentClass="select"
                                             onChange = {this.handleActivityChange}>
                                    <option value="All" key={"All"}>All</option>
                                    {this.state.activities && this.renderActivityOptions()}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="filterLocation">
                                <ControlLabel>Location</ControlLabel>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        value={this.state.filter.location}
                                        placeholder="Location"
                                        onChange={this.handleLocationChange}
                                    />
                                    <InputGroup.Addon><Glyphicon glyph={'map-marker'}/></InputGroup.Addon>
                                </InputGroup>
                                <InputGroup style = {{marginTop : "5px"}}>
                                    <FormControl placeholder="Radius"
                                                 componentClass="select"
                                                 onChange = {this.handleRadiusChange}
                                                    defaultValue = {this.state.filter.radius}>
                                        <option value={1} key={"1km"}>1km</option>
                                        <option value={3} key={"3km"}>3km</option>
                                        <option value={5} key={"5km"}>5km</option>
                                        <option value={10} key={"10km"}>10km</option>
                                        <option value={20} key={"20km"}>20km</option>
                                    </FormControl>
                                    <InputGroup.Addon><Glyphicon glyph={'record'}/></InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup controlId="filterStart">
                                <ControlLabel>Start Time</ControlLabel>
                                <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
                                    <Popover id="date-picker-start">
                                        <DayPicker onDayClick={this.handleStartDateChange} selectedDays={this.state.filter.start_date}/>
                                    </Popover>}
                                >
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="DD.MM.YYYY"
                                            value = {this.state.filter.start_date ? this.state.filter.start_date.toLocaleDateString() : undefined}
                                            onChange = {() => {}}
                                        />
                                        <InputGroup.Addon><Glyphicon glyph={'calendar'}/></InputGroup.Addon>
                                    </InputGroup>
                                </OverlayTrigger>
                                <InputGroup style = {{marginTop : "5px"}}>
                                <FormControl
                                     type="text"
                                     value={this.state.filter.start_time}
                                     placeholder="HH:MM"
                                     size='5'
                                     onChange={this.handleStartTimeChange}
                                />
                                <InputGroup.Addon><Glyphicon glyph={'time'}/></InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup controlId="filterEnd">
                                <ControlLabel>End Time</ControlLabel>
                                <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
                                    <Popover id="date-picker-end">
                                        <DayPicker onDayClick={this.handleEndDateChange} selectedDays={this.state.filter.end_date}/>
                                    </Popover>}
                                >
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="DD.MM.YYYY"
                                            value = {this.state.filter.end_date ? this.state.filter.end_date.toLocaleDateString() : undefined}
                                            onChange = {() => {}}
                                        />
                                        <InputGroup.Addon><Glyphicon glyph={'calendar'}/></InputGroup.Addon>
                                    </InputGroup>
                                </OverlayTrigger>
                                <InputGroup style = {{marginTop : "5px"}}>
                                    <FormControl
                                        type="text"
                                        value={this.state.filter.end_time}
                                        placeholder="HH:MM"
                                        size='5'
                                        onChange={this.handleEndTimeChange}
                                    />
                                    <InputGroup.Addon><Glyphicon glyph={'time'}/></InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <LocationSearchField/>
                            </FormGroup>
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

export default EventFilter;