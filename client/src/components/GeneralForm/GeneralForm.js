import React, {Component} from 'react'
import styled, {keyframes} from 'styled-components'
import axios from 'axios'
import Table from '../Table/table'
import Item from '../Item/item'

import {bounce} from'react-animations'

const WrappApp = styled.div`
    /* display: grid;
    grid-template-columns: 5% 1fr 2fr 1fr 5% ;
    grid-template-rows: 1fr 7fr ;
    
    grid-template-areas:
    '. menu . . . '
    '. form img table .'; */
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;    
    align-items: flex-start;
    margin: 0 3vw;
    & ul{
       display:flex;
       flex-direction: column;
       list-style: none;
       margin: 0;
       padding: 0; 
   }
`
const Menu = styled.div`
    grid-area: menu;
    min-height: 70px;
    display: flex;
    align-items:center;
    
    background-color: #444141;
    width: 100%;
    
    & a {
        &:hover {
        color: #b5babf;
        text-decoration: none;
    }
        color: white;
        cursor: pointer;
    }   
    
   & ul{      
       flex-direction: row;  
        & li{
           margin: 0 10px;
       }  
   }
`
const BounceAnimation = keyframes`${bounce}`
const Form = styled.form`
    grid-area: form;
    display: flex;
    margin-right:3em;   
    animation: 2s ${BounceAnimation}; 
    /* &:hover{
        animation-name: form;
        animation-duration: 1s;
        @keyframes form {
            from {
                transform: translateY(-20px);
            }
            to {
                transform: translateY(+20px);
            }
        }
    } */
    
    background-color: #f8f8f8;
    box-shadow: 0 4px 10px 0;
    padding: 20px 30px;
    & button {
                margin-top: 100px;
                background-color: #444141;
                color: #fff;
                padding: 7px 0;
                &:hover {
                    transform: scaleY(1.2)
               }
            }    
    & ul {
        & li {
            padding: 5px 0;
            margin-bottom: 10px;
            & input {
                width: 220px;
            }            
        }   
    }
`
const TableItem = styled.div`
    grid-area: table;
    margin-top: 121px;    
    justify-content:flex-start;
    
    
    & table{      
        background-color: #f8f8f8; 
        box-shadow: 0 4px 10px 0;
        align-items:flex-start;
        max-width: 1100px;
        /* width: 45.5%; */
        & td {
            border: 1px solid gray;
        }
    }
`

const GenImg = styled.div`    
    position: relative;
    margin-top: 70px;
    grid-area: img;    
    display: flex;
    flex-wrap: wrap;
    
`
const Items = styled.div`    
    position: absolute;
    top: ${props => props.top+'px'};
    left: ${props => props.left+'px'};
    z-index: 100;
    width: 20px;
    height: 20px;
    background-color: #fb5e36;
    border-radius: 50%;
    border: 2px solid #fff;
`
const Img = styled.img`
    margin-right: 3em;
    position: relative;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 4px 10px 0;
    
    
`

export default class GeneralForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            X: -120,
            Y: 0,
            mouse: [],
            title: '',
            description: '',
            link: '',
            table: [],
            admin: false,           
        }
       
        this.HandleCoordinat = this.HandleCoordinat.bind(this)        
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.ClickAdmin = this.ClickAdmin.bind(this)
    }

   
    ClickAdmin(e) {
        e.preventDefault();
        (this.state.admin === false 
        ? this.setState({admin: true}, () => console.log(this.state.admin)) 
        : this.setState({admin: false}, () => console.log(this.state.admin)))        
    }

    HandleCoordinat(e) {
        let x = e.pageX -80
        let y = e.pageY -200    
        
        this.setState({
                X: x,
                Y: y
        }, () => console.log(this.state.X+'x'+this.state.Y))

        let newElement = {
            X: this.state.X,
            Y: this.state.Y
        }

        this.setState(prev => ({
            mouse: [...prev.mouse, newElement]
        }), console.log(this.state.mouse))        
    }

    addNewItem (){  
        if(this.state.admin === true)
            return <div>
                        <Items onClick={() => this.handleForm()} top={this.state.Y} left={this.state.X}></Items>
                    </div>                
        else   
            alert('To add an object, you must have admistrator rights')
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }

    handleAdd(e) {
        e.preventDefault()
        let newElement = {
            title: this.state.title,
            description: this.state.description,
            link: this.state.link,
            coordinateX: this.state.X,
            coordinateY: this.state.Y
        }
        this.setState(prev => ({
            table: [...prev.table, newElement]
        }), () => console.log(this.state.table))
        axios.post('http://localhost:4000/teilhaus/add', newElement)
        .then(res => console.log(res.data))
        alert('ADDED')
    }

    getTable() {
            return  this.state.table.map(function(item, i){
            return <Table obj={item} key={i} /> 
        })
    }
    getItem() {
            return  this.state.table.map(function(item, i){
            return <Item obj={item} key={i} /> 
          })
          
      }

    componentDidMount() {
        axios.get('http://localhost:4000/teilhaus')
        .then(res => {
            this.setState({
                table: res.data
            }, () => console.log(this.state.table))            
        })
        
    }
    handleForm() {
        if(this.state.admin === false)
        undefined
        else
        return  <Form>
                        <ul>
                            <li>
                                <label>Title</label><br/>
                                <input onChange={this.handleChange} name='title' type='text'></input>
                            </li>
                            <li>
                                <label>Description</label><br/>
                                <textarea onChange={this.handleChange} name='description' type='text'></textarea>
                            </li>
                            <li>
                                <label>Link</label><br/>
                                <input onChange={this.handleChange} name='link' type='text'></input>
                            </li>
                            <button onClick={this.handleAdd}>Add</button>
                        </ul>      
                 </Form> 
    }    

    render() {
        return (
            <div>
                <WrappApp className='generalForm_wrap'>
                    <Menu>
                        <ul>
                            <li><a onClick={this.ClickAdmin} href='#'>Admin</a></li>
                            <li><a onClick={this.ClickAdmin} href='#'>User</a></li>
                        </ul>
                    </Menu>    
                    {(this.state.admin === false) ? <h1>You are logged in as User</h1> :<h1>You are logged in as Admin</h1>}                
                    <GenImg className='generalForm_img'>
                        {this.addNewItem()}
                        {this.getItem()}                        
                        <Img 
                            src='https://www.kern-haus.de/fileadmin/_processed_/7/c/csm_kern-haus-vero-nachtansicht-eingangsseite_e4b77862cc.jpg'
                            width='750'
                            height='500'
                            onClick={this.HandleCoordinat}
                        >                        
                        </Img>
                        {this.handleForm()} 
                        <TableItem>
                        <table>                        
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th> 
                                    <th>Link</th>
                                    
                                </tr>
                            </thead>
                            <tbody>    
                                {this.getTable()}
                            </tbody>
                        </table>                        
                    </TableItem>
                    </GenImg> 
                </WrappApp>
            </div>
        )
    }
}