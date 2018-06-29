
import React from "react";
import { Button, Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");


export default class LocationMap extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(this.props.marker, nextProps.marker)){
            return false;
        }
        return true;
    }

    render() {
        const MapWithASearchBox = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {};

                    this.setState({
                        center: {
                            lat: 48.137154, lng: 11.576124
                        },
                        marker : this.props.marker,
                        onMapMounted: ref => {
                            refs.map = ref;
                        }
                    })
                },
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={13}
                defaultCenter={props.marker ? props.marker.position : props.center}
            >
                {props.marker ? <Marker position={props.marker.position} /> : undefined }
            </GoogleMap>
        );

        return <MapWithASearchBox marker = {this.props.marker} />;
    }
}