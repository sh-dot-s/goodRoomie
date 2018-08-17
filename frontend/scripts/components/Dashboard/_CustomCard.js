import React from 'react'
import { Typography } from 'rmwc/Typography';

export default (props) => (
    <div
        style={{
        height: `calc(${props.height})`,
        background: props.theme? `url('/assets/images/png/${props.theme}.png')`: 'none',
        color: props.theme? props.theme.includes("dark") ? 'white' : 'black' : 'black',
        backgroundSize: props.theme? "cover": "none"
    }}
        className="special">
        <Typography style={{paddingBottom:"5px"}} use="headline5">{props.heading}</Typography>
        <div
            className={props.isOverflowAllowed? "overflow": ""}
            id= {props.id}
            style={{
            height: `calc(${props.height} - 30px)`
        }}>
            {   
                props.children
            }
        </div>
    </div>
);