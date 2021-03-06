import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import ClaimDevice from "./ClaimDevice";
import { particle, particleSettings } from '../particle';
import { Grid, Row, Col } from "react-flexbox-grid";
import './Dashboard.css';

//props: devices (list of all of user's devices) and currentDevice (user's currently selected device)
class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        //if no currently selected device, return nothing
        if(this.props.currentDevice === null){
            console.log("NULL");
            return("");
        }
        //else render detail page
        return (
            <h1>{this.props.currentDevice.id}</h1>
        );
    }
}


export default DeviceDetail;