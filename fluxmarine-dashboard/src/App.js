import './App.css';
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard/Dashboard'
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path={"/signup/"} component = {Signup}/>
          <Route path={"/dashboard/"} component = {Dashboard}/>
          <Route path={"/"} component = {Login}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;
