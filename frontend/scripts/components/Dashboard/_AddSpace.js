import React from 'react'
import { Menu, MenuAnchor, MenuItem } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

export default (props) => (
    <MenuAnchor>
        <Menu open={props.menu} onClose={props.handler}>
            {props
                .menuItems
                .map((item, key) => (
                    <MenuItem
                        key={key}
                        onClick={e => {
                        props.widgetHandler((e.target.innerHTML).toString().toLowerCase())
                    }}>{item}</MenuItem>
                ))
}
        </Menu>

        <Button raised accent theme="secondary" onClick={props.handler}>
            Add Item
        </Button>
    </MenuAnchor>
);