import React, { Component } from "react";
import logo from './logo.png';
import {Link} from 'react-router-dom';
import particle from './particle';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

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
            alert('API call completed on promise resolve: ', data.body.access_token);
            console.log('API call completed on promise resolve: ', data.body.access_token);
        }
        catch (error) {
            console.log('API call completed on promise fail: ', error);
        }
        /*
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return data;
        } catch (error) {
            throw error;
        }
        */
    }

    render() {
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