import React, {Component} from 'react'
import AnyChart from 'anychart-react'
import axios from 'axios'


export default class AnyCh extends Component {
    constructor(props) {
        super(props)
        this.state={
            chart:[],
            data: {}
        }
    }
    getChart() {
        // let a = this.state.chart.map((item => {
        //     [   item.TaskID,
        //         item.TaskName, 
        //         item.StartDate, 
        //         item.EndDate, 
        //         item.Duration, 
        //         item.PercentComplete, 
        //         item.Dependencies ]
        // }))
        for (var key in this.state.chart) {
            var value = this.state.chart[key]
        }
        console.log(value)

    }
    componentDidMount() {
        axios.get('http://localhost:4000/chart')
        .then(res => {
            //  let chart = Object.values(res.data)
            // let chart = this.state.chart.push(res.data)
            this.setState({
                data: res.data
            }, () => console.log(this.state.data))
            let value = Object.values(this.state.data)
            console.log(value)
        })
        
    }
    render() {
        return (
            <div>
                <AnyChart
                id=" cProject"
                width={1200}
                height={600}
                type="ganttProject"
                data={[
                        {
                          id: "1",
                          name: "Server 1",
                          periods: [
                            {id:"1_1", start: "2018-01-05", end: "2018-01-25"},
                            {id:"1_2", start: "2018-01-28", end: "2018-02-22"},
                            {id:"1_3", start: "2018-03-03", end: "2018-03-25"}
                        ]},
                        {
                          id: "2",
                          name: "Server 2",
                          periods: [
                            {id: "2_1", start: "2018-01-07", end: "2018-02-15"},
                            {id: "2_2", start: "2018-02-26", end: "2018-03-20"}
                        ]},
                        {
                          id: "3",
                          name: "Server 3",
                          periods: [
                            {id: "3_1", start: "2018-01-04", end: "2018-03-25"}
                        ]}
                      ]
                }
                title="Simple gantt chart"
            />
            </div>
            
        )
    }
}