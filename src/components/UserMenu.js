"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import UserService from '../services/UserService';


class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if (this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    handleSelect(eventKey) {
        switch(eventKey){
            case 1.1:
                alert("Not implemented yet!");
                break;
            case 1.2:
                this.logout();
                break;
            case 2:
                if (this.props.location.pathname != 'login/') {
                    this.props.history.push('/login');
                }
                else {
                    window.location.reload();
                }
                break;
            case 4:
                if (this.props.location.pathname != '/register') {
                    this.props.history.push('/register');
                }
                else {
                    window.location.reload();
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (<div>
                {this.state.user ? (<Nav pullRight onSelect={key => this.handleSelect(key)}>
                    <NavDropdown eventKey={1} id="user-dropdown"
                                 title={<span><Glyphicon glyph={'user'}/> {this.state.user.username}</span>}>
                        <MenuItem eventKey={1.1}><Glyphicon glyph={'cog'}/> Edit Profile</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={1.2}><Glyphicon glyph={'log-out'}/> Logout</MenuItem>
                    </NavDropdown>
                </Nav>) : (<Nav pullRight onSelect={key => this.handleSelect(key)}>
                    <NavItem eventKey={2}>
                        <Glyphicon glyph={'log-in'}/> Login
                    </NavItem>
                    <NavItem eventKey={3} disabled>
                        or
                    </NavItem>
                    <NavItem eventKey={4}>
                        <Glyphicon glyph={'pencil'}/> Sign Up
                    </NavItem>
                </Nav>)
                }
            </div>
        );
    }

}

UserMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default withRouter(UserMenu);