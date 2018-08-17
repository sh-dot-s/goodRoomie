import React, { Component } from 'react';
import {
    Chip,
    ChipIcon,
    ChipText,
    ChipCheckmark,
    ChipSet,
    SimpleChip
} from 'rmwc/Chip';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Button, ButtonIcon } from 'rmwc/Button';
import uuid from 'uuid';

export default class ExpenseBody extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
            items: {
                name: '',
                price: '',
                members: []
            },
      }
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
        this.setState({
            items: {
                name: '',
                price: '',
                members: new Array()
            }
        })
        
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