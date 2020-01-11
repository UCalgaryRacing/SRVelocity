import React from 'react';
import { Line } from 'react-chartjs-2';

export default class LineGraphM extends React.Component {
    constructor(props) {
        super(props);
        this.lineGraph = React.createRef();
        this.state = {
            data: this.props.data,
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
                    display: false
                },
                scales: {
                    xAxes: [{
                        realtime: {
                            onRefresh: function (chart) { },
                        },
                        gridLines: {
                            display: true,
                            lineWidth: 0,
                            zeroLineWidth: 1,
                            drawTicks: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            lineWidth: 0,
                            zeroLineWidth: 2,
                            drawTicks: false
                        },
                        scaleLabel: {
                            display: true
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
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.forceUpdate();
    }

    updateWindowDimensions = () => {
        this.setState({ deviceHeight: (window.innerHeight > window.innerWidth ? 0.5 * window.innerHeight : window.innerHeight * 0.8) });
    }

    render = () => {
        const { deviceHeight } = this.state;
        return (
            <article id="graph" style={{ height: deviceHeight, marginTop: '40px', marginLeft: '-40px', marginRight: '0px', marginBottom: '0px' }}>
                <p style={{ textAlign: 'center', fontSize: '1.4rem', paddingTop: '0', paddingBottom: '0', marginBottom: '30px', marginTop: '-30px' }}>
                    <b>{this.props.data.datasets[0].data[this.props.data.datasets[0].data.length - 1]}&nbsp;{this.props.units}</b>
                </p>
                <Line data={this.state.data} options={this.state.options} ref={this.lineGraph} key={Math.random()}/>
            </article>
        );
    }
}