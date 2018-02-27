"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton, ListItem } from 'react-md';
import { withRouter } from 'react-router-dom'

import UserService from  '../services/UserService';

class KebabMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.getCurrentUser().user
        }
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <MenuButton
                id={this.props.id}
                icon
                className={this.props.className}
                menuItems={this.state.user ? [
                    <ListItem key={1} primaryText={this.state.user}/>,
                    <ListItem key={2} primaryText="Add Movie" onClick={() => this.props.history.push('/add')}/>,
                    <ListItem key={3} primaryText="Logout" />
                ]: [<ListItem key={1} primaryText="Login" onClick={() => this.props.history.push('/login')}/>]}
            >
                more_vert
            </MenuButton>
        );
    }
}

KebabMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuItems: PropTypes.array
};

export default withRouter(KebabMenu);