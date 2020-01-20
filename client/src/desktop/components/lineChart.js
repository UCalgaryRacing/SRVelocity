import React, { Component } from 'react';
import {
    lightningChart,
    emptyTick,
    DataPatterns,
    AxisScrollStrategies,
    SolidLine,
    SolidFill,
    ColorHEX,
    AutoCursorModes,
    VisibleTicks,
    FontSettings
} from '@arction/lcjs';
import '../styling/lineChart.css';

let xAccel = [-0.01, 0.02, 0.01, 0.08, 0.07, 0.08, 0.06, -0.01, 0.04, 0.04, 0.05, 0.01, 0.09, 0.03, 0.01, 0.06, 0, -0.04, -0.05, -0.15, -0.05, 0.06, 0.05, 0.08, 0, -0.03, 0.01, 0.04, 0.12, 0.08, 0.08, 0.06, 0.12, 0.16, 0.07, 0.05, 0.05, 0.01, 0.08, 0.09, 0.08, 0.02, -0.02, 0.06, 0.06, 0.06, 0.03, 0.01, 0.05, 0.06, 0.05, 0.07, 0.07, 0.07, 0.05, 0.05, 0.07, 0.02, 0, 0.02, 0, 0.03, 0.05, 0.05, 0, -0.02, 0.04, 0.06, 0.01, 0, 0.03, 0.04, 0.01, -0.02, -0.01, 0.05, -0.01, 0.03, 0.04, 0.02, 0.05, 0.03, -0.02, 0.03, 0.03, 0.01, 0.01, 0, 0, 0, 0.01, 0.03, 0.06, 0.04, 0.07, 0.07, 0.05, -0.06, 0.06, -0.01, 0.16, 0.06, -0.02, 0.06, 0.08, 0.02, 0.1, -0.01, -0.08, 0.07, 0.15, 0.04, 0.03, 0.19, 0.14, 0.21, 0.15, 0.21, 0.31, 0.3, 0.26, 0.71, 0.33, 0.23, 0.32, 0.17, -0.37, -0.05, -0.08, -0.01, -0.07, 0.09, -0.07, -0.16, -0.2, -0.07, 0.11, 0.16, 0.02, -0.02, 0.1, 0.25, 0.28, 0.3, 0.35, 0.48, 0.69, 0.58, 0.58, 0.66, 0.66, 0.42, 0.36, 0.49, 0.49, 0.48, 0.28, -0.26, -0.35, -0.53, -0.47, -0.56, -0.45, -0.57, -0.44, -0.15, -0.22, -0.47, -0.3, 0.31, 0.01, -0.15, -0.3, -0.59, -0.65, -0.78, -0.81, -0.87, -0.89, -0.75, -0.66, -0.52, -0.48, -0.52, -0.61, -0.8, -0.91, -0.97, -1.05, -1.15, -1.19, -1.1, -1, -0.94, -0.84, -0.42, 0.15, 0.51, 0.88, 0.86, 0.91, 0.88, 0.73, 0.75, 0.66, 0.61, 0.32, -0.11, -0.38, -0.31, -0.61, -0.76, -0.85, -0.99, -0.93, -0.81, -0.4, 0.21, 0.52, 0.5, 0.58, 0.74, 0.84, 0.74, 0.6, 0.54, 0.68, 0.63, 0.28, -0.43, -0.64, -0.66, -0.82, -0.79, -0.63, -0.56, -0.67, -0.76, -0.8, -0.64, -0.57, -0.57, -0.57, -0.2, -0.19, 0, -0.11, -0.03, -0.13, -0.08, 0.03, 0.1, 0.14, 0.1, 0.2];
let yAccel = [-0.06, -0.05, -0.08, -0.06, -0.06, -0.02, -0.05, -0.12, -0.09, -0.06, -0.05, -0.07, -0.1, -0.1, -0.11, -0.06, -0.09, -0.05, -0.09, -0.15, -0.07, -0.02, 0.03, 0.22, 0.21, 0.2, 0.21, 0.1, -0.13, 0.07, -0.04, -0.02, -0.06, -0.06, -0.08, -0.08, -0.2, -0.1, 0.03, -0.06, -0.05, -0.03, -0.1, -0.08, -0.09, -0.08, -0.06, -0.07, -0.12, -0.13, -0.13, -0.13, -0.12, -0.11, -0.14, -0.13, -0.14, -0.14, -0.13, -0.17, -0.19, -0.13, -0.07, -0.08, -0.07, -0.05, -0.06, -0.07, -0.07, -0.05, -0.03, -0.05, -0.07, -0.06, -0.06, -0.06, -0.06, -0.05, -0.06, -0.05, -0.04, -0.07, -0.08, -0.05, -0.05, -0.07, -0.06, -0.05, -0.1, -0.08, -0.07, -0.03, -0.05, -0.07, -0.05, -0.05, -0.04, -0.08, -0.07, -0.01, 0.09, 0.16, 0.15, 0.18, 0.19, 0.21, 0.19, 0.19, -0.04, 0.14, 0.14, 0.07, 0.04, 0.03, 0.09, 0.2, 0.24, 0.21, 0.43, 0.43, 0.61, 0.11, -0.16, -0.04, 0.12, 0.2, 0.37, 0.22, 0.2, 0.2, -0.06, -0.1, -0.28, 0.03, -0.11, -0.16, -0.25, -0.19, -0.2, -0.27, -0.39, -0.44, -0.39, -0.34, -0.32, -0.19, 0.09, 0.11, 0.09, 0.1, 0.13, -0.03, 0.09, 0.15, 0.23, 0.27, 0.55, 0.45, 0.07, 0.15, 0.1, 0.23, 0.03, 0.13, 0.12, 0.08, 0.18, 0.21, -0.14, -0.53, -0.43, -0.44, -0.46, -0.46, -0.32, -0.31, -0.14, -0.19, -0.17, -0.07, -0.02, 0, 0.01, -0.09, -0.12, -0.18, -0.15, -0.16, -0.15, -0.19, -0.14, -0.07, -0.01, 0.02, 0.04, 0.02, -0.07, -0.02, -0.01, -0.05, -0.04, 0.01, 0.01, 0.07, -0.01, 0.06, 0.03, 0.08, -0.08, -0.1, -0.06, -0.14, -0.12, -0.05, -0.02, 0, -0.11, -0.04, -0.04, -0.24, -0.33, -0.42, -0.43, -0.42, -0.48, -0.46, -0.36, -0.25, 0.01, -0.16, -0.19, 0.01, 0.14, -0.07, 0.08, 0.09, 0.17, 0.22, 0.1, 0.27, 0.16, 0.35, 0.58, 0.48, 0.56, 0.14, 0.05, 0.18, 0.31, 0.29, 0.3, 0.24, 0.17, -0.08, -0.26];
let zAccel = [-1, -1.02, -0.99, -0.99, -0.98, -1.02, -1.06, -0.95, -1, -1.05, -1.05, -1.11, -1.05, -0.99, -0.96, -0.95, -1.03, -1.06, -1.04, -1.26, -1.11, -0.82, -0.93, -1.09, -0.99, -1.08, -1.03, -0.95, -0.85, -1.08, -0.97, -1.08, -0.97, -0.97, -1.06, -1, -0.91, -1.01, -1.08, -1.04, -0.99, -1.09, -0.96, -0.96, -1, -0.99, -1.02, -0.99, -1, -1.04, -1.03, -1.01, -0.99, -0.98, -1.01, -1.01, -1.01, -1, -1.02, -0.99, -1.04, -1.02, -0.95, -0.99, -1.04, -1.06, -1.04, -1.06, -1.05, -1.02, -0.98, -1.02, -1.07, -1.06, -1.02, -1.01, -1.07, -1.05, -1.06, -1, -1.03, -1.02, -0.99, -1.01, -1.05, -0.96, -1.03, -1.04, -1.03, -1.03, -1.03, -0.99, -1, -0.98, -1.04, -1.05, -0.81, -0.87, -0.96, -1, -0.98, -0.93, -0.84, -1.04, -0.68, -1.33, -1.08, -1.07, -0.82, -1.07, -1.02, -1.14, -1.41, -1.08, -0.69, -0.88, -0.94, -0.92, -0.96, -0.88, -0.98, -0.96, -1.04, -0.98, -1.16, -0.8, -0.63, -0.8, -0.69, -0.98, -0.7, -1.07, -1.05, -1.19, -1.15, -0.99, -0.91, -0.93, -0.9, -1.07, -1.18, -1.33, -1.11, -1.16, -1.06, -1.08, -1.22, -0.84, -0.93, -0.99, -0.94, -0.7, -0.33, -0.62, -0.83, -1.3, -1.41, -1.25, -0.54, -0.7, -0.49, -0.89, -0.92, -1.07, -1.13, -1.05, -1.23, -0.91, -0.61, -1.12, -0.89, -0.98, -0.6, -1.08, -1.05, -1, -1.05, -1, -1.38, -0.7, -0.7, -0.74, -0.84, -0.66, -0.88, -0.86, -0.91, -0.53, -0.68, -0.25, -0.79, -1.3, -1.15, -1.09, -0.93, -0.82, -0.94, -0.68, -0.81, -0.86, -0.89, -0.65, -0.92, -1.1, -1.12, -1.09, -1.07, -1.04, -1.13, -1.16, -1.06, -0.95, -0.92, -0.96, -0.93, -0.96, -1.11, -0.95, -1.06, -0.75, -1.25, -0.96, -0.91, -0.91, -0.91, -0.93, -0.88, -0.96, -1.36, -1.49, -1.33, -1.15, -1.09, -0.98, -0.91, -0.87, -0.94, -1.02, -1.06, -0.46, -0.79, -1.07, -1.1, -1.06, -1.07, -0.77, -0.91, -0.97, -0.88, -0.88, -1.07, -0.95, -0.64, -0.51, -0.66];

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

export default class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
        this.chartId = Math.trunc(Math.random() * 100000)
        this.i = 0;
        this.setupComplete = false
    }

    createChart = () => {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId });
        this.chart
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill)
            .setMouseInteractions(false)
            .setAutoCursorMode(AutoCursorModes.disabled)

        this.chart.getDefaultAxisY()
            .setScrollStrategy(AxisScrollStrategies.expansion)
            .setMouseInteractions(false)

        if(this.props.title === 'RPM') {
            this.chart.getDefaultAxisY().setInterval(0, 13000, false, true);
        }
        else if(this.props.title === 'Air To Fuel') {
            this.chart.getDefaultAxisY().setInterval(5, 25, false, true);
        }
        else if(this.props.title === 'Manifold Air Pressure') {
            this.chart.getDefaultAxisY().setInterval(25, 115, false, true);
        }
        else if(this.props.title === 'Throttle Position') {
            this.chart.getDefaultAxisY().setInterval(0, 100, false, true);
        }
        else if(this.props.title === 'Engine Temperature') {
            this.chart.getDefaultAxisY().setInterval(15, 130, false, true);
        }
        else if(this.props.title === 'Oil Temperature') {
            this.chart.getDefaultAxisY().setInterval(15, 130, false, true);
        }
        else if(this.props.title === 'Fuel Temperature') {
            this.chart.getDefaultAxisY().setInterval(15, 70, false, true);
        }
        else if(this.props.title === 'Intake Air Temperature') {
            this.chart.getDefaultAxisY().setInterval(0, 100, false, true);
        }
        else if(this.props.title === 'Oil Pressure') {
            this.chart.getDefaultAxisY().setInterval(0, 100, false, true);
        }
        else if(this.props.title === 'Barometer') {
            this.chart.getDefaultAxisY().setInterval(0, 100, false, true);
        }
        else if(this.props.title === 'Injector Pulse Width') {
            this.chart.getDefaultAxisY().setInterval(0, 10, false, true);
        }
        else if(this.props.title === 'Battery Voltage') {
            this.chart.getDefaultAxisY().setInterval(0, 10, false, true);
        }
        else if(this.props.title === 'Suspension') {
            this.chart.getDefaultAxisY().setInterval(0, 2, false, true);
        }
        else if(this.props.title === 'Acceleration') {
            this.chart.getDefaultAxisY().setInterval(-1.7, 1.7, false, true);
        }
        else if(this.props.title === 'Axes') {
            this.chart.getDefaultAxisY().setInterval(-120, 120, false, true);
        }
        else if(this.props.title === 'Speed') {
            this.chart.getDefaultAxisY().setInterval(0, 120, false, true);
        }
        else if(this.props.title === 'Distance') {
            this.chart.getDefaultAxisY().setInterval(0, 1, false, true);
        }
        
        this.chart.getDefaultAxisX()
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setTickStyle(emptyTick)
            .setMouseInteractions(false)
            .setInterval(0, 30)

        var axis = this.chart.getDefaultAxisY()
        var font = new FontSettings({ })
        font = font.setFamily("helvetica")
        font = font.setWeight("bold")
        var ticks = new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#000'), tickLength: 8 }), labelFont: font })
        ticks.setLabelPadding(100)
        axis.setTickStyle(ticks)
        if (this.props.title !== 'Acceleration' && this.props.title !== 'Suspension' && this.props.title !== 'Axes') {
            this.lineSeries1 = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            this.lineSeries1
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
                }))
                .setMouseInteractions(false)
        }
        else {
            this.lineSeries1 = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            this.lineSeries1
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#0071B2') })
                }))
                .setMouseInteractions(false)
        }
        if(this.props.title === 'Acceleration' || this.props.title === 'Axes' || this.props.title === 'Suspension') {
            this.lineSeries2 = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            this.lineSeries2
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#E69D00') })
                }))
                .setMouseInteractions(false)
            this.lineSeries3 = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            this.lineSeries3
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#009E73') })
                }))
                .setMouseInteractions(false)
        }
        if(this.props.title === 'Suspension') {
            this.lineSeries4 = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            this.lineSeries4
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#CC79A7') })
                }))
                .setMouseInteractions(false)
        }
        this.setupComplete = true
    }

    componentDidMount = () => {
        this.createChart()
    }

    componentWillMount = () => {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount = () => {
        this.chart.dispose()
    }

    tick = () => {
        if (this.setupComplete) {
            if (this.props.title !== 'Acceleration' && this.props.title !== 'Suspension' && this.props.title !== 'Axes') {
                this.lineSeries1.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
            }
            else if (this.props.title === 'Acceleration') {
                this.lineSeries1.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
                this.lineSeries2.add({ x: this.i, y: this.state.data.datasets[1].data[this.state.data.datasets[1].data.length - 1] })
                this.lineSeries3.add({ x: this.i, y: this.state.data.datasets[2].data[this.state.data.datasets[2].data.length - 1] })
            }
            else if (this.props.title === 'Axes') {
                this.lineSeries1.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
                this.lineSeries2.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
                this.lineSeries3.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
            }
            else if (this.props.title === 'Suspension') {
                this.lineSeries1.add({ x: this.i, y: this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1] })
                this.lineSeries2.add({ x: this.i, y: this.state.data.datasets[1].data[this.state.data.datasets[1].data.length - 1] })
                this.lineSeries3.add({ x: this.i, y: this.state.data.datasets[2].data[this.state.data.datasets[2].data.length - 1] })
                this.lineSeries4.add({ x: this.i, y: this.state.data.datasets[3].data[this.state.data.datasets[3].data.length - 1] })
            }
            this.i++
        }
    }

    render() {
        if (this.props.title !== 'Acceleration' && this.props.title !== 'Suspension' && this.props.title !== 'Axes') {
            return (
                <>
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '0', paddingBottom: '0', marginTop: '10px', marginBottom: '0px' }}>
                        <b>{this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]}&nbsp;{this.props.units}</b>
                    </p>
                    <div id={this.chartId} className='fill' style={{height: '344px'}}></div>
                </>
            );
        }
        else if (this.props.title === 'Acceleration') {
            return (
                <>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.2rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', width: '100%' }}>
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
                    <div id={this.chartId} className='fill' style={{height: '344px'}}></div>
                </>
            );
        }
        else if (this.props.title === 'Axes') {
            return (
                <>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.2rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', width: '100%' }}>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#0072B2', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Roll:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#E69F00', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Pitch:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[1].data[this.state.data.datasets[1].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                        <div class='col' style={{ textAlign: 'center' }}>
                            <div class='row' style={{ textAlign: 'center' }}>
                                <div class='col' style={{ color: '#009E73', fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>Yaw:</b></div>
                                <div class='col-xs' style={{ fontStyle: 'bold', width: '80px', textAlign: 'center' }}><b>{this.state.data.datasets[2].data[this.state.data.datasets[2].data.length - 1]}</b></div>
                                <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{this.props.units}</b></div>
                            </div>
                        </div>
                    </div>
                    <div id={this.chartId} className='fill' style={{height: '344px'}}></div>
                </>
            );
        }
        else if (this.props.title === 'Suspension') {
            return (
                <>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.2rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', width: '100%' }}>
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
                    <div id={this.chartId} className='fill' style={{height: '344px'}}></div>
                </>
            );
        }
    }
}