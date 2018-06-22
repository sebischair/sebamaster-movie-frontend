import {withScriptjs, withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";
import React from "react";
import {Button, Glyphicon, ListGroup, ListGroupItem, Panel} from "react-bootstrap";
const _ = require('lodash');

export default class EventMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded : true
        };

        this.createMarkers = this.createMarkers.bind(this);
    }

    createMarkers(){
        const markers = [];
        if(this.props.events) {
            for (let i = 0; i < this.props.events.length; i++) {
                let event = this.props.events[i];
                markers.push(<Marker
                    position={{lat: event.sportPlace.loc.coordinates[1], lng: event.sportPlace.loc.coordinates[0]}}
                    key={i}
                    onClick = {() => this.props.showEventDetails(event)}
                    label = {event.activity}
                />);
            }
        }
        return markers;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(nextProps.center, this.props.center) && _.isEqual(nextProps.events, this.props.events) && nextProps.radius === this.props.radius){
            return false;
        }
        return true;
    }

    render() {
        const FinalMap = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={this.props.center}
            >
                <Circle center={this.props.center} radius={this.props.radius*1000}
                    options = {{clickable : false,
                        fillOpacity : 0.15,
                        fillColor : "#1E90FF",
                        strokeColor : "#1E90FF",
                        strokeWeight : 1.5}}
                />
                {this.createMarkers()}
            </GoogleMap>
        ));

        return <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h3"><Glyphicon glyph = {'map-marker'}/> Event Map</Panel.Title>
            </Panel.Heading>
                <FinalMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}/>
        </Panel>;
    }
}