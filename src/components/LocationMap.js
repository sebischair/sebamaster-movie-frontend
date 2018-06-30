
import React from "react";
import Geocode from "react-geocode";

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");


export default class LocationMap extends React.PureComponent {

    constructor(props) {
        super(props);

        Geocode.setApiKey("AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU");
        Geocode.enableDebug();
        this.onRightClick = this.onRightClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(this.props.marker, nextProps.marker)){
            return false;
        }
        return true;
    }

    onRightClick(loc){
        Geocode.fromLatLng(loc.lat, loc.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                this.props.onLocationSet(address,loc);
            },
            error => {
                console.error(error);
            }
        );
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
                        },
                        onRightClick: target => {
                            debugger;
                            this.props.rightClickCallback({lat : target.latLng.lat(), lng : target.latLng.lng()});
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
                onRightClick={props.onRightClick}
            >
                {props.marker ? <Marker position={props.marker.position} /> : undefined }
            </GoogleMap>
        );

        return <MapWithASearchBox marker = {this.props.marker} rightClickCallback = {this.onRightClick} />;
    }
}