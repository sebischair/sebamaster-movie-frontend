"use strict";

import React from 'react';

import { Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import UserMenu from './UserMenu';
import NavMenu from './NavMenu';

import banner_small from '../img/banner_small.png';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#' onClick={()=>{this.props.history.push('/')}} style={{padding: '3px 15px 0px',}}>
                            <img src={banner_small} alt="Meet2Sport" style={{ height: '100%',}}/>
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <NavMenu id="nav-menu"/>
                    <UserMenu id="user-menu"/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default withRouter(Header);