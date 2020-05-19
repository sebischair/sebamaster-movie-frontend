"use strict";

import React from 'react';

import UserSignup from '../components/UserSignup';

import UserService from '../services/UserService';


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async signup(user) {
        try {
            let ret = await UserService.register(user.username, user.password);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
            <UserSignup onSubmit={(user) => this.signup(user)} error={this.state.error}></UserSignup>
        );
    }
}