import React from 'react'
import { Grid, GridInner, GridCell } from 'rmwc/Grid';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';
import { Button, ButtonIcon } from 'rmwc/Button';

export default (props) => {
    switch (props.type) {
        case "message":
            return (
                <form 
                    style={{
                        display: "flex"
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        props.handler(e);
                        e.target.message.value="";
                    }}
                >
                    <GridInner className="bottom-align">
                        <GridCell span="9">
                            <TextField required name="message" fullwidth rows="1" inputRef="text" label="Message goes here..."/>
                        </GridCell>
                        <GridCell className="bottom-align" span="1">
                            <Button type="submit">Send&nbsp;<ButtonIcon use="send"/></Button>
                        </GridCell>
                    </GridInner>
                </form>
            );
            break;
        case "expense":
            return (<Select
                onChangeCapture=
                {e => { props.dialogHandler(true,e); }}
                className="bottom-align"
                label="Expense Type"
                outlined
                placeholder="Choose"
                options={['Dutch Split', 'Room Expense']}/>);
            break;
        case "post":
            return (
                <form 
                    style={{
                        display: "flex"
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        props.handler(e);
                        e.target.post.value="";
                    }}
                >
                    <GridInner className="bottom-align">
                        <GridCell span="9">
                            <TextField required name="post" textarea fullwidth rows="2" inputRef="text" label="Type Something here..."/>
                        </GridCell>
                        <GridCell className="bottom-align" span="1">
                            <Button type="submit">Post&nbsp;<ButtonIcon use="play_circle_filled"/></Button>
                        </GridCell>
                    </GridInner>
                </form>
            );
            break;
        default:
            return null;
    }
}