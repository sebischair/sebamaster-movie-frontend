import {withScriptjs, withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";
import React from "react";
import {Glyphicon, Panel} from "react-bootstrap";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
const { compose, withProps, lifecycle} = require("recompose");
const _ = require('lodash');

export default class EventMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded : true
        };

        this.createMarkers = this.createMarkers.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(nextProps.center, this.props.center) && _.isEqual(nextProps.events, this.props.events) && nextProps.radius === this.props.radius){
            return false;
        }
        return true;
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
                    title = {event.name}
                    options = {{event : event}}
                />);
            }
        }
        return markers;
    }

    render() {

        const FinalMap = compose(
            withProps({
                googleMapURL : "https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places",
                loadingElement : <div style={{ height: `100%` }} />,
                containerElement : <div style={{ height: `400px` }} />,
                mapElement : <div style={{ height: `100%` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {};

                    this.setState({
                        center : this.props.center,
                        circle : this.props.center,
                        radius : this.props.radius,
                        markers : this.props.markers,
                        zoom : 12,
                        onMapMounted: (ref) => {
                            refs.map = ref;
                            // Set viewport to display all events found
                            if(refs.map) {
                                if (this.state.markers.length > 0) {
                                    const bounds = new google.maps.LatLngBounds();
                                    this.state.markers.map((marker, i) => {
                                        bounds.extend(new google.maps.LatLng(
                                            marker.props.position.lat,
                                            marker.props.position.lng
                                        ));
                                    });
                                    refs.map.fitBounds(bounds);
                                }
                            }
                        },
                        onZoomChanged: () => {
                            this.setState({
                                zoom : refs.map.getZoom()
                            });
                        },
                        onClusterClick : (cluster) => {
                            let showList = true;

                            let events = cluster.getMarkers().map(m => m.event);

                            // Determine weather there only markers of one sport place left => show list to user
                            for(let i = 0; i<events.length; i++){
                                if(!_.isEqual(events[0].sportPlace.loc, events[i].sportPlace.loc)){
                                    showList = false;
                                    break;
                                }
                            }
                            if(showList){
                                this.props.showEventList(events);
                            }
                        },
                        onClusteringEnd: () => {
                            if(refs.map.getZoom() > 17){
                                // No further zoom in.
                                this.setState({
                                    zoom : 17
                                });
                                // Best line of code :D
                                // Required, as map is not updating correctly on state change
                                refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(this.state.zoom);
                            }
                        }
                    });
                }
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                zoom={props.zoom}
                defaultCenter={props.center}
                ref={props.onMapMounted}
                onZoomChanged={props.onZoomChanged}
            >
                <Circle center={props.circle} radius={props.radius*1000}
                        options = {{clickable : false,
                            fillOpacity : 0.15,
                            fillColor : "#1E90FF",
                            strokeColor : "#1E90FF",
                            strokeWeight : 1.5}}
                />
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                    onClick={props.onClusterClick}
                    onClusteringEnd={props.onClusteringEnd}
                >
                    {props.markers}
                </MarkerClusterer>
            </GoogleMap>
        );

        return <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h3"><Glyphicon glyph = {'map-marker'}/> Event Map</Panel.Title>
            </Panel.Heading>
                <FinalMap center={this.props.center} radius={this.props.radius} markers={this.createMarkers()} showEventList = {this.props.showEventList}/>
        </Panel>;
    }
}