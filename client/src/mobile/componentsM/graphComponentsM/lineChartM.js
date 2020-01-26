import React, { Component } from 'react';
import { lightningChart, emptyTick, DataPatterns, AxisScrollStrategies, SolidLine, SolidFill, ColorHEX, AutoCursorModes, VisibleTicks, FontSettings } from '@arction/lcjs';

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

export default class LineChartM extends Component {
    constructor(props) {
        super(props)
        this.chartId = Math.trunc(Math.random() * 100000);
        this.i = 0;
        this.setupComplete = false;
        this.lineSeries = [];
        this.colours = ['#0071B2', '#E69D00', '#009E73', '#CC79A7']; //Add more colours
    }

    componentDidMount = () => {this.createChart()}
    componentWillUnmount = () => {this.chart.dispose()}
    componentDidUpdate = () => {this.pullData()}

    createChart = () => {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId });
        this.chart
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill)
            .setAutoCursorMode(AutoCursorModes.disabled)
            .setMouseInteractions(false)
            .setMouseInteractionWheelZoom(false)
            .setMouseInteractionPan(false)
            .setMouseInteractionRectangleFit(false)
            .setMouseInteractionRectangleZoom(false)
            .setMouseInteractionsWhileScrolling(false)
            .setMouseInteractionsWhileZooming(false)

        this.chart.engine.container.onwheel = null
        this.chart.engine.container.ontouchstart = null
        this.chart.engine.container.ontouchmove = null

        this.chart.getDefaultAxisY()
            .setScrollStrategy(AxisScrollStrategies.expansion)
            .setMouseInteractions(false)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }))

        //Refactor this
        if (this.props.title === 'RPM') { this.chart.getDefaultAxisY().setInterval(0, 15000, false, true); }
        else if (this.props.title === 'Air To Fuel') { this.chart.getDefaultAxisY().setInterval(0, 25, false, true); }
        else if (this.props.title === 'Manifold Air Pressure') { this.chart.getDefaultAxisY().setInterval(0, 115, false, true); }
        else if (this.props.title === 'Throttle Position') { this.chart.getDefaultAxisY().setInterval(0, 100, false, true); }
        else if (this.props.title === 'Engine Temperature') { this.chart.getDefaultAxisY().setInterval(0, 150, false, true); }
        else if (this.props.title === 'Oil Temperature') { this.chart.getDefaultAxisY().setInterval(0, 150, false, true); }
        else if (this.props.title === 'Fuel Temperature') { this.chart.getDefaultAxisY().setInterval(0, 70, false, true); }
        else if (this.props.title === 'Intake Air Temperature') { this.chart.getDefaultAxisY().setInterval(0, 100, false, true); }
        else if (this.props.title === 'Oil Pressure') { this.chart.getDefaultAxisY().setInterval(0, 100, false, true); }
        else if (this.props.title === 'Barometer') { this.chart.getDefaultAxisY().setInterval(0, 100, false, true); }
        else if (this.props.title === 'Injector Pulse Width') { this.chart.getDefaultAxisY().setInterval(0, 10, false, true); }
        else if (this.props.title === 'Battery Voltage') { this.chart.getDefaultAxisY().setInterval(0, 10, false, true); }
        else if (this.props.title === 'Suspension') { this.chart.getDefaultAxisY().setInterval(0, 2, false, true); }
        else if (this.props.title === 'Acceleration') { this.chart.getDefaultAxisY().setInterval(-1.7, 1.7, false, true); }
        else if (this.props.title === 'Axes') { this.chart.getDefaultAxisY().setInterval(-150, 150, false, true); }
        else if (this.props.title === 'Speed') { this.chart.getDefaultAxisY().setInterval(0, 150, false, true); }
        else if (this.props.title === 'Distance') { this.chart.getDefaultAxisY().setInterval(0, 1, false, true); }

        this.chart.getDefaultAxisX()
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setTickStyle(emptyTick)
            .setMouseInteractions(false)
            .setInterval(0, 30)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }));

        var axis = this.chart.getDefaultAxisY()
        var font = new FontSettings({ size: 10 })
        font = font.setFamily("helvetica")
        font = font.setWeight("bold")
        var ticks = new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#000'), tickLength: 8 }), labelFont: font })
        ticks.setLabelPadding(100)
        axis.setTickStyle(ticks)
        
        if (this.props.data.length === undefined) {
            this.lineSeries.push(this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive }));
            this.lineSeries[0]
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
                }))
                .setMouseInteractions(false)
        }
        else {
            var i = 0;
            while (i < this.props.data.length) {
                this.lineSeries.push(this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive }));
                this.lineSeries[i]
                    .setStrokeStyle(new SolidLine({
                        thickness: 2,
                        fillStyle: new SolidFill({ color: ColorHEX(this.colours[i]) })
                    }))
                    .setMouseInteractions(false)
                i++;
            }
        }
        this.setupComplete = true;
    }

    changeInterval = (interval) => {
        this.chart.getDefaultAxisX()
            .setInterval(0, interval)
    }

    pullData = () => {
        let data = this.props.data
        if (this.setupComplete) {
            if (data.length === undefined) { this.lineSeries[0].add({ x: this.i, y: data })}
            else {
                var i = 0;
                while(i < this.props.data.length) {
                    this.lineSeries[i].add({x: this.i, y: data[i]});
                    i++;
                }
            }
            this.i++
        }
    }

    render() {
        let data = this.props.data
        //Refactor this
        if (this.props.title !== 'Acceleration' && this.props.title !== 'Suspension' && this.props.title !== 'Axes') {
            return (
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '0', paddingBottom: '0', marginTop: '10px', marginBottom: '0px' }}>
                        <b>{data}&nbsp;{this.props.units}</b>
                    </p>
                    <div id={this.chartId} className='fill' style={{ height: '300px' }} onWheel={(event) => { return true; }}></div>
                </div>
            );
        }
        else if (this.props.title === 'Acceleration') {
            return (
                <div style={{ marginBottom: '20px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '0.8rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', marginLeft: '10px', marginRight: '10px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>X:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[0]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Y:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Z:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[2]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <div id={this.chartId} className='fill' style={{ height: '300px' }}></div>
                </div>
            );
        }
        else if (this.props.title === 'Axes') {
            return (
                <div style={{ marginBottom: '20px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '0.8rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', marginLeft: '10px', marginRight: '10px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Roll:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[0]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Pitch:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Yaw:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '40px', textAlign: 'center' }}><b>{data[2]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <div id={this.chartId} className='fill' style={{ height: '300px' }}></div>
                </div>
            );
        }
        else if (this.props.title === 'Suspension') {
            return (
                <div style={{ marginBottom: '20px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '0.7rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginLeft: '3px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>FR:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '35px', textAlign: 'center' }}><b>{data[0]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', width: '15px', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>FL:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '35px', textAlign: 'center' }}><b>{data[1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', width: '15px', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>RR:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '35px', textAlign: 'center' }}><b>{data[2]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', width: '15px', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#CC79A7', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>RL:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '35px', textAlign: 'center' }}><b>{data[3]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', width: '15px', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <div id={this.chartId} className='fill' style={{ height: '300px' }}></div>
                </div>
            );
        }
    }
}