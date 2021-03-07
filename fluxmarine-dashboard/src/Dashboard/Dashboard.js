import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import ClaimDevice from "./ClaimDevice";
import { particle, particleSettings } from '../particle';
import { Grid, Row, Col } from "react-flexbox-grid";
import Devices from './Devices';
import logo from '../logo_white.png';
import boat from './boat.png';
import warning from './warning.png';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    //log the user out
    async handleLogout() {
        try {
            //delete their access token
            var res = await particle.deleteAccessToken({ username: particleSettings.username, password: particleSettings.password, token: particleSettings.userToken });
            particleSettings.username = "";
            particleSettings.userToken = "";
            particleSettings.password = "";
            this.setState({ toLogin: true });
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.toLogin === true || particleSettings.userToken === "") {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div id="header">
                    <img src={logo} className="headerLogo" alt="logo" />
                    <p className="headerEle">{particleSettings.username}</p>
                    <button className="headerEle" onClick={this.handleLogout}>Logout</button>
                </div>
                <Grid fluid className="dashboard-main">
                    <Col className="nav-column" md={1} lg={1}>
                        <NavButton image={boat} />
                        <NavButton image={warning} />
                    </Col>

                    <Col className="content-column" xs>
                        <Devices />
                    </Col>
                </Grid>
            </div>
        )
    }
}

class NavButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <button className="navButton">
                <img className="navImage" src={this.props.image} />
            </button>
        )
    }
}

export default Dashboard;