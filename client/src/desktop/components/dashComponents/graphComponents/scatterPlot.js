import React, { Component } from 'react';
import { ColorRGBA, IndividualPointFill, PointShape, lightningChart, emptyTick, AxisScrollStrategies, SolidFill, ColorHEX, AutoCursorModes, SolidLine, FontSettings } from '@arction/lcjs';

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
        this.padding = 0;
        this.zero = false;
    }

    componentDidMount = () => { this.createChart(); }
    componentWillUnmount = () => { this.chart.dispose(); }
    componentDidUpdate = () => { this.addData(); }

    createChart = () => {
        //Set up chart
        this.chart = lightningChart().ChartXY({ containerId: this.chartId })
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill)
        this.pointSeries = this.chart.addPointSeries({ pointShape: PointShape.Circle });
        this.individualStyle = new IndividualPointFill()
        this.individualStyle.setFallbackColor(ColorRGBA(0, 0, 0, 255))
        this.pointSeries
            .setPointSize(10.0)
            .setPointFillStyle(this.individualStyle)
            .setMouseInteractions(false)
        this.chart
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
        //Set up cursor
        let autoCursor = this.chart.getAutoCursor();
        autoCursor.setGridStrokeXStyle(new SolidLine({
            thickness: 1,
            fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
        }));
        autoCursor.setGridStrokeYStyle(new SolidLine({
            thickness: 1,
            fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
        }));
        autoCursor.getPointMarker().setSize(0);
        autoCursor.disposeTickMarkerX();
        autoCursor.disposeTickMarkerY();
        var font = new FontSettings({});
        font = font.setFamily("helvetica");
        font = font.setWeight("bold");
        autoCursor.getResultTable().setFont(font);
        autoCursor.getResultTable().setTextFillStyle(new SolidFill({ color: ColorHEX('#FFF') }));
        autoCursor.getResultTable().getBackground().setFillStyle(new SolidFill({ color: ColorHEX('#C22D2D') }));
        //Don't allow scrolling
        this.chart.engine.container.onwheel = null;
        this.setupComplete = true;
    }

    addData = () => {
        //Need to get value for autocursor somehow
        if (this.setupComplete) {
            if (this.props.mapUpdate) {
                this.pointSeries.clear()
                for (var point of this.props.data) {
                    this.addPoint(point)
                }
            } else {
                this.addPoint(this.props.point)
            }
        }
    }

    addPoint = (arg) => {
        if (arg === undefined) return;
        let point = {};
        point.x = arg.x;
        point.y = arg.y;
        point.color = arg.color;
        if (!point.x || !point.y) return;
        if (!this.zero) {
            this.zeroX = point.x * 1000;
            this.zeroY = point.y * 1000;
            this.zero = true;
            return;
        }
        point.x *= 1000;
        point.x -= this.zeroX;
        point.y *= 1000;
        point.y -= this.zeroY;
        this.pointSeries.add(point);
    }

    render() {
        return (
            <div style={{ marginBottom: '20px' }}>
                <div id={this.chartId} className='fill' style={{ height: '500px' }} onWheel={(event) => { return true; }}></div>
            </div>
        );
    }
}