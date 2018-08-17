import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, NavLink, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Dashboard from "../components/Dashboard/Dashboard";
import Toolbar from "../components/Header/Header";
import Undefined from "../components/ErrorHandlers/Undefinedroute";
import Schedule from './../components/Schedule/Schedule';
import Foodschedule from './../components/Schedule/Foodschedule';

export const history = createHistory();

export const Routes = () => (
    <Router history={history}>
        <div>
            <Toolbar/>
            <Switch>
                <Route path="/" component={Dashboard} exact={true}/>
                <Route path="/schedule" component={Schedule}/>
                <Route path="/food" component={Foodschedule}/>
                <Route component={Undefined}/>
            </Switch>
        </div>
    </Router>
);