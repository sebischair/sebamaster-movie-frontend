
import React from 'react';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {FormControl, Glyphicon, InputGroup} from "react-bootstrap";
const { compose, withProps, lifecycle } = require("recompose");


export class LocationSearchField extends React.Component {

    constructor(props) {
        super(props);

        this.handlePlacesUpdate = this.handlePlacesUpdate.bind(this);
    }

    handlePlacesUpdate(places){
        if(places && places[0]){
            this.props.handleLocationChange(places[0].formatted_name, places[0].geometr);
        }
    }

    render() {
        const SearchField = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div/>,
                containerElement: <div/>
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {};

                    this.setState({
                        places: [],
                        bounds : {north : 48.270625, south: 48.016338, west: 11.259752,east: 11.940218},
                        onSearchBoxMounted: ref => {
                            refs.searchBox = ref;
                        },
                        onPlacesChanged: () => {
                            const places = refs.searchBox.getPlaces();
                            this.props.handlePlacesUpdate(places);
                            this.setState({
                                places,
                            });
                        },
                    })
                },
            }),
            withScriptjs
        )(props =>
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <FormControl
                        type="text"
                        placeholder="Location"
                    />
                </StandaloneSearchBox>
            </div>
        );

        return <SearchField handlePlaceUpdate = {this.handlePlacesUpdate} />;
    };

}