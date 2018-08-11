import React from 'react'
import ReactDOM from 'react-dom'

import {RMWCProvider} from 'rmwc/Provider';

import {Routes} from "./router/routes";
import './styles/global.scss'

const Renderable = () => (
    <RMWCProvider buttonDefaultRipple={false}>
        <Routes/>
    </RMWCProvider>
);

ReactDOM.render(
    <Renderable/>, document.getElementById('root'));