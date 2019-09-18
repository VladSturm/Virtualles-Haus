import React, {Component} from 'react'
import Fusion from './FusionChart'
import Form from '../molecules/form'

export default class Chart extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (
            <div>
                <Form />
                <Fusion /> 
            </div>
        )
    }
}