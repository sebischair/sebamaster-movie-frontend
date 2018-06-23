"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Panel} from "react-bootstrap";

class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            validationState: {
                username: undefined,
                password: undefined
            }
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.isValidInput = this.isValidInput.bind(this);
    }

    handleChangeUsername(e) {
        this.setState(Object.assign({}, this.state, {username: e.target.value}));
    }

    handleChangePassword(e) {
        this.setState(Object.assign({}, this.state, {password: e.target.value}));
    }

    handleSubmit() {
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    resetForm() {
        this.setState({
            username: '',
            password: ''
        });
    }

    isValidInput() {
        if (this.state.username === undefined || this.state.username === "" || this.state.password === undefined || this.state.password === "") {
            return false;
        }
        return true;
    }

    render() {
        return <Panel>
            <Panel.Heading>
                <Panel.Title>{this.props.isLogin ? "Login" : "Sign Up"}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalUser">
                        <Col componentClass={ControlLabel} sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Username" value={this.state.username}
                                         onChange={this.handleChangeUsername}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" value={this.state.password}
                                         onChange={this.handleChangePassword}/>
                        </Col>
                    </FormGroup>
                </Form>
                {this.props.error && <Alert bsStyle = "danger">{this.props.error}</Alert>}
                {this.props.isLogin ? <a onClick={() => this.props.history.push("/register")}>{"Not registered yet?"}</a> : undefined}
            </Panel.Body>
            <Panel.Footer>
                <Button disabled={!this.isValidInput()} bsStyle={this.props.isLogin ? "primary" : "success"} onClick={this.handleSubmit}>
                    <Glyphicon glyph={this.props.isLogin ? "log-in" : "pencil"}/>
                    {this.props.isLogin ? " Login" : " Sign Up"}
                    </Button>
                {' '}
                <Button onClick={this.resetForm}>Reset</Button>
            </Panel.Footer>
        </Panel>;
    }
};

export default withRouter(UserForm);