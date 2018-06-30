import React from "react";
import SportPlaceService from "../services/SportPlaceService";

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

export default class SportPlaceMap extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {

        // Read SportPlaces out of Database
        SportPlaceService.getSportPlaces().then((data) => {
            data.sort();
            this.setState({markers: data})
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });

    }

    render() {
        // Build Map
        const MapWithAMarkerClusterer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withHandlers({
                onMarkerClustererClick: () => (markerClusterer) => {
                    const clickedMarkers = markerClusterer.getMarkers()
                    console.log(`Current clicked markers length: ${clickedMarkers.length}`)
                    console.log(clickedMarkers)
                },
                onMarkerClick: () => (location) => {   // Update Location state in CreateEventView
                    this.props.updateLocation(location);
                }
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: 48.137154, lng: 11.576124 }}  // Munich center
            >
                <MarkerClusterer
                    onClick={props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {props.markers.map(marker => (
                        <Marker
                            key={marker._id}
                            title={marker.name} // Induces pop-up on mouse hover with location name
                            position={{ lat: marker.loc.coordinates[1], lng: marker.loc.coordinates[0] }}
                            onClick={() => props.onMarkerClick(marker)}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
        );

        // Render Map
        return (
            <MapWithAMarkerClusterer markers={this.state.markers} />
        )
    }
}