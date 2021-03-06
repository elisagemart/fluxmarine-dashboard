import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import ClaimDevice from "../ClaimDevice";
import {particle, particleSettings} from '../particle';
import { Grid, Row, Col } from "react-flexbox-grid";
import Devices from './Devices';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                        showClaimPopup: false, 
                        toLogin: false,
                     }; 

        this.handleLogout = this.handleLogout.bind(this);
    }
    
    //log the user out
    async handleLogout(){
        try{
            //delete their access token
            var res = await particle.deleteAccessToken({username: particleSettings.username, password: particleSettings.password, token: particleSettings.userToken});
            console.log(res);
            particleSettings.username = "";
            particleSettings.userToken = "";
            particleSettings.password = "";
            this.setState({toLogin: true});
        }
        catch(error){
            console.log(error);
        }
    }

    //toggle visibility of the 'Claim Device' popup
    toggleClaimPopup() {  
        this.setState({  
             showClaimPopup: !this.state.showClaimPopup  
        });
    }  


    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
               <div id="header">
                   <p className="headerEle">{particleSettings.username}</p>
                   <button className="headerEle" onClick={this.handleLogout}>Logout</button>
               </div>
               <Grid fluid className="dashboard-main">
                    <Col className="nav-column" md={1} lg={1}>
                        <h1>Nav</h1>
                    </Col>

                    <Col className="content-column" xs>
                        <Devices/>
                    </Col>
                </Grid> 
            </div>
        )
    }
}
export default Dashboard;