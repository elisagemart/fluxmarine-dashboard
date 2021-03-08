import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import ClaimDevice from "./ClaimDevice";
import DeviceDetail from "./DeviceDetail";
import { particle, particleSettings } from '../particle';
import { Grid, Row, Col } from "react-flexbox-grid";
import './Dashboard.css';

class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDevices: [],
            selectedDevice: "",
            isFetchingUserDevices: false
        };

    }

    //return an object representing the currently selected device
    getCurrentDevice() {
        for (var i = 0; i < this.state.userDevices.length; i++) {
            let device = this.state.userDevices[i];
            if (device.id === this.state.selectedDevice) {
                return device;
            }
        }
        return null;
    }

    getAllDevices(){
        return this.state.userDevices;
    }

    //get a list of devices for the current user
    async getUserDevices() {
        this.setState({ isFetchingUserDevices: true });
        try {
            var res = await particle.listDevices({ auth: particleSettings.userToken });
            var devices = res.body;
            for(var i = 0; i < devices.length; i++){
                try{
                    var locationData = await particle.getProductDeviceLocations({
                        deviceId: devices[i].id,
                        auth: particleSettings.userToken,
                        product: process.env.REACT_APP_PARTICLE_PRODUCT_NAME
                    });
                    devices[i].coordinates = locationData.body.location.geometry.coordinates;
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        this.setState({ userDevices: devices, isFetchingUserDevices: false });
    }

    //start fetching device data when the page loads
    componentDidMount() {
        this.getUserDevices();
        //this.timer = setInterval(() => this.getUserDevices(), 5000);
    }

    //make sure to get rid of timer when unmounting
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    //given a device, determine if it is currently selected
    selected(device) {
        return device.id === this.state.selectedDevice;
    }

    //given a device, set it as the currently selected device
    selectMe(device) {
        this.setState({ selectedDevice: device.id });
    }

    //toggle visibility of the 'Claim Device' popup
    toggleClaimPopup() {
        this.setState({
            showClaimPopup: !this.state.showClaimPopup
        });
    }


    render() {
        return (
            <div>
                <Grid fluid className="devices-main">
                    {this.state.showClaimPopup ?
                        <ClaimDevice closePopup={this.toggleClaimPopup.bind(this)} />
                        : null
                    }
                    <Col className="device-column" lg={4} md={4}>
                        {this.state.isFetchingUserDevices ? "Fetching data...." : ""}
                        {
                            //for each device the user has, create a list entry
                            this.state.userDevices.map(device => {
                                return (
                                    <DeviceListItem
                                        key={device.id}
                                        device={device}
                                        selected={() => this.selected(device)}
                                        selectMe={() => this.selectMe(device)}
                                    />
                                );
                            }
                            )
                        }
                        <button onClick={this.toggleClaimPopup.bind(this)} getUserDevices={this.getUserDevices.bind(this)} id="claimButton">Claim Device</button>
                    </Col>

                    <Col className="detail-column" xs>
                        <DeviceDetail devices={this.getAllDevices()} currentDevice={this.getCurrentDevice()} />
                    </Col>
                </Grid>
            </div>
        )
    }
}

class DeviceListItem extends Component {

    render() {
        return (
            <div className={this.props.selected() ? "device-entry device-entry-selected" : "device-entry"} onClick={this.props.selectMe}>
                <div>
                    <span className={this.props.device.online ? "circle online" : "circle offline"}></span>
                    <h4 className="deviceName">{this.props.device.name}</h4>
                </div>
               
            </div>
        );
    }
}

export default Devices;