import React, { Component } from 'react'
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from 'rmwc/Tabs';
import { ListDivider } from 'rmwc/List';
import { Button, ButtonIcon, Chip, ChipText } from 'rmwc';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import Modal from './common/Modal';

export default class _Feed extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            activeTabIndex: 0,
            isDialogOpen: false
        }
        this.dialogHandler = this.dialogHandler.bind(this);
    }
    dialogHandler(state){
        this.setState({
            ...this.state,
            isDialogOpen: state
        })
    }
    setModalBody(node){
        
    }
    render() {
    return (
        <div>
            <TabBar
                activeTabIndex={this.state.activeTabIndex}
                onChange={evt => this.setState({ 'activeTabIndex': evt.detail.activeTabIndex })}
            >
                <Tab>Posts</Tab>
                <Tab>Chat</Tab>
            </TabBar>
            {console.log(this.props.height)}
            {
                (
                    <div id="chatRoom" className="overflow" style={{height: `calc(${this.props.height} - 60px)`}}>
                        <ToRender dialogHandler={this.dialogHandler} index={this.state.activeTabIndex} messages={this.props.messages} posts={this.props.posts}/>
                    </div>
                )
            }
            <Modal body={(<div>Body</div>)} isDialogOpen={this.state.isDialogOpen} openDialog={this.dialogHandler}/>
        </div>
    );
  }
}

const ToRender = props => {
    var renderable = undefined;
    switch (props.index) {
        case 1:
            renderable = props.messages ? (
                props.messages.map((message, key) => {
                    var name = "";
                    message.by == "me" ? name = "left-bubble" : name = "right-bubble";
                    return(
                        <Grid key={key}>
                            <GridCell span="12">
                                <div className={name}>
                                    <Typography use="caption">{message.by}&nbsp;|&nbsp;{message.time}</Typography>
                                    <ListDivider/>
                                    <Typography use="subtitle1">{message.message}</Typography>    
                                </div>
                            </GridCell>
                        </Grid>
                    )
                
                })
            ) : null
            break;
        case 0:
            renderable = props.posts ? (
                props.posts.map((post, key) => {
                    return(
                        <Grid key={key}>
                            <GridCell span="12">
                                <div className="post">
                                    <Typography use="headline6"><b>{post.by}</b> added a post <small>@{post.time}</small></Typography>
                                    <ListDivider/>
                                    <div className="post_body">{post.body}</div>
                                    <ListDivider/>
                                    <div>
                                        <Button><ButtonIcon use="reply"></ButtonIcon> Reply {post.replyCount}</Button>    
                                        <Button onClick={()=> props.dialogHandler(true)}><ButtonIcon use="view"></ButtonIcon> View</Button>    
                                    </div>  
                                </div>
                            </GridCell>
                        </Grid>
                    )
                })
            ) : null
            break;
        default:
            break;
    }
    return renderable;
}

