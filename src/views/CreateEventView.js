"use strict";

import React from 'react';

import { PageHeader } from 'react-bootstrap';

import Page from '../components/Page';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


export class CreateEventView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
    
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 48.137154, lng: 11.576124 }}
      >
        <Marker
          position={{ lat: 48.137154, lng: 11.576124 }}
        />
      </GoogleMap>
    ));
        return (
            <Page>
                <PageHeader>
                    Create Event <small>(Work in progress)</small>
                </PageHeader>
                <div id="left">
                    <form>
                      <label>
                        Name:
                        <input type="text" name="name" />
                      </label>
                      <label>
                        Activity:
                        <input type="text" name="activity" />
                      </label>
                      <label>
                        Max Participants:
                        <input type="number" name="maxparticipants" />
                      </label>
                      <label>
                        Description:
                        <input type="text" name="description" />
                      </label>
                      <label>
                        Date:
                        <input type="date" name="date" />
                      </label>
                      <label>
                        Start Time:
                        <input type="time" name="starttime" />
                      </label>
                      <label>
                        End Time:
                        <input type="time" name="endtime" />
                      </label>
                      <label>
                        Selected Location:
                        <input type="text" name="selectedlocation" />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                </div>

                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC022vcczx-Uvw4FXrky0qbXtApe1Vi3GU&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
            </Page>
        );
    }
}