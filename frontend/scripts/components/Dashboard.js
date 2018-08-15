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
import {
    Chip,
    ChipIcon,
    ChipText,
    ChipCheckmark,
    ChipSet,
    SimpleChip
  } from 'rmwc/Chip';
import uuid from 'uuid';
import moment from 'moment';
import { Switch } from 'rmwc/Switch';
import ScheduleSub from  './_Schedule';
import FeedSub from './_Feed';
import DutySub from './_Duty';

const CustomCard = (props) => (
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

class Modalbody extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
            items: {
                name: '',
                price: '',
                members: []
            },
      }
      console.log(this.props.option)
      this.handleInputChange = this.handleInputChange.bind(this);
      this.chipHandler = this.chipHandler.bind(this);
      this.resetForm = this.resetForm.bind(this);
    }
    chipHandler(e) {
        const scope = e.target.id;
        const members = this.state.items.members;
        if (members.includes(scope)) {
            members.splice(members.indexOf(scope), 1 ); 
        }
        else{
            members.push(scope);
        }
        this.setState({
            ...this.state,
            items: {
                ...this.state.items,
                members: this.props.option == "Dutch Split" ? members : ["Room"]
            }
        })
    }
    resetForm(){
        console.log("resetting form");
        this.setState({
            items: {
                name: '',
                price: '',
                members: new Array()
            }
        }, () => {console.log(this.state);})
        
    }
    handleInputChange(e) {
        e.preventDefault();
        switch (e.target.id) {
            case "item":
                this.setState({
                    ...this.state,
                    items: {
                        ...this.state.items,
                        name: e.target.value
                    }
                })
                break;
            case "price":
                this.setState({
                    ...this.state,
                    items: {
                        ...this.state.items,
                        price: e.target.value
                    }
                })
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <div>
                {
                    this.props.items.length > 0 ? (
                        <Grid>
                            <GridCell span="12">
                                <table width="100%">
                                    <thead>
                                        <tr><th>Item</th><th>Price</th><th>Split To</th></tr>
                                    </thead>
                                    <tbody>
                                            {this.props
                                                .items
                                                .map((item, key) => {
                                                    return (
                                                        <tr style={{textAlign: "center"}} key={key}>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.members}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                </table>
                            </GridCell>
                        </Grid>
                    ) : null
                }
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form Submitting")
                    const items = JSON.parse(JSON.stringify(this.state.items));
                    this.props.addItem({...items, id: uuid()});
                    this.resetForm();
                }}>
                <Grid>
                    <GridCell span="3">
                        <TextField ref="name" required onChange={this.handleInputChange} id="item" outlined label="Item Name" value={this.state.items.name}/>
                    </GridCell>
                    <GridCell span="3">
                        <TextField ref="price" type="number" step=".01" required onChange={this.handleInputChange} id="price" outlined label="Price of the Item" value={this.state.items.price}/>                        
                    </GridCell>
                    
                    <GridCell span="6">
                        {
                            this.props.option == "Dutch Split" ? ( 
                            <ChipSet filter className="overflow" style={{height: "5rem"}}>
                                {
                                        this.props.members.map((item, key) => {
                                            return(
                                                <div key={key} >
                                                    <Chip
                                                        onClick={this.chipHandler}
                                                        selected={this.state.items.members.includes(item)}
                                                        id={item}
                                                        ref={item}
                                                    >
                                                        <ChipIcon id={item} use="face" leading />
                                                        <ChipCheckmark />
                                                        <ChipText id={item}>{item}</ChipText>
                                                    </Chip>
                                                </div>
                                            );
                                        })
                                }
                            </ChipSet>
                            ) : null
                        }
                    </GridCell>
                </Grid>    
                <Button type="submit"><ButtonIcon use="add"/>Add Item</Button>
                </form>
            </div>
        );
    }
};

const Widgets = props => {
    switch (props.type) {
        case "message":
            return (
                <form 
                    style={{
                        display: "block"
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
                        display: "block"
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        props.handler(e);
                        e.target.post.value="";
                    }}
                >
                    <GridInner className="bottom-align">
                        <GridCell span="9">
                            <TextField required name="post" fullwidth rows="1" inputRef="text" label="Type Something here..."/>
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

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openMenu: false,
            renderInputs: undefined,
            snackbarIsOpen: false,
            isDialogOpen: false,
            expenseItems: [],
            selectedOption: undefined,
            messages: [],
            schedule: [
                ["Breakfast", "Dosa, Tomato Chutney, Aloo Fry, Pudina Chutney"],
                ["Lunch", "Veg Biryani,Kurma"],
                ["Dinner", "Chapathi, Gobi Curry"]
            ],
            duty: [
                ["Garbage Takeout", "Mr.Balsy Bullow"],
                ["Groceries", "Mr.Galdrow Wilson"],
            ],
            posts:[
                {
                    by: "Sri Harsha",
                    replyCount: 0,
                    body: "This is a sample post body",
                    time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                }
            ]
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
        this.setState({openMenu: true, renderInputs: type});
    }
    snackHandler(e) {
        if(e.target.message){
            this.setState({
                ...this.state,
                snackbarIsOpen: !this.state.snackbarIsOpen,
                messages: this.state.messages.concat({
                    message: e.target.message.value,
                    by: "me",
                    time: moment().format("MMMM Do YYYY, h:mm:ss a")
                })
            })
        }
        else if(e.target.post){
            this.setState({
                ...this.state,
                snackbarIsOpen: !this.state.snackbarIsOpen,
                posts: this.state.posts.concat({
                    body: e.target.post.value,
                    by: "The Covert Cow",
                    time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                    replyCount:0
                })
            })
        }
        $('#chatRoom').stop().animate({
            scrollTop: $('#chatRoom')[0].scrollHeight
        }, 800);
    }
    dialogHandler(type, event) {
        try {
            var index = event.nativeEvent.target.selectedIndex;
            this.setState({
                ...this.state,
                isDialogOpen: type,
                selectedOption: event.nativeEvent.target[index].text
            })
        } catch (error) {
            console.log(error);
            this.setState({
                ...this.state,
                isDialogOpen: type,
                selectedOption: undefined
            })
        }
    }
    checkAll() {
        this.setState({
            ...this.state,
            checkAll: !this.state.checkAll
        })
    }
    addItem(item) {
        if (this.state.expenseItems.id != item.id) {
            this.setState({
                ...this.state,
                expenseItems: this.state.expenseItems.concat({...item, members: item.members.length==0?"All":item.members})
            })
        }
    }
    render() {
        return (
            <div>
                <Grid>
                    <GridCell span="8">
                        <CustomCard id="chatRoom" theme="" messages={this.state.messages} heading="Feed" height="60vh + 12px"><FeedSub height="60vh + 12px" messages={this.state.messages} posts={this.state.posts}/></CustomCard>
                        <GridInner
                            style={{
                            marginTop: "4vh"
                        }}>
                            <GridCell className="bottom-align" span='2'>
                                <AddSpace
                                    handler={this.menuHandler}
                                    widgetHandler={this.widgetHandler}
                                    menu={this.state.openMenu}
                                    menuItems={["Message", "Post", "Expense"]}/>
                            </GridCell>
                            <GridCell span='10'><Widgets
                                dialogHandler={this.dialogHandler}
                                handler={this.snackHandler}
                                type={this.state.renderInputs}/></GridCell>
                        </GridInner>
                    </GridCell>
                    <GridCell span="4">
                        <GridInner>
                            <GridCell span="12"><CustomCard isOverflowAllowed={true} theme="green-light-2" heading="On Duty" height="35.5vh"><ScheduleSub params={this.state.duty}/></CustomCard></GridCell>
                            <GridCell span="12"><CustomCard isOverflowAllowed={true} theme='blue-light' heading="Food Schedule" height="35.5vh"><ScheduleSub params={this.state.schedule}/></CustomCard></GridCell>
                        </GridInner>
                    </GridCell>
                </Grid>
                <Snackbar
                    show={this.state.snackbarIsOpen}
                    onHide={evt => this.setState({snackbarIsOpen: false})}
                    message="Message Sent"
                    actionText="Dismiss"
                    actionHandler={() => {}}/>
                <Modal body={<Modalbody option={this.state.selectedOption} addItem={this.addItem} items={this.state.expenseItems} members={["SomeDash",'Me','You',"Someone","Nobody","Tata","Bye Bye"]} />} isDialogOpen={this.state.isDialogOpen} openDialog={this.dialogHandler}/>
            </div>
        )
    }
}
