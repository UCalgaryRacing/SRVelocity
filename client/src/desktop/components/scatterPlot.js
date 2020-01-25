import React from 'react';
import { Scatter } from 'react-chartjs-2';
import '../styling/scatterPlot.css'

export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                datasets: [{
                    fill: false,
                    backgroundColor: 'rgba(0,0,0,0)',
                    pointBorderColor: 'rgba(255,0,0,1)',
                    pointBorderWidth: 4,
                    pointRadius: 0.5,
                    data: this.props.data,
                    pointBackgroundColor: this.props.color
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scaleShowGridlines: false,
                scaleShowHorizontalLines: false,
                scaleShowVerticalLines: false,
                responsiveAnimationDuration: 0,
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        realtime: {
                            onRefresh: function (chart) { },
                        },
                        gridLines: {
                            display: false,
                            lineWidth: 1,
                            zeroLineWidth: 2,
                            drawTicks: false,
                            color: '#494949'
                        },
                        ticks: {
                            display: false,
                            maxRotation: 0,
                            minRotation: 0,
                            padding: 15,
                            maxTicksLimit: 10,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            lineWidth: 1,
                            zeroLineWidth: 0,
                            drawTicks: false,
                            color: '#494949'
                        },
                        scaleLabel: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            padding: 15,
                            fontSize: 15,
                            fontStyle: 'bold',
                            fontColor: '#494949'
                        }
                    }]
                },
                hover: {
                    mode: null
                },
                tooltips: {
                    enabled: false
                }
            }
        }
    }

    render = () => {
        return (
            <div id='scatterPlot'>
                <Scatter data={this.state.data} options={this.state.options} key={Math.random()}/>
            </div>
        );
    }
}