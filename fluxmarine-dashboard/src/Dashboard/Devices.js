import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ClaimDevice from "../ClaimDevice";
import {particle, particleSettings} from '../particle';
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

    //get a list of devices for the current user
    async getUserDevices(){
        this.setState({isFetchingUserDevices: true});
        var res = await particle.listDevices({ auth: particleSettings.userToken });
        console.log(res);
        this.setState({userDevices: res.body, isFetchingUserDevices: false});
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
    selected(device){
        return device.id == this.state.selectedDevice;
    }

    //given a device, set it as the currently selected device
    selectMe(device){
        this.setState({selectedDevice: device.id});
    }


    render() {
        return (
            <div>
               <Grid fluid className="devices-main">
                    <Col className="device-column" md={1} lg={4} md={4}>
                    {this.state.isFetchingUserDevices ? "Fetching data...." : "" }
                    {
                        //for each device the user has, create a list entry
                        this.state.userDevices.map( device => {
                            console.log(device);
                                return(
                                   <DeviceListItem 
                                        device={device}
                                        selected={() => this.selected(device)}
                                        selectMe={() => this.selectMe(device)}
                                   />
                                );
                            }
                        )
                    }

                    </Col>

                    <Col className="detail-column" xs>
                        DETAIL
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
                <h4>{this.props.device.id}</h4>
            </div>
        );
    }
}

export default Devices;