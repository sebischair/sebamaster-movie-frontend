"use strict";

import React from 'react';
import Styled from 'styled-components';


class PlainHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <h2> {this.props.title}</h2>
            </div>
        );
    }
}

export const Header = Styled(PlainHeader)`
    min-height: 50px;
    height: 50px;
    background: #03a9f4;
    margin-bottom: -8px;
    margin-top: -10px;
    margin-left: -8px;
    margin-right: -8px;
    > h2 {
        color: black;
        padding-top: 10px;
        text-align: center;
    }
`;