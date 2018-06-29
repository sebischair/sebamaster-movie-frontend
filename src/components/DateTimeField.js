"use strict";

import React from 'react';
import {
    Glyphicon,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    OverlayTrigger,
    Popover
} from 'react-bootstrap';
import DayPicker from 'react-day-picker/DayPicker';
import 'react-day-picker/lib/style.css';

export default class DateTimeField extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            validation : undefined,
        };

        this.validateTime = this.validateTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.validateTime(nextProps.time);
    }

    validateTime(time) {
        if(time === "" || time === undefined) {
            this.setState({validation: undefined});
            return;
        }
        let split = time.split(":");
        if(time.length > 5 || split.length !== 2){
            this.setState({validation: "error"});
            return;
        }
        let hour = parseInt(split[0]);
        let min = parseInt(split[1]);
        console.log(hour + " " + min);
        if(hour === undefined || hour === "" || isNaN(hour) || min == undefined || min === "" || isNaN(min) || hour < 0 || hour > 24 || min > 59 || min < 0){
            this.setState({validation: "error"});
        } else {
            this.setState({validation: undefined});
        }
    }

    render() {
        return <FormGroup>
            <ControlLabel>{this.props.label}</ControlLabel>
            <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
                <Popover id="date-picker-start">
                    <DayPicker onDayClick={(day) => this.props.handleDateChange(day)} selectedDays={this.props.date}/>
                </Popover>}
            >
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph={'calendar'}/></InputGroup.Addon>
                    <FormControl
                        type="text"
                        placeholder="DD.MM.YYYY"
                        value={this.props.date ? this.props.date.toLocaleDateString() : ""}
                        onChange={() => {
                        }}
                    />
                </InputGroup>
            </OverlayTrigger>
            <FormGroup validationState = {this.state.validation}>
                <InputGroup style={{marginTop: "5px"}}>
                    <InputGroup.Addon><Glyphicon glyph={'time'}/></InputGroup.Addon>
                    <FormControl
                        type="text"
                        value={this.props.time}
                        placeholder="HH:MM"
                        size='5'
                        onChange={(e) => {
                            this.props.handleTimeChange(e);
                        }}
                    />
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
        </FormGroup>;
    };

}