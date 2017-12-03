import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import NoMatch from "./components/NoMatch";

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
     <div>
       <Switch>
         <Route exact path="/account" render={() => (<div>Account</div>)} />
         <Route exact path="/" render={() => (<div>Home</div>)} />
         <Route component={NoMatch}/>
       </Switch>
    </div>
 </Router>,
  app
)
