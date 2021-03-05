import React, { Component } from "react";
import logo from './logo.png';
import {Link, Redirect} from 'react-router-dom';
import {particle, particleSettings} from './particle';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", toDashboard: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            var data = await particle.login({username: this.state.username, password: this.state.password});
            console.log('API call completed on promise resolve: ', data.body.access_token);
            particleSettings.userToken = data.body.access_token;
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
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <Link to={"/signup/"}>
                        <button>Create Account</button>
                </Link>
            </div>
        )
    }
}
export default Login;