import React from 'react';
import { Line } from 'react-chartjs-2';

export default class LineGraph extends React.Component {
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
                responsiveAnimationDuration: 0,
                animation: {
                    duration: 0
                },
                hover: {
                    mode: null
                },
                tooltips: {
                    enabled: false
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
                            display: true,
                            labelString: this.props.title,
                            fontSize: 15,
                            fontStyle: 'bold',
                            fontColor: '#494949'
                        },
                        ticks: {
                            beginAtZero: true,
                            padding: 15,
                            fontSize: 15,
                            fontStyle: 'bold',
                            fontColor: '#494949'
                        }
                    }]
                }
            }
        }
    }

    componentWillUnmount = () => {
        this.forceUpdate();
    }

    render = () => {
        if (this.state.data.datasets.length < 2) {
            return (
                <article id="graph" style={{ height: '500px', marginTop: '40px', marginLeft: '20px', marginRight: '20px', marginBottom: '100px' }}>
                    <p style={{ textAlign: 'center', fontSize: '1.4rem', paddingTop: '0', paddingBottom: '0', marginBottom: '10px', marginTop: '-40px' }}>
                        <b>{this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]}&nbsp;{this.props.units}</b>
                    </p>
                    <Line id={this.props.id} data={this.state.data} options={this.state.options} ref={this.lineGraph} redraw={true} />
                </article>
            );
        }
        else if (this.state.data.datasets.length === 3) {
            return (
                <article id="graph" style={{ height: '500px', marginTop: '40px', marginLeft: '20px', marginRight: '20px', marginBottom: '100px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.4rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '10px', marginTop: '-40px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>X:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Y:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[1].data[this.state.data.datasets[1].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Z:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[2].data[this.state.data.datasets[2].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <Line id={this.props.id} data={this.state.data} options={this.state.options} ref={this.lineGraph} redraw={true} />
                </article>
            );
        }
        else if (this.state.data.datasets.length === 4) {
            return (
                <article id="graph" style={{ height: '500px', marginTop: '40px', marginLeft: '20px', marginRight: '20px', marginBottom: '100px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.4rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '10px', marginTop: '-40px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right' }}><b>FR:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right' }}><b>FL:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[1].data[this.state.data.datasets[1].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right' }}><b>RR:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[2].data[this.state.data.datasets[2].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#CC79A7', fontStyle: 'bold', textAlign: 'right' }}><b>RL:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[3].data[this.state.data.datasets[3].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <Line id={this.props.id} data={this.state.data} options={this.state.options} ref={this.lineGraph} key={Math.random()} />
                </article>
            );
        }
    }
}