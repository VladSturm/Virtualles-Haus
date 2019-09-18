import React, {Component} from 'react'

export default class Table extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (
            <tr key={this.props.obj._id}>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.link}</td>
            </tr>
        )
    }
}