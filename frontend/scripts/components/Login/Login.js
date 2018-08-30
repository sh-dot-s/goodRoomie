import React, {Component} from 'react'
import {
    Elevation,
    TextField,
    Button,
    TextFieldHelperText,
    Grid,
    GridCell
} from 'rmwc';
import {
    TabBar,
    Tab,
    TabIcon,
    TabIconText,
    TabBarScroller,
    TabBarRoot
} from 'rmwc/Tabs';
import {Link} from "react-router-dom";
import LoginSub from './_LoginSub';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elevation: 0
        }
    }

    render() {
        return (
            <div className="login">
                <div className="flex-container">
                    <Elevation
                        onMouseOver={() => this.setState({elevation: 24})}
                        onMouseOut={() => this.setState({elevation: 0})}
                        z={this.state.elevation || 0}
                        transition
                        className="center">
                        <div className="row">
                            <TabBar
                                activeTabIndex={this.state.activeTabIndex}
                                onChange={evt => this.setState({'activeTabIndex': evt.detail.activeTabIndex})}>
                                <Tab>Login</Tab>
                                <Tab>Register</Tab>
                            </TabBar>
                        </div>
                        <div className="row">
                            <LoginSub/>
                        </div>
                    </Elevation>
                </div>
            </div>
        )
    }
}
