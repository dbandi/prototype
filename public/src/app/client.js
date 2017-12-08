import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import NoMatch from "./components/NoMatch";

const app = document.getElementById('app');

import styles from '../styles/master.scss';

ReactDOM.render(
  <Router>
     <div>
       <Switch>
         <Route exact path="/"component={Home} />
         <Route exact path="/account" component={Account} />
         <Route component={NoMatch}/>
       </Switch>
    </div>
 </Router>,
  app
)
