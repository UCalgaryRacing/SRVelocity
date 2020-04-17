import React, { Component } from 'react';
import { lightningChart, emptyTick, DataPatterns, AxisScrollStrategies, SolidLine, SolidFill, ColorHEX, VisibleTicks, FontSettings } from '@arction/lcjs';
import '../../styling/lineChart.css';

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

//TODO: Clean this up more fam
export default class LineChart extends Component {
    constructor(props) {
        super(props)
        this.chartId = Math.trunc(Math.random() * 100000);
        this.i = 0;
        this.setupComplete = false;
        this.lineSeries = [];
        this.colours = ['#0071B2', '#E69D00', '#009E73', '#CC79A7']; //Add more colours
    }

    componentDidMount = () => { this.createChart(); }
    componentWillUnmount = () => { this.chart.dispose(); }
    componentDidUpdate = () => { 
        if(!this.props.updatingRange) this.pullData(); 
    }

    configureAutoCursor() {
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
    }

    configureLineSeries = () => {
        if (this.props.sensors.length === 1) {
            this.lineSeries.push(this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive }).setName(''));
            this.lineSeries[0]
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
                }))
                .setMouseInteractions(false)
                .setResultTableFormatter((builder, series, Xvalue, Yvalue) => {
                    return builder
                        .addRow(Yvalue.toFixed(3) + " " + this.props.sensors[0].output_unit)
                });
        }
        else {
            var i = 0;
            while (i < this.props.sensors.length) {
                this.lineSeries.push(this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive }).setName(''));
                this.lineSeries[i]
                    .setStrokeStyle(new SolidLine({
                        thickness: 2,
                        fillStyle: new SolidFill({ color: ColorHEX(this.colours[i]) })
                    }))
                    .setMouseInteractions(false)
                    .setResultTableFormatter((builder, series, Xvalue, Yvalue) => {
                        return builder
                            .addRow(Yvalue.toFixed(3) + ' ' + this.props.sensors[0].output_unit)
                    });
                i++;
            }
        }
        this.setupComplete = true;
    }

    createChart = () => {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId });
        this.chart
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill)
            .setMouseInteractions(false)
            .setMouseInteractionWheelZoom(false)
            .setMouseInteractionPan(false)
            .setMouseInteractionRectangleFit(false)
            .setMouseInteractionRectangleZoom(false)
            .setMouseInteractionsWhileScrolling(false)
            .setMouseInteractionsWhileZooming(false);
        this.configureAutoCursor();
        this.chart.engine.container.onwheel = null;
        this.chart.getDefaultAxisY()
            .setScrollStrategy(AxisScrollStrategies.expansion)
            .setMouseInteractions(false)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }));
        this.chart.getDefaultAxisX()
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setTickStyle(emptyTick)
            .setMouseInteractions(false)
            .setInterval(0, 300)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }));
        var axis = this.chart.getDefaultAxisY();
        var font = new FontSettings({});
        font = font.setFamily("helvetica");
        font = font.setWeight("bold");
        var ticks = new VisibleTicks({ labelFillStyle: new SolidFill({ color: ColorHEX('#000'), tickLength: 8 }), labelFont: font });
        ticks.setLabelPadding(100);
        axis.setTickStyle(ticks);
        this.chart.getDefaultAxisY().setInterval(this.props.sensors[0].lower_bound, this.props.sensors[0].upper_bound, false, true);
        this.configureLineSeries();
    }

    changeInterval = (lower, upper) => { this.chart.getDefaultAxisX().setInterval(lower, upper) }

    pullData = () => {
        let data = this.props.data;
        if (this.setupComplete) {
            if (data.length === 1) this.lineSeries[0].add({ x: this.i, y: data[0] }); 
            else {
                var i = 0;
                while (i < this.props.data.length) {
                    this.lineSeries[i].add({ x: this.i, y: data[i] });
                    i++;
                }
            }
            this.i++
        }
    }

    render() {//TODO: Clean up CSS
        //Just to shorten the code a bit
        let data = this.props.data;
        let sensors = this.props.sensors
        let content = [];
        //Make all of the columns for displaying current values
        for (const sensor in sensors) {
            content.push(
                <div class='col' style={{ textAlign: 'center', padding: '0'}}>
                    <div class='row' style={{ textAlign: 'center' , width: '100%', padding: '0', margin: '0'}}>
                        <div class='col' style={{ color: this.colours[sensor], fontStyle: 'bold', textAlign: 'right', padding: '0' }}><b>{sensors[sensor].name}:</b></div>
                        <div class='col' style={{ fontStyle: 'bold', textAlign: 'center' , padding: '0'}}><b>{(data === undefined) ? '0' : data[sensor]}</b></div>
                        <div class='col' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0' }}><b>{sensors[0].output_unit}</b></div>
                    </div>
                </div>
            );
        }
        //Show a multiseries plot
        if (sensors.length > 1) {
            return (
                <div style={{ marginBottom: '20px' }}>
                    <div class='row' style={{ textAlign: 'center', fontSize: '1.2rem', fontStyle: 'bold', paddingTop: '0', paddingBottom: '0', marginBottom: '0px', marginTop: '10px', marginRight: '0', marginLeft: '0', width: '100%' }}>
                        {content}
                    </div>
                    <div id={this.chartId} className='fill' style={{ height: '500px' }}></div>
                </div>
            );
        } 
        //Show a single series plot
        else {
            return (
                <div style={{ margin: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '0', paddingBottom: '0', marginTop: '10px', marginBottom: '0px' }}>
                        <b>{(data === undefined) ? '0' : data[0]}&nbsp;{sensors[0].output_unit}</b>
                    </p>
                    <div id={this.chartId} className='fill' style={{ height: '500px' }} onWheel={(event) => { return true; }}></div>
                </div>
            );
        }
    }
}