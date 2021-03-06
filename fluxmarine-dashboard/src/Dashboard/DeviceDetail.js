import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import ClaimDevice from "./ClaimDevice";
import { particle, particleSettings } from '../particle';
import { Grid, Row, Col } from "react-flexbox-grid";
import {
    withGoogleMap,
    withScriptjs
} from "react-google-maps";
import Map from './Map';
import './Dashboard.css';

const MapWrapped = withScriptjs(withGoogleMap(Map));

//props: devices (list of all of user's devices) and currentDevice (user's currently selected device)
class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDevice: props.currentDevice,
            devices: props.devices
        };
    }

    render() {
        //if no currently selected device, return nothing
        if (this.props.currentDevice === null) {
            return ("");
        }
        //else render detail page
        return (
            <div id="detail-page">
                <h1>{this.props.currentDevice.name}</h1>
                <h3>{this.props.currentDevice.id}</h3>
                <div id="map-div">
                    <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        currentDevice={this.props.currentDevice}
                        devices={this.props.devices}
                    />
                </div>
            </div>
        );
    }
}


export default DeviceDetail;