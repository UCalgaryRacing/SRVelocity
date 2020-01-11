import React from 'react';
import { Line } from 'react-chartjs-2';
import nodemon from 'nodemon';

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export default class LineGraphM extends React.Component {
    constructor(props) {
        super(props);
        this.lineGraph = React.createRef();
        this.state = {

            // currentLabel: 3,
            // data: {
            //     labels: [0, 1, 2],
            //     datasets: [{
            //         data: [1, 2, 3],
            //         borderColor: 'rgb(255, 0, 0)',
            //         pointRadius: 1,
            //         backgroundColor: 'rgb(255, 255, 255)',
            //         lineTension: 0
            //     }]
            // },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scaleShowGridlines: false,
                scaleShowHorizontalLines: false,
                scaleShowVerticalLines: false,
                animation: {
                    duration: 0
                },
                legend: {
                    position: 'top',
                    fullWidth: true,
                    labels: {
                        usePointStyle: true,
                        boxWidth: 5,
                        padding: 60,
                        width: '50%'
                    }
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
                            drawTicks: false
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
                            drawTicks: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: this.props.title
                        },
                        ticks: {
                            beginAtZero: true,
                            padding: 15
                        }
                    }]
                }
            },
            deviceHeight: 0
        }
        this.updateWindowDimensions();
    }

    componentDidMount() {
        // this.interval = setInterval(() => this.tick(), 200);
        // this.state.data.datasets[0].label = this.props.title
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    // pullData = () => {
    //     this.state.data.labels.push(this.state.currentLabel.toString());
    //     this.state.data.datasets[0].data.push(getRandomInt(0, 10));
    //     let newTime = this.state.currentLabel + 1;
    //     this.setState({ currentLabel: (this.state.currentLabel + 1) });

    //     if (this.state.currentLabel - 30 > this.state.data.labels[0]) {
    //         this.state.data.labels.shift();
    //         this.state.data.datasets[0].data.shift();
    //     }
    // }

    updateWindowDimensions = () => {
        this.setState({ deviceHeight: (window.innerHeight > window.innerWidth ? 0.5 * window.innerHeight : window.innerHeight * 0.8) });
    }

    // tick = () => {
    //     this.pullData();
    // }

    render = () => {
        const { deviceHeight } = this.state;
        return (
            <article id="graph" style={{ height: deviceHeight, marginTop: '40px', marginLeft: '0px', marginRight: '20px', marginBottom: '20px' }}>
                <p style={{ textAlign: 'center', fontSize: '1.4rem', paddingTop: '0', paddingBottom: '0', marginBottom: '-30px', marginTop: '-30px' }}>
                    <b>{this.props.data.datasets[0].data[this.props.data.datasets[0].data.length - 1]}&nbsp;{this.props.units}</b>
                </p>
                <Line data={this.props.data} options={this.state.options} ref={this.lineGraph} redraw={true} />
            </article>
        );
    }
}