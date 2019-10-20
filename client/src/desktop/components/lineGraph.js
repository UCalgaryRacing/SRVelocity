import React from 'react';
import Chart from 'chart.js';

export default class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.index = props.index
        this.data = props.data
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: this.data,
            options: {
                //Customize chart options
            }
        });
    }


    render = () => {
        return (
            <div className="chart-container" >
                <div id='lineGraph'>
                    <canvas 
                    id={this.index}
                    ref={this.chartRef}
                    onClick={this.props.onClick}
                    />
                </div>
            </div>
        )
    }
}