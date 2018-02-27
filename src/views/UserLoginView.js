"use strict";

import React from 'react';

import UserLogin from '../components/UserLogin';

import UserService from '../services/UserService';


export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    login(user) {
        UserService.login(user.username, user.password).then((resp) => {
            console.log(resp);
        }).catch((e) => {
            console.log('ok');
            console.log(e);
        })
    }

    render() {
        return (
          <UserLogin onSubmit={(user) => this.login(user)}></UserLogin>
        );
    }
}