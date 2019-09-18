import React, {Component} from 'react'

export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state= {
            admin: false,
        }
    }
    render() {
        return (
            <div>
                <ul>
                    <li><a href='#'>Admin</a></li>
                    <li><a href='#'>User</a></li>
                </ul>
            </div>
        )
    }
}