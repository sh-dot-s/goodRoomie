import React from 'react'
import ReactDOM from 'react-dom'

import {Router, Route, NavLink, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Dashboard from "../components/Dashboard/Dashboard";
import Toolbar from "../components/Header/Header";
import Undefined from "../components/ErrorHandlers/Undefinedroute";
import Schedule from './../components/Schedule/Schedule';
import Foodschedule from './../components/Schedule/Foodschedule';
import Login from '../components/Login/Login';

export const history = createHistory();

export const Routes = () => (
    <Router history={history}>
        <div>
            <Toolbar authenticated={localStorage.getItem("isAuthenticated")}/>
            <Switch>
                <Route path="/" component={Login} exact={true}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/schedule" component={Schedule}/>
                <Route path="/food" component={Foodschedule}/>
                <Route component={Undefined}/>
            </Switch>
        </div>
    </Router>
);