import React, { Component } from "react";
import {particle, particleSettings} from '../particle';
import './Dashboard.css';

class ClaimDevice extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {deviceID: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            console.log(particleSettings.userToken);
            var data = await particle.claimDevice({deviceId: this.state.deviceID, auth: particleSettings.userToken});
            console.log('API call completed on promise resolve: ', data.body);
            this.props.closePopup();
            this.props.getUserDevices();
        }
        catch (error) {
            console.log('API call completed on promise fail: ', error);
        }
    }
    render() {  
        return (  
            <div className='modal'>  
                <div className='modal-content'>  
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Device ID:
                            <input name="deviceID" type="text" value={this.state.deviceID} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                    <button onClick={this.props.closePopup}>Cancel</button>  
                </div>  
            </div>  
        );  
    }  
  }  
  
  export default ClaimDevice;