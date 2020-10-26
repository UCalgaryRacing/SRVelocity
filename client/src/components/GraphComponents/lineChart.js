import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { lightningChart, emptyTick, DataPatterns, AxisScrollStrategies, SolidLine, SolidFill, ColorHEX, VisibleTicks, FontSettings, emptyLine } from '@arction/lcjs';
import './_styling/lineChart.css';
import { Card, CardDeck } from 'react-bootstrap';

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

export default class LineChart extends Component {
    constructor(props) {
        super(props)
        this.chartId = Math.trunc(Math.random() * 100000);
        this.i = 0;
        this.setupComplete = false;
        this.lineSeries = [];
        this.maxValue = 0;
        this.minValue = 0;
        this.mouseInteractions = false;
        this.colours = ['#C22D2D', '#0071B2', '#009E73', '#E69D00', '#CC79A7']; //Add more colours
        this.toggleSeries.bind(this);
    }

    componentDidMount = () => {
        this.createChart();
        this.updateFontSize();
        window.addEventListener("resize", this.updateFontSize);
    }

    componentWillUnmount = () => { this.chart.dispose(); }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data) this.pullData();
    }

    updateFontSize = () => {
        if (window.innerWidth < 1000) {
            var axis = this.chart.getDefaultAxisY();
            var font = new FontSettings();
            font = font.setFamily("helvetica");
            font = font.setWeight("bold");
            font = font.setSize(12);
            axis.setTickStyle((visibleTick) =>
                visibleTick
                    .setTickStyle(emptyLine)
                    .setLabelFont(font)
                    .setLabelFillStyle(new SolidFill({ color: ColorHEX('#000') }))
                    .setGridStrokeStyle(new SolidLine({ thickness: 1.5, fillStyle: new SolidFill({ color: ColorHEX('#FFF') }) })))
        }
    }

    addDerivativeSeries = (data, index) => {
        let map = [];
        for (let i = 0; i < data.length; i++) map.push({ x: i, y: data[i] });
        var colour = this.colours[this.lineSeries.length];
        if (index !== undefined) {
            var parentIndex = this.props.sensors.findIndex(item => item.name + "'" === index);
            colour = this.colours[parentIndex];
        }
        var childIndex = this.props.sensors.findIndex(item => item.name === index);
        if (childIndex >= 0) {
            this.removeSeries(index, parentIndex, true);
        }
        this.lineSeries.push(
            this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
                .setName(index)
        );
        this.lineSeries[this.lineSeries.length - 1]
            .setStrokeStyle(new SolidLine({
                thickness: 2,
                fillStyle: new SolidFill({ color: ColorHEX(colour) })
            }).setFillStyle(solidfill => solidfill.setA((index !== undefined) ? '80' : 'FF')))
            .setMouseInteractions(this.mouseInteractions)
            .setResultTableFormatter((builder, series, Xvalue, Yvalue) => {
                return builder.addRow(series.getName() + ": " + Yvalue.toFixed(2) + " " + this.props.sensors[this.lineSeries.length - 1].output_unit)
            })
            .add(map.map((point) => ({ x: point.x, y: point.y })));
    }

    removeSeries = (index, parent, update) => {
        for (var series in this.lineSeries) {
            if (this.lineSeries[series].getName() === index) {
                this.lineSeries[series].dispose();
                this.lineSeries.splice(series, 1);
            }
        }
        if (update) return;
        let min = Math.round(this.lineSeries[parent].getYMin() * 1.3);
        let max = Math.round(this.lineSeries[parent].getYMax() * 1.3);
        if (Math.abs(min) < 1.5 && Math.abs(max) < 1.5) {
            min = -2;
            max = 2;
        }
        if (min > 0) min = 0;
        this.minValue = min;
        this.maxValue = max;
        this.chart.getDefaultAxisY().setInterval(min, max);
        if (this.chart.getAxes()[2]) this.chart.getAxes()[2].setInterval(min, max);
    }

    toggleRightAxis = () => {
        if (this.chart.getAxes()[2]) {
            this.chart.getAxes()[2].dispose()
        } else {
            this.chart.addAxisY(true);
            var axis = this.chart.getAxes()[2];
            var font = new FontSettings({});
            font = font.setFamily("helvetica");
            font = font.setWeight("bold");
            axis.setTickStyle((visibleTick) =>
                visibleTick
                    .setTickStyle(emptyLine)
                    .setLabelFont(font)
                    .setLabelFillStyle(new SolidFill({ color: ColorHEX('#000') }))
                    .setGridStrokeStyle(new SolidLine({ thickness: 1, fillStyle: new SolidFill({ color: ColorHEX('#FFF') }) }))
            );
            axis.setScrollStrategy(AxisScrollStrategies.expansion)
                .setMouseInteractions(this.mouseInteractions)
                .setStrokeStyle(new SolidLine({
                    thickness: 3,
                    fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
                }));
            axis.setInterval(this.minValue, this.maxValue);
        }
    }

    toggleGrid = () => {
        var axis = this.chart.getDefaultAxisY();
        var font = new FontSettings({});
        font = font.setFamily("helvetica");
        font = font.setWeight("bold");
        axis.setTickStyle((visibleTick) => {
            const hideGrid = visibleTick.getGridStrokeStyle().fillStyle.color.r !== 1;
            return visibleTick
                .setTickStyle(emptyLine)
                .setLabelFont(font)
                .setLabelFillStyle(new SolidFill({ color: ColorHEX('#000') }))
                .setGridStrokeStyle(new SolidLine({ thickness: 1.5, fillStyle: new SolidFill({ color: ColorHEX(hideGrid ? '#FFF' : '#C8C8C8') }) }))
        });
    }

    createChart = () => {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId })
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill);
        this.chart
            .setMouseInteractions(this.mouseInteractions)
            .setMouseInteractionWheelZoom(this.mouseInteractions)
            .setMouseInteractionPan(this.mouseInteractions)
            .setMouseInteractionRectangleFit(this.mouseInteractions)
            .setMouseInteractionRectangleZoom(this.mouseInteractions)
            .setMouseInteractionsWhileScrolling(this.mouseInteractions)
            .setMouseInteractionsWhileZooming(this.mouseInteractions)
        //Configure the cursor
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
        //Configure the axes
        this.chart.getDefaultAxisX()
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setTickStyle(emptyTick)
            .setMouseInteractions(this.mouseInteractions)
            .setInterval(0, 300)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }));
        this.chart.getDefaultAxisY()
            .setScrollStrategy(AxisScrollStrategies.expansion)
            .setMouseInteractions(this.mouseInteractions)
            .setStrokeStyle(new SolidLine({
                thickness: 3,
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') })
            }));
        var axis = this.chart.getDefaultAxisY();
        var font = new FontSettings({});
        font = font.setFamily("helvetica");
        font = font.setWeight("bold");
        axis.setTickStyle((visibleTick) =>
            visibleTick
                .setTickStyle(emptyLine)
                .setLabelFont(font)
                .setLabelFillStyle(new SolidFill({ color: ColorHEX('#000') }))
                .setGridStrokeStyle(new SolidLine({ thickness: 1.5, fillStyle: new SolidFill({ color: ColorHEX('#FFF') }) }))
        );
        //Configure the line series
        for (var i = 0; i < this.props.sensors.length; i++) {
            this.lineSeries.push(this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive }).setName(this.props.sensors[i].name));
            this.lineSeries[i]
                .setStrokeStyle(new SolidLine({
                    thickness: 2,
                    fillStyle: new SolidFill({ color: ColorHEX(this.colours[i]) })
                }))
                .setMouseInteractions(this.mouseInteractions)
                .setResultTableFormatter((builder, series, Xvalue, Yvalue) => {
                    return builder
                        .addRow(series.getName() + ": " + Yvalue.toFixed(2) + ' ' + this.props.sensors[0].output_unit)
                });
        }
        //Allow scrolling while hovering over chart
        this.chart.engine.container.onwheel = null;
        this.setupComplete = true;
    }

    changeInterval = (lower, upper) => { this.chart.getDefaultAxisX().setInterval(lower, upper) }

    pullData = () => {
        let data = this.props.data;
        if (data === undefined) return;
        if (data.length === 0) return;
        if (this.setupComplete) {
            //Set the interval
            var setInterval = false;
            for (i in data) {
                if (data[i] > this.maxValue) {
                    this.maxValue = data[i];
                    setInterval = true;
                }
            }
            for (i in data) {
                if (data[i] < this.minValue) {
                    this.minValue = data[i];
                    setInterval = true;
                }
            }
            if (setInterval) {
                let min = Math.floor(this.minValue * 1.3);
                let max = Math.ceil(this.maxValue * 1.3);
                if (this.props.sensors[0].category === 'Acceleration') max = 2;
                this.minValue = min;
                this.maxValue = max;
                this.chart.getDefaultAxisY().setInterval(min, max);
                if (this.chart.getAxes()[2]) this.chart.getAxes()[2].setInterval(min, max);
            }
            //Add the data
            if (data.length === 1) this.lineSeries[0].add({ x: this.i, y: data[0] });
            else {
                var i = 0;
                while (i < this.lineSeries.length) {
                    this.lineSeries[i].add({ x: this.i, y: data[i] });
                    i++;
                }
            }
            this.i++;
        }
    }

    toggleSeries = (index) => {
        if (this.lineSeries[index].isDisposed()) this.lineSeries[index].restore();
        else this.lineSeries[index].dispose();
        this.setState({});
    }

    render() {
        //Just to shorten the code a bit
        let data = this.props.data;
        let sensors = this.props.sensors;
        let content = [];
        //Make all of the columns for displaying current values
        for (const sensor in sensors) {
            if (sensors[sensor].derivative) continue;
            const derivative = sensors.filter(item => item.name === sensors[sensor].name + "'" && item.derivative);
            content.push(
                <div id='chart-text'>
                    <Card border='light' style={{ width: '313px', margin: 'auto' }}>
                        <Card.Body style={{ padding: '0' }}>
                            <div id='outer-col' class='col' style={{ textAlign: 'center', padding: '0', paddingBottom: '3px', margin: 'auto' }}>
                                <div class='row' style={{ textAlign: 'center', padding: '0', margin: 'auto' }}>
                                    <div style={{ margin: 'auto' }}>
                                        <div class='col-xs' style={{ color: this.colours[sensor], fontStyle: 'bold', textAlign: 'right', padding: '0', fontSize: '1rem', display: 'inline-block', marginTop: '5px', width: '143px' }}>
                                            <Button id='derivativeButton' onClick={() => { this.props.controlDerivative(sensors[sensor].name) }}><b style={{ fontStyle: 'italic', fontSize: '1rem' }}>f'(x)</b></Button>
                                            <b style={{ fontSize: '1rem', float: 'right', display: 'inline-block', marginTop: '3px', cursor: 'pointer', textDecoration: this.lineSeries[sensor] !== undefined && this.lineSeries[sensor].isDisposed() ? 'line-through': 'none' }} onClick={() => this.toggleSeries(sensor)}>{sensors[sensor].name}:</b>
                                        </div>
                                        <div class='col-xs' style={{ fontStyle: 'bold', textAlign: 'center', padding: '0', fontSize: '1rem', width: '70px', display: 'inline-block' }}><b style={{ verticalAlign: 'middle' }}>{(data === undefined) ? '0' : data[sensor]}</b></div>
                                        <div class='col-xs' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0', fontSize: '1rem', display: 'inline-block', marginBottom: '5px', width: '100px' }}><b style={{ verticalAlign: 'middle', marginTop: '3px' }}>{sensors[0].output_unit}</b></div>
                                    </div>
                                </div>
                                {
                                    derivative.length !== 0 ?
                                        <div class='row' style={{ textAlign: 'center', padding: '0', margin: 'auto', marginTop: '5px', width: '100%' }}>
                                            <div style={{ margin: 'auto' }}>
                                                <div class='col-xs' style={{ color: this.colours[sensor] + '80', fontStyle: 'bold', textAlign: 'right', padding: '0', fontSize: '1rem', display: 'inline-block', width: '143px' }}><div style={{ width: '34px' }} /><b>{derivative[0].name}</b></div>
                                                <div class='col-xs' style={{ fontStyle: 'bold', textAlign: 'center', padding: '0', fontSize: '1rem', width: '70px', display: 'inline-block' }}><b></b></div>
                                                <div class='col-xs' style={{ fontStyle: 'bold', textAlign: 'left', padding: '0', fontSize: '1rem', width: '100px', display: 'inline-block', marginBottom: '5px' }}><b style={{ verticalAlign: 'middle', marginTop: '3px' }}></b></div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        }

        return (
            <div id='lineChart' style={{ marginBottom: '20px' }}>
                {window.innerHeight < 1000 ? content :
                    <CardDeck style={{ justifyContent: 'center', marginLeft: '5px', marginRight: '5px' }}>
                        {content}
                    </CardDeck>
                }
                <div id={this.chartId} style={{ height: '500px' }} className='fill'></div>
            </div>
        );
    }
}