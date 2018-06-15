"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

import UserService from  '../services/UserService';


class NavMenu extends React.Component {

    constructor(props) {
        super(props);

        // Determine key to correctly highlight the selected nav bar item
        let key = 0;
        switch(this.props.location.pathname){
            case '/myevents':
                key = 1;
                break;
            case '/joinevent':
                key = 2;
                break;
            case '/createevent':
                key = 3;
                break;
            case '/addlocation':
                key = 4;
                break;
            default:
                key = 0;
                break;
        }
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            selectedKey: key
        }
    }

    // Routing triggered by nav bar items
    handleSelect(eventKey) {
        switch(eventKey){
            case 1:
                this.props.history.push('/myevents');
                break;
            case 2:
                this.props.history.push('/joinevent');
                break;
            case 3:
                this.props.history.push('/createevent');
                break;
            case 4:
                this.props.history.push('/addlocation');
                break;
            default:
                break;
        }
    }

    render() {
            return(
                    <div>{this.state.user &&
                        (<Nav activeKey={this.state.selectedKey} onSelect={(key) => this.handleSelect(key)}>
                            <NavItem eventKey={1}>
                                My Events
                            </NavItem>
                            <NavItem eventKey={2}>
                                Join Event
                            </NavItem>
                            <NavItem eventKey={3}>
                                Create Event
                            </NavItem>
                            <NavItem eventKey={4}>
                                Add Location
                            </NavItem>
                        </Nav>)}
                    </div>
            );
    }

}

NavMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default withRouter(NavMenu);