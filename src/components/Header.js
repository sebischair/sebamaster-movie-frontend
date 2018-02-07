"use strict";

import React from 'react';


export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <h1> {this.props.title}</h1>
            </div>
        );
    }
}