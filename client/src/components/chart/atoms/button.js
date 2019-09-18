import React, {Component} from 'react'

export default class Button extends Component {
    constructor(props) {
        super(props)
        
    }
    handleClick(e) {
        e.preventDefault()
        
    }
    render() {
        return (
          <button onClick={this.handleClick}>{this.props.name}</button>
        )
    }
}