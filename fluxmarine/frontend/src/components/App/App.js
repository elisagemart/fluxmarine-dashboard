import React, { Component } from "react";
import { render } from "react-dom";
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
  handleClick(){
    alert("CLICKED");
  }
  render(){
    <button onClick={() => this.handleClick}>Click Me!</button>
  }
}

export default App;
const container = document.getElementById("app");
render(<App />, container);