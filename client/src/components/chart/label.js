import React, {Component} from 'react'

export default class Label extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (
          <div>{this.props.obj.Chart.TaskName}</div>
        )
    }
}