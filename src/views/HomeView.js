"use strict";

import React from 'react';

import {
    Jumbotron,
    Grid,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Button
} from 'react-bootstrap';

import banner_small from '../img/banner_small.png';
import land_people from '../img/land_people.png';

import Page from '../components/Page';
import UserService from "../services/UserService";


export class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <Page>
                <div style={{
                    width: "100%", minHeight: "100vh", marginTop: "-72px",
                    backgroundImage: "url(" + land_people + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}>
                    <Grid style={{paddingTop: "72px"}}>
                        <Row>
                            <Col xsHidden sm={12}>
                                <div style={{height: "65px"}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={8} smOffset={2}>
                                <Jumbotron style={{opacity: "0.95"}}>
                                    <img src={banner_small} alt="Meet2Sport" style={{
                                        width: "320px",
                                        maxWidth: "100%",
                                        height: 'auto',
                                        marginBottom: "-20px"
                                    }}/>
                                    <hr/>
                                    {UserService.isAuthenticated() ? <div>
                                        <p>Welcome {UserService.getCurrentUser().username}!</p>
                                        <p>What do you want to do?</p>
                                        <br/>
                                        <ListGroup>
                                            <ListGroupItem onClick = {() => {this.props.history.push('/myevents')}}><Glyphicon glyph={'th-list'}/>{' Manage and track your events'}</ListGroupItem>
                                            <ListGroupItem onClick = {() => {this.props.history.push('/joinevent')}}><Glyphicon glyph={'search'}/>{' Search and join local sport events'}</ListGroupItem>
                                            <ListGroupItem onClick = {() => {this.props.history.push('/createevent')}}><Glyphicon glyph={'plus'}/>{' Create your own sport event'}</ListGroupItem>
                                            <ListGroupItem onClick = {() => {this.props.history.push('/addlocation')}}><Glyphicon glyph={'edit'}/>{' Register your favorite sport place'}</ListGroupItem>
                                        </ListGroup>
                                        </div>
                                    : <div>
                                            <p>Arrange sport meetings with like-minded people. </p>
                                            <p>Stay fit together.</p>
                                            <br/>
                                        <Button bsStyle="success" bsSize="large" onClick = {() => {this.props.history.push('/register')}}>
                                            {'Sign Up Now'}
                                        </Button>
                                        {' or '}
                                        <Button bsStyle="primary" bsSize="large" onClick = {() => {this.props.history.push('/login')}}>
                                            {'Login'}
                                        </Button>
                                    </div>}
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </Page>
        );
    }
}
