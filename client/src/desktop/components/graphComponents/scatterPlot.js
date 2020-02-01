import React, { Component } from 'react';
import { ColorRGBA, IndividualPointFill, PointShape, lightningChart, emptyTick, DataPatterns, AxisScrollStrategies, SolidLine, SolidFill, ColorHEX, AutoCursorModes, VisibleTicks, FontSettings } from '@arction/lcjs';
//import '../../styling/lineChart.css';

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

export default class ScatterPlot extends Component {
    constructor(props) {
        super(props)
        this.chartId = Math.trunc(Math.random() * 100000);
        this.i = 0;
        this.setupComplete = false;
        this.padding = 0
        this.zero = false
    }

    componentDidMount = () => { this.createChart(); }
    componentWillUnmount = () => { this.chart.dispose(); }
    componentDidUpdate = () => { this.addData(); }

    createChart = () => {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId });
        this.pointSeries = this.chart.addPointSeries({ pointShape: PointShape.Circle });
        this.individualStyle = new IndividualPointFill()
        this.individualStyle.setFallbackColor( ColorRGBA( 0, 0, 0 ) )


        
        this.pointSeries
            .setPointSize(10.0)
            .setPointFillStyle(this.individualStyle)   
        
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

        this.chart.getDefaultAxisX()
            .setScrollStrategy(AxisScrollStrategies.fitting)
            .setTickStyle(emptyTick)
            .setMouseInteractions(false)
        
        this.chart.getDefaultAxisY()
        .setScrollStrategy(AxisScrollStrategies.fitting)
        .setMouseInteractions(false)
        .setTickStyle(emptyTick)

        

        this.setupComplete = true
    }

    changeIntervalX = (min, max) => {
        this.chart.getDefaultAxisX().setInterval(min, max)
    }

    changeIntervalY = (min, max) => {
        this.chart.getDefaultAxisY().setInterval(min, max)
    }

    addData = () => {
        if (this.setupComplete) {

            if(this.props.mapUpdate) {
                this.pointSeries.clear()
                this.pointSeries.add(this.props.data)
            }
            
            if(this.props.point.x && this.props.point.y) {
                if (!this.zero) {
                    this.zeroX = this.props.point.x * 1000
                    this.zeroY = this.props.point.y * 1000
                    this.zero = true
                    return
                }
                this.props.point.x *= 1000
                this.props.point.x -= this.zeroX
                this.props.point.y *= 1000
                this.props.point.y -= this.zeroY


                this.pointSeries.add(this.props.point)
                
            }
        }
    }

    render() {
        let data = this.props.point

        //Refactor this
            return (
                
                <div style={{ marginBottom: '20px' }}>
                    <div id={this.chartId} className='fill' style={{ height: '500px' }} onWheel={(event) => { return true; }}></div>
                </div>
            );
        
    }
}