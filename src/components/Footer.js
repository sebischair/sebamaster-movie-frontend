"use strict";

import React from 'react';


export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <p>© {new Date().getFullYear()} sebis. All rights reserved.</p>
            </div>
        );
    }
}