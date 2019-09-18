import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import Gantt from 'fusioncharts/fusioncharts.gantt';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Widgets,Gantt, FusionTheme);

const ShowChart = styled.button`
  display: ${props => props.display};
`

class App extends Component {
  constructor(props) {
    super(props)
    this.showChart = this.showChart.bind(this)
    this.state= {
        processe: [],
        task: [], 
        chartData: {},
        display: 'block'

    }
  }
  componentDidMount() {
    axios.get('http://localhost:4000/chart')
    .then(res => {      
      let newLabel = {}
      let newTask = {}
      res.data.map(item => {
        newLabel = {
          label: item.Chart.TaskName
        },
        this.setState(prev => ({
          processe: [...prev.processe, newLabel]
        }))

        newTask = {
          start: item.Chart.StartDate,
          end: item.Chart.EndDate
        },
        this.setState(prev => ({
          task: [...prev.task, newTask]
        }))
      })
    })
  }

  showChart() {
   const ChartData = {
        type: 'gantt',
        width: 1200,
        height: 500,
        dataFormat: 'json',
        dataSource: {
          chart: {
            dateformat: "mm-dd-yyyy",
            caption: "42 dp",
            subcaption: "Gantt chart",
            theme: "fusion",
            canvasBorderAlpha: "40"
          },
          categories: [{
            category: [{
                start: "06-01-2019",
                end: "06-31-2019",
                label: "Iun '19"
              },
              {
                start: "07-01-2019",
                end: "07-31-2019",
                label: "Iul '19"
              },
              {
                start: "08-01-2019",
                end: "08-31-2019",
                label: "Aug '19"
              },
              {
                start: "09-01-2019",
                end: "09-31-2019",
                label: "Sep '19"
              },
            ]
          }],
          processes: {
            fontsize: "16",
            isbold: "2",
            align: "right",
            process: this.state.processe
          },
          tasks: {
            color: "#5D62B5",
            task: this.state.task
          }
      }
    }
   
    console.log(ChartData)
    this.setState({
      chartData: ChartData,
      display: 'none'
    }, () => console.log(this.state.chartData))
}

  render() {
    return (
      <div className="App">
        <ShowChart display={this.state.display} onClick={this.showChart}>Show Chart</ShowChart>
        <ReactFC {...this.state.chartData} />
      </div>
    );
  }
}

export default App;
