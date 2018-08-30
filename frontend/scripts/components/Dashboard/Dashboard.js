import React, { Component } from 'react'

import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { Snackbar } from 'rmwc/Snackbar';

import uuid from 'uuid';
import moment from 'moment';
import ScheduleSub from './_Schedule';
import FeedSub from './_Feed';
import DutySub from './_Duty';
import CustomCard from './_CustomCard';
import AddSpace from './_AddSpace';
import ExpenseBody from './_ExpenseModalBody';
import Widgets from './_GenerateWidget';
import { Modal } from './../common';

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
            posts: [
                {
                    id: uuid(),
                    by: "Sri Harsha",
                    replyCount: 0,
                    replies: [{
                        id: uuid(),
                        message: "Sample Reply"
                    }],
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
    menuHandler() {
        this.setState({
            openMenu: !this.state.openMenu
        })
    }
    widgetHandler(type) {
        this.setState({ openMenu: true, renderInputs: type });
    }
    snackHandler(e) {
        if (e.target.message) {
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
        else if (e.target.post) {
            this.setState({
                ...this.state,
                snackbarIsOpen: !this.state.snackbarIsOpen,
                posts: this.state.posts.concat({
                    body: e.target.post.value,
                    by: "The Covert Cow",
                    time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                    replyCount: 0
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
                expenseItems: this.state.expenseItems.concat({ ...item, members: item.members.length == 0 ? "All" : item.members })
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
                    actionHandler={evt => this.setState({snackbarIsOpen: !this.state.snackbarIsOpen})}/>
                <Modal body={<ExpenseBody option={this.state.selectedOption} addItem={this.addItem} items={this.state.expenseItems} members={["SomeDash",'Me','You',"Someone","Nobody","Tata","Bye Bye"]} />} isDialogOpen={this.state.isDialogOpen} openDialog={this.dialogHandler}/>
            </div>
        )
    }
}
