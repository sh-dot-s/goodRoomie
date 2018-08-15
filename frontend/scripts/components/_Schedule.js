import React, {Component} from 'react'
import {
    Grid,
    GridCell,
    Ripple,
    ChipSet,
    Chip,
    ChipText,
    Button
} from 'rmwc';
import {ShapeContainer} from 'rmwc/Shape';

export default class _Schedule extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div>
                {this
                    .props
                    .params
                    .map((item, key) => (
                        <Grid className="grid_align__center" key={key}>
                            <GridCell span="5">
                                <Button id="intrested" accent outlined>{item[0]}</Button>

                            </GridCell>
                            <GridCell span="7">
                                <ChipSet>
                                    {item[1]
                                        .split(",")
                                        .map((individual, key) => (
                                            <Chip key={key} selected>
                                                <ChipText>{individual}</ChipText>
                                            </Chip>
                                        ))
}
                                </ChipSet>
                            </GridCell>
                        </Grid>
                    ))
}
            </div>
        )
    }
}
