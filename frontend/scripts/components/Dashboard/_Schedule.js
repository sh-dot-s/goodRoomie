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
                        <table width="100%" align="center">
                            <tbody>
                                <tr>
                                    <td>
                                        <Button id="intrested" accent outlined>{item[0]}</Button>                                           
                                    </td>
                                    <td>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))
                }
            </div>
        )
    }
}
