import React, { Component } from "react";
import styled from 'styled-components'
import Menu from './menu/menu'
import GeneralForm from './GeneralForm/GeneralForm'
import Chartgoogle from './chart/molecules/chart'
import Form from './chart/molecules/form'
import AnyChart from './chart/molecules/Anychart'
import ChartD from './chart/molecules/ChartD3'
import Fusion from './chart/organisms/FusionChart'




import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const MainApp = styled.div`
    
    height: 100vh;
`

class App extends Component {
    render() {
        return (
           
            <div className='App'> 
           
                <MainApp>           
                    <GeneralForm /> 
                    
                    
                </MainApp>              
                
            </div>
        );
    }
}

export default App;