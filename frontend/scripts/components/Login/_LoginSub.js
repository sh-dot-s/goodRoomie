import React, {Component} from 'react'
import {
    Elevation,
    TextField,
    Button,
    TextFieldHelperText,
    Grid,
    GridCell
} from 'rmwc';

import {Icon} from 'rmwc/Icon';
import { history } from '../../router/routes';

export default class _LoginSub extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem("isAuthenticated", false)
        this.state = {
            usernameHelptext: null,
            passwordHelptext: null
        }
        this.credentialValidator = this
            .credentialValidator
            .bind(this);
    }

    credentialValidator(e) {
        let user = this.refs.username.value;
        console.log(this.refs.username.value);
        if (user.length == 0) {
            this.setState({
                ...this.state,
                usernameHelptext: null
            })
        } else if (user.length < 2) {
            this.setState({
                ...this.state,
                usernameHelptext: "Username Should have more than 2 Characters"
            })
        } else {
            this.setState({
                ...this.state,
                usernameHelptext: (
                    <Icon
                        strategy="ligature"
                        render={({
                        content,
                        ...rest
                    }) => <pre>Length {content}</pre>}
                        use="check_circle"/>
                )
            })
        }
        // console.log(this.refs.password.textContent);
    }

    render() {
        return (
            <form onSubmit={e => {
                e.preventDefault();
                localStorage.setItem("isAuthenticated", true)
                history.push("/dashboard");
            }}>
                <Grid>
                    <GridCell span="12">
                        <div className="flex-item">
                            <TextField
                                ref="username"
                                onChange={this.credentialValidator}
                                box
                                fullwidth
                                label="Username"/>
                            <TextFieldHelperText>{this.state.usernameHelptext || "Enter Your Username Here"}
                            </TextFieldHelperText>
                        </div>
                    </GridCell>
                    <GridCell span="12">
                        <div className="flex-item">
                            <TextField
                                ref="password"
                                onChange={this.credentialValidator}
                                box
                                fullwidth
                                label="Password"
                                type="password"/>
                            <TextFieldHelperText>{this.state.passwordHelptext || "Enter Your Password Here"}</TextFieldHelperText>
                        </div>
                    </GridCell>
                    <GridCell span="12">
                        <div className="flex-item">
                            <Button type="submit" raised theme="primary-bg on-primary">Login</Button>
                        </div>
                    </GridCell>
                </Grid>
            </form>
        )
    }
}
