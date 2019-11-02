import React from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

export default class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.lineGraph = React.createRef();
        this.state = {
            data: {},
            redraw: false,
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                scaleShowGridlines: false, 
                scaleShowHorizontalLines: false, 
                scaleShowVerticalLines: false, 
                legend: {
                    position: 'top',
                    fullWidth: true,
                    labels: {
                        usePointStyle: true, 
                        boxWidth: 5,
                        padding: 60,
                        width: '50%'
                    },
                    onHover: function (e) {
                        e.target.style.cursor = 'pointer';
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false, 
                            lineWidth: 1, 
                            zeroLineWidth: 2, 
                            drawTicks: false
                        },
                        ticks: {
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
                            drawTicks: false
                        },
                        scaleLabel: {
                            display: true, 
                            labelString: "units"
                        },
                        ticks: {
                            beginAtZero: true,
                            padding: 15
                        }
                    }]
                }
            }
        }
    }

    render = () => {
        return (
            <article id="graph" style={{height: '400px', marginTop: '40px', marginLeft: '20px', marginRight: '20px', marginBottom:'80px'}}>
                <Line data={this.state.data} options={this.state.options} ref={this.lineGraph} redraw={this.state.redraw} />
            </article>
        );
    }
}