import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import React from "react";
import {Button, Glyphicon, ListGroup, ListGroupItem, Panel} from "react-bootstrap";

export default class EventMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded : true
        };

        this.createMarkers = this.createMarkers.bind(this);
        this.calculateCenter = this.calculateCenter.bind(this);
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

    calculateCenter(){
        // Default: Munich
        let lat = 48.137154;
        let lng = 11.576124;
        // Center as average of all locations of events
        if(this.props.events && this.props.events.length > 0){
            lat = 0;
            lng = 0;
            this.props.events.forEach((event) => {
                lat += event.sportPlace.loc.coordinates[1];
                lng += event.sportPlace.loc.coordinates[0];
            });
            lat = lat / this.props.events.length;
            lng = lng / this.props.events.length;
        }
        return {lat : lat, lng : lng};
    }

    render() {
        const FinalMap = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={this.calculateCenter()}
            >
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