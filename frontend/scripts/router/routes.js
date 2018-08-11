import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, NavLink, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Dashboard from "../components/Dashboard";
import Toolbar from "../components/Root";
import Foodschedule from "../components/Foodschedule";
import Schedule from "../components/Schedule";
import Undefined from "../components/Undefinedroute";

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