import React, {Component} from 'react'
import Chart from 'react-google-charts'
import axios from 'axios'


export default class Chartgogle extends Component {
    constructor(props) {
        super(props)
        this.state={
            chart:[],
            data: [],
            data2: [],

            TaskID: '',
            TaskName: '',
            StartDate: '',
            EndDate: '',
            Duration: 0,
            PercentComplete: 0,
            Dependencies: ''
        }
        
    }
    getChart() {
        let a = this.state.chart.map(item =>{
            [   item.TaskID,
                item.TaskName,
                item.StartDate,
                item.EndDate,
                item.Duration,
                item.PercentComplete,
                item.Dependencies
                
            ]
        })
        console.log(a)
        // for (var key in this.state.data) {
        //     var value = this.state.data[key]
        // }
       
        // console.log(value)

    }
    componentDidMount() {
        axios.get('http://localhost:4000/chart')
        .then(res => {
            let chart = res.data.map((item) => {
                this.setState({
                    TaskID: item.Chart.TaskID,
                    TaskName: item.Chart.TaskName,
                    StartDate: item.Chart.StartDate,
                    EndDate: item.Chart.EndDate,
                    Duration: item.Chart.Duration,
                    PercentComplete: item.Chart.PercentComplete,
                    Dependencies: item.Chart.Dependencies
                })
            })
            
            console.log(chart)
        })
        
    }
    render() {
        return (
            <div>
           {this.getChart()}
            <Chart
            width={'100%'}
            height={'400px'}
            chartType="Gantt"
            loader={<div>Loading Chart</div>}
            data={[
                [{ type: 'string', label: 'Task ID' },
                { type: 'string', label: 'Task Name' },
                { type: 'date', label: 'Start Date' },
                { type: 'date', label: 'End Date' },
                { type: 'number', label: 'Duration' },
                { type: 'number', label: 'Percent Complete' },
                { type: 'string', label: 'Dependencies' }],
                [
                  this.state.TaskID,
                  this.state.TaskName,
                  new Date(2015, 5, 5),
                  new Date(2015, 0, 5),
                  null,
                  100,
                  null,
                ]
              ]}
            rootProps={{ 'data-testid': '1' }}
          />
            </div>
            
        )
    }
}