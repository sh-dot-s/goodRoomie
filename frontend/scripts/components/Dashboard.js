import React, {Component} from 'react'

import {Grid, GridCell, GridInner} from 'rmwc/Grid';
import {Card, CardPrimaryAction, CardMedia} from 'rmwc/Card';
import {ShapeContainer} from 'rmwc/Shape';
import {Typography} from 'rmwc/Typography';
import {ListDivider} from "rmwc/List";
import {Menu, MenuItem, MenuAnchor} from 'rmwc/Menu';
import {Button, ButtonIcon} from 'rmwc/Button';
import {TextField, TextFieldIcon, TextFieldHelperText} from 'rmwc/TextField';
import {FormField} from 'rmwc/FormField';
import {Select} from 'rmwc/Select';
import {Snackbar} from 'rmwc/Snackbar';
import {Fab, DialogBody} from 'rmwc';
import Modal from './common/Modal';
import {Checkbox} from 'rmwc/Checkbox';

const CustomCard = (props) => (
    <aside
        style={{
        height: `calc(${props.height})`
    }}
        className="special">
        <Typography use="headline5">{props.heading}</Typography>
        <ListDivider/>
        <div
            className="overflow"
            style={{
            height: `calc(${props.height} - 30px)`
        }}>
            <p>{props.text}</p>
        </div>
    </aside>
);

const AddSpace = (props) => (
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

const Addbutton = props => (
    <Button onClick={props.addItem}><ButtonIcon use="add"/>
        Add Item</Button>
);

const Modalbody = props => (
    <table>
        <thead>
            <tr><th>Item</th></tr>
            <tr><th>Price</th></tr>
            <tr><th>Split To</th></tr>
        </thead>
        <tbody>
            <tr>
                {props
                    .items
                    .map((item, key) => {
                        return (
                            <div key={key}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.members}</td>
                            </div>
                        )
                    })
                }
            </tr>
            <tr>
                <td><TextField ref="item" outlined label="Item Name"/></td>
                <td><TextField ref="price" outlined label="Price of the Item"/></td>
                <td>
                    <Select ref="selected" label="Manual" defaultValue="">
                        <option value="all">
                            <Checkbox onChange={props.checkAll}>
                                All
                            </Checkbox>
                        </option>
                        {props
                            .members
                            .map((member, key) => (
                                <option value="member">
                                    <Checkbox checked={e => {
                                        if (isAllChecked) return true;
                                        else return !e.target.checked;
                                    }}>{member}</Checkbox>
                                </option>
                            ))
                        }
                    </Select>
                    <Addbutton />
                </td>
            </tr>
        </tbody>
    </table>
);

const Closeicon = props => (
    <Button onClick={props.handler}>Send&nbsp;<ButtonIcon use="send"/></Button>
);

const Widgets = props => {
    switch (props.type) {
        case "message":
            return (
                <div style={{
                    display: "block"
                }}>
                    <GridInner className="bottom-align">
                        <GridCell span="9">
                            <TextField fullwidth rows="1" inputRef="text" label="Message goes here..."/>
                        </GridCell>
                        <GridCell className="bottom-align" span="1"><Closeicon handler={props.handler}/></GridCell>
                    </GridInner>
                </div>
            );
            break;
        case "expense":
            return (<Select
                onChange=
                {e => { console.log(e.target); props.dialogHandler(true); }}
                className="bottom-align"
                label="Expense Type"
                outlined
                placeholder="Choose"
                options={['Dutch Split', 'Room Expense']}/>);
            break;
        default:
            return null;
    }
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openMenu: false,
            renderInputs: undefined,
            snackbarIsOpen: false,
            isDialogOpen: false,
            expenseItems: [],
            checkAll: false
        }
        this.menuHandler = this
            .menuHandler
            .bind(this);
        this.widgetHandler = this
            .widgetHandler
            .bind(this);
        this.snackHandler = this
            .snackHandler
            .bind(this);
        this.dialogHandler = this
            .dialogHandler
            .bind(this);
        this.checkAll = this
            .checkAll
            .bind(this);
        this.addItem = this
            .addItem
            .bind(this);
    }
    text = `Quicksand|Cabin|Libre+Franklin|Oxygen|Questrial|Titillium+Web|Work+Sans<br>Cairo is a contemporary Arabic and Latin typeface family. Mohamed Gaber extended the famous Latin typeface family Titillum Web to support the Arabic script, with a design that is based on the Kufi calligraphic style.Cairo balances classic and contemporary tastes with wide open counters and short ascenders and descenders that minimize length while maintaining easy readability. The lighter weights can be used for body text while the heavier weights are perfect for headlines and display typography. Each font includes stylistic ligatures and the Arabic component has a wide glyph set that supports the Arabic, Farsi and Urdu languages.`;
    menuHandler() {
        this.setState({
            openMenu: !this.state.openMenu
        })
    }
    widgetHandler(type) {
        console.log(type)
        this.setState({openMenu: true, renderInputs: type});
    }
    snackHandler(type) {
        this.setState({
            ...this.state,
            snackbarIsOpen: !this.state.snackbarIsOpen
        })
    }
    dialogHandler(type) {
        this.setState({
            ...this.state,
            isDialogOpen: type
        })
    }
    checkAll(type) {
        this.setState({
            ...this.state,
            checkAll: type
        })
    }
    addItem(item) {
        this.setState({
            ...this.state,
            expenseItems: this.state.expenseItems.push(item)
        })
    }
    render() {
        return (
            <div>
                <Grid>
                    <GridCell span="8">
                        <CustomCard text={this.text} heading="Feed" height="60vh + 12px"/>
                        <GridInner
                            style={{
                            marginTop: "4vh"
                        }}>
                            <GridCell className="bottom-align" span='2'>
                                <AddSpace
                                    handler={this.menuHandler}
                                    widgetHandler={this.widgetHandler}
                                    menu={this.state.openMenu}
                                    menuItems={["Message", "Note", "Expense"]}/>
                            </GridCell>
                            <GridCell span='10'><Widgets
                                dialogHandler={this.dialogHandler}
                                handler={this.snackHandler}
                                type={this.state.renderInputs}/></GridCell>
                        </GridInner>
                    </GridCell>
                    <GridCell span="4">
                        <GridInner>
                            <GridCell span="12"><CustomCard heading="On Duty" text={this.text} height="35.5vh"/></GridCell>
                            <GridCell span="12"><CustomCard heading="Food Schedule" text={this.text} height="35.5vh"/></GridCell>
                        </GridInner>
                    </GridCell>
                </Grid>
                <Snackbar
                    show={this.state.snackbarIsOpen}
                    onHide={evt => this.setState({snackbarIsOpen: false})}
                    message="Message Sent"
                    actionText="Dismiss"
                    actionHandler={() => {}}/>
                <Modal body={<Modalbody addItem={this.addItem} items={this.state.expenseItems} checkAll={this.checkAll} members={[]} />} isDialogOpen={this.state.isDialogOpen} openDialog={this.dialogHandler}/>
            </div>
        )
    }
}
