/**
 * Created by adrian on 04.10.17.
 */

"use strict";

import React from 'react';
import {Link} from 'react-router-dom';

import Page from './Page';

export default class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        };

    }


    render() {
        return (
            <Page>
                {this.state.data.map((item, i) => (<Link to={`/${item.id}`} key={i}>{item.name} <br /> </Link>))}
            </Page>
        );
    }
}