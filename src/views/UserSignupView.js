"use strict";

import React from 'react';

import UserService from '../services/UserService';
import Page from "../components/Page";
import {Grid, Row, Col} from "react-bootstrap";
import UserForm from "../components/UserForm";
import InfoModal from "../components/InfoModal";


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info:{
                showInfo: false,
                body: undefined,
                type: undefined}
        };
        this.signUp = this.signUp.bind(this);
        this.proceedInfoModal = this.proceedInfoModal.bind(this);
    }

    signUp(user) {
        this.setState({
            error: undefined
        });
        UserService.register(user.username, user.password).then((data) => {
            this.setState({
                info:{
                        showInfo: true,
                        body: <div><h3>{"Successfully signed up!"}</h3>
                            <p>{"Click on 'proceed' to enter the community."}</p>
                        </div>,
                        type: "success"}
            });
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        })
    }

    proceedInfoModal(){
        this.setState({
            info:{
                showInfo: false,
                body: undefined,
                type: undefined}
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <Page>
                {this.state.info.showInfo && <InfoModal show={this.state.info.showInfo} info={this.state.info.body}
                                                        type={this.state.info.type} handleClose={this.proceedInfoModal}/>}
                <Grid>
                    <Row>
                        <Col xsHidden sm={12}>
                            <div style={{height: "65px"}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} smOffset={2} sm={8}>
                            <UserForm onSubmit={(user) => this.signUp(user)} isLogin={false} error={this.state.error}/>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}