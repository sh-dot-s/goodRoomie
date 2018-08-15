import React, {Component} from 'react'

import {
    Dialog,
    DefaultDialogTemplate,
    DialogSurface,
    DialogHeader,
    DialogHeaderTitle,
    DialogBody,
    DialogFooter,
    DialogFooterButton,
    DialogBackdrop
} from 'rmwc/Dialog';

import {Button} from 'rmwc/Button';

export default class Modal extends Component {
    constructor(props) {
      super(props)
    }
    
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.isDialogOpen}
                    onClose={(e)=>{this.props.openDialog(false)}}>
                    <DialogSurface>
                        <DialogHeader>
                            <DialogHeaderTitle>Add Expense</DialogHeaderTitle>
                        </DialogHeader>
                        <DialogBody scrollable={true}>{this.props.body}</DialogBody>
                        <DialogFooter>
                            <DialogFooterButton cancel>Cancel</DialogFooterButton>
                            <DialogFooterButton accept>Sweet!</DialogFooterButton>
                        </DialogFooter>
                    </DialogSurface>
                </Dialog>
            </div>
        )
    }
}
