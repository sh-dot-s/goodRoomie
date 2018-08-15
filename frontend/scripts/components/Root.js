import React, {Component} from 'react'

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta
} from "rmwc/List";
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarFixedAdjust,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';
import {Drawer, DrawerHeader, DrawerContent} from 'rmwc/Drawer';
import {IconButton} from 'rmwc/IconButton';
import {NavLink} from "react-router-dom";
const itemLists = [
  {
    text: "Dashboard",
    graphic: "dashboard",
    link: "/"
  }, {
    text: "Schedule",
    graphic: "schedule",
    link: "schedule"
  }, {
    text: "Food Schedule",
    graphic: "fastfood",
    link: "food"
  }, {
    text: "Inventory",
    graphic: "add_shopping_cart",
    link: "inventory"
  }
];

const CustomList = props => (
  <List>
    {props
      .listItems
      .map((item, key) => {
        return (
          <NavLink key={key} to={item.link} exact={true}>
            <ListItem key={key} onClick={() => props.handler()}>
              <ListItemGraphic>{item.graphic}</ListItemGraphic>
              <ListItemText>{item.text}</ListItemText>
              {item.meta == undefined
                ? null
                : <ListItemMeta>info</ListItemMeta>}
            </ListItem>
          </NavLink>
        );
      })
}
  </List>
);

const CustomToolBar = props => (
  <Toolbar>
    <ToolbarRow>
      <ToolbarSection alignStart>
        <IconButton use="menu" onClick={props.drawerHandler}/>
        <ToolbarTitle><div  style={{display:"inline-flex"}}>Good <div style={{color:"red"}}>Roomie</div></div></ToolbarTitle>
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>
);

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      listItems: itemLists
    }
    this.drawerHandler = this
      .drawerHandler
      .bind(this);
  }
  drawerHandler() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
  render() {
    return (
      <div>
        <CustomToolBar drawerHandler={this.drawerHandler}></CustomToolBar>
        <Drawer
          temporary
          open={this.state.drawerOpen}
          onClose={() => this.setState({drawerOpen: false})}>
          <DrawerHeader>
            Menu
          </DrawerHeader>
          <DrawerContent>
            <CustomList handler={this.drawerHandler} listItems={this.state.listItems}/>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }
}
