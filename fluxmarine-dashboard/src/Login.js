import React, { Component } from "react";
import logo from './logo.png';
import {Link, Redirect} from 'react-router-dom';
import {particle, particleSettings} from './particle';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", toDashboard: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    //determine if the user has entered valid information in the form
    validateForm(){
        let validUsername = this.state.username !== "";
        let validPassword = this.state.password !== "";
        return validUsername && validPassword;
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            var data = await particle.login({username: this.state.username, password: this.state.password});
            console.log('API call completed on promise resolve: ', data.body.access_token);
            particleSettings.userToken = data.body.access_token;
            particleSettings.username = this.state.username;
            particleSettings.password = this.state.password;
            //redirect to the dashboard component
            this.setState({toDashboard: true});
        }
        catch (error) {
            console.log('API call completed on promise fail: ', error);
        }
    }

    render() {
        //if the user has successfully logged in, redirect to the dashboard
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard/' />
        }
      
        return (
        <div id="login_page">
            <div id="login">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-class">
                        <label>Email Address</label>
                        <input name="username" type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="input-class">
                        <label>Password</label>
                        <input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
                <Link to={"/signup/"}>
                        <button>Create Account</button>
                </Link>
            </div>
        </div>
        )
    }
}
export default Login;