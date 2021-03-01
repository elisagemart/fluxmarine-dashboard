import React, { Component } from "react";
import Dashboard from '../Dashboard/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
              <h1>Application</h1>
              <AddDevice />
              <BrowserRouter>
                <Switch>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
              </BrowserRouter>
            </div>
          );
    }
  }

class AddDevice extends Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    alert("CLICKED");
    fetch('api/devices/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.value,
      })
    });
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }
  render(){
    return(
      <div>
        <button onClick={() => this.handleClick() }>Add Device!</button>
        <input type="text" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;
const container = document.getElementById("app");
ReactDOM.render(<App />, container);