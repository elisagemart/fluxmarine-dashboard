import React, { Component } from "react";
import {particle, particleSettings} from './particle';
import './Login.css';
import logo from './logo.png';


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            errors:"",
            validForm: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    //check if the inputs given in the form are valid
    //TODO: add check for email
    validateForm(){
        var validUsername = this.state.username !== "";
        var validPassword = this.state.password !== "" && this.state.password === this.state.confirmPassword;
        console.log(this.state.username, this.state.password, this.state.confirmPassword, validPassword, validUsername);
        return validUsername && validPassword;
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(particleSettings.userToken);
        try{
            var data = await particle.createUser({username: this.state.username, password: this.state.password});
            console.log(data);
            console.log('API call completed on promise resolve: ', data.body);
            try{
                var login = await particle.login({username: this.state.username, password: this.state.password});
                console.log('Login successful! access_token:', login.access_token);
            }
            catch(error){
                console.log(login);
                console.log(error);
                console.log('API call completed on promise fail: ', error.errorDescription);
            }
        }
        catch (error) {
            console.log(data);
            console.log(error);
            console.log('API call completed on promise fail: ', error.errorDescription);
        }
    }

    render() {
        return (
            <div id="signup-page">
                <div id="signup">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Create Account</h2>
                <form onSubmit={this.handleSubmit}>
                    <div class="input-class">
                    <label>
                        Email Address
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    </div>
                    <div class="input-class">
                    <label>
                        Password
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    </div>
                    <div class="input-class">
                    <label>
                        Confirm Password
                        <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange}/>
                        <p id="warning">
                        { (this.state.confirmPassword !== "" && this.state.confirmPassword !== this.state.password) ? "Make sure your passwords match!" : null}
                        </p>
                    </label>
                    </div>
                    <input type="submit" value="Create Account" disabled={!this.validateForm()}/>
                </form>
                </div>
            </div>
        )
    }
}
export default Signup;