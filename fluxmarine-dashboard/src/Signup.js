import React, { Component } from "react";
import Particle from 'particle-api-js';


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            errors:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            var particle = new Particle();
            particle.clientId = "fluxmarine-dashboard-5691";
            console.log(particle.clientId);
            var data = await particle.createUser({username: this.state.username, password: this.state.password});
            console.log('API call completed on promise resolve: ', data.body.access_token);
        }
        catch (error) {
            console.log('API call completed on promise fail: ', error);
        }
        /*
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
        */
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Signup;