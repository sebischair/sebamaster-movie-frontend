"use strict";

import React from 'react';
import Styled from 'styled-components';


class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO : style a nice footer
        return (
            <div className={this.props.className}>
                <p>Creators: Markus Hinz, Linus Michel, Daria Kushnarenko, Michael Weber. All rights reserved.</p>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: white;
    border-top: solid 1px gray;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;