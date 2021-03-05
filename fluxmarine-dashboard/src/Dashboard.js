import React, { Component } from "react";
import {Link} from 'react-router-dom';
import ClaimDevice from "./ClaimDevice";
import {particle, particleSettings} from './particle';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                        showClaimPopup: false, 
                        userDevices: [],
                        isFetching: false
                     }; 
    }
    
    //toggle visibility of the 'Claim Device' popup
    toggleClaimPopup() {  
        this.setState({  
             showClaimPopup: !this.state.showClaimPopup  
        });
    }  

    //get a list of devices for the current user
    async getUserDevices(){
        this.setState({isFetching: true});
        var res = await particle.listDevices({ auth: particleSettings.userToken });
        console.log(res);
        var devices = [];
        for(var i = 0; i < res.body.length; i++){
            devices.push([res.body[i].id, res.body[i].last_handshake_at, res.body[i].serial_number]);
        }
        this.setState({userDevices: devices, isFetching: false});
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

    render() {
        return (
            <div>
               Dashboard
               <button onClick={this.toggleClaimPopup.bind(this)}>Claim Device</button>  
               {this.state.showClaimPopup ?  
                <ClaimDevice closePopup={this.toggleClaimPopup.bind(this)}/>  
                : null  
                } 
                <p>{this.state.isFetching ? 'Fetching devices...' : ''}</p>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>last_handshake_at</th>
                        <th>serial_number</th>
                    </tr>
                {
                    //generate a list of devices for the current user
                    this.state.userDevices.map( device => {
                            return(<tr>
                                    <td>{device[0]}</td>
                                    <td>{device[1]}</td>
                                    <td>{device[2]}</td>
                                </tr>);
                        }
                    )
                }
                </table>

            </div>
        )
    }
}
export default Dashboard;