import React, {Component} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const FormApp = styled.form`
    display: ${props => props.display};
    position: fixed;
    z-index: 1;
    padding-top: 100px; 
    padding-left: 100px; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
    & .formApp_wrapp {
        background-color: #fff;
        height: 50%;
        width: 250px; 
    }
    & span {
        position: relative;
        cursor: pointer;
        font-size: 0;
        &::after, ::before {
            content: '';
           position: absolute;
           width: 20px;
           height: 4px;
           background: #000; 
           top: -5px;
           left: 220px;
           transform: rotate(45deg);
        }
        &::before{
            transform: rotate(-45deg);
        }
    }
`

const OpenForm = styled.button`
    position: relative;
    font-size: 0;
    border: none;
    &:active, :focus, :hover {
        outline: 0;
        outline-offset: 0;
    }
    
    &::after, ::before {
            content: '';
           position: absolute;
           width: 20px;
           height: 4px;
           background: #8a8a8a; 
           top: 50px;
           left: 50px;
           z-index:5;
           
        }
        &::before{
            transform: rotate(90deg);
        }
`


export default class Form extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.openForm = this.openForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.state={
            
            TaskName: '',
            StartDate: '',
            EndDate: '',
            display: 'none',       
            
           
            chart: []
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }
    handleAdd() {
        
        let newElement = {
            Chart: {
                TaskName: this.state.TaskName,
                StartDate: this.state.StartDate,
                EndDate: this.state.EndDate,
            }
        }
        this.setState(prev => ({
            chart: [...prev.chart, newElement]
        }), () => console.log(this.state.chart))
        axios.post('http://localhost:4000/chart/add', newElement)
        .then(res => console.log(res.data))
        alert('ADDED')
    }

    openForm(e) {
        e.preventDefault();
        (this.state.display === 'none' ? this.setState({ display: 'flex'}) : this.setState({display: 'none'}))
    } 

    closeForm(e) {
        e.preventDefault()
        this.setState({display: 'none'})
    }
    render() {
        return (
            <div>
            <OpenForm onClick={this.openForm}>Open Form</OpenForm>
                <FormApp display={this.state.display}>
                    <div className='formApp_wrapp'>
                        <span onClick={this.closeForm}>Close</span>
                        <ul>
                        
                            <li>
                                <label>Task Name</label><br/>
                                <input onChange={this.handleChange} name='TaskName' type='text'></input>
                            </li>
                            <li>
                                <label>Start Date</label><br/>
                                <input onChange={this.handleChange} name='StartDate' type='date'></input>
                            </li>
                            <li>
                                <label>End Date</label><br/>
                                <input onChange={this.handleChange} name='EndDate' type='date'></input>
                            </li>
                            
                            <button onClick={this.handleAdd}>Add</button>
                        </ul>      
                    </div>
                    
                </FormApp>
            </div>
        )
    }
}