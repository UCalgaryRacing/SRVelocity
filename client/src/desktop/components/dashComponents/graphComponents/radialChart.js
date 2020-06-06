import React, { Component } from 'react';
import { lightningChart, SpiderWebMode, SolidFill, ColorHEX, SolidLine, FontSettings, ColorRGBA } from '@arction/lcjs';
import Data from '../../../../data';

const theme = {
    whiteFill: new SolidFill({ color: ColorHEX('#FFFFFF') }),
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    darkFill: new SolidFill({ color: ColorHEX('#505050') })
}

export default class RadialChart extends Component {
    constructor(props) {
        super(props);
        this.chartId = Math.trunc(Math.random() * 100000);
        this.setupComplete = false;
        this.categories = ['Y', 'X', '-Y', '-X'];
    }
    componentWillMount = () => { document.addEventListener('gotData', () => { this.pullData() }); }
    componentDidMount = () => { this.createChart(); }
    componentWillUnmount = () => {
        this.chart.dispose();
        document.removeEventListener('gotData', this.pullData());
    }

    createChart = () => {
        this.chart = lightningChart().Spider({ containerId: this.chartId })
            .setTitle('')
            .setAxisInterval(1.5)
            .setWebMode(SpiderWebMode.Circle)
            .setBackgroundFillStyle(theme.whiteFill)
            .setChartBackgroundFillStyle(theme.whiteFill)
            .setAxisStyle(new SolidLine({
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') }),
                thickness: 2
            }))
            .setAxisLabelStyle(new SolidFill({ color: ColorHEX('#000') }))
            .setScaleLabelStyle(new SolidFill({ color: this.props.showLabels ? ColorHEX('#000') : ColorRGBA(0, 0, 0, 0) }))
            .setWebStyle(new SolidLine({
                fillStyle: new SolidFill({ color: ColorHEX('#C8C8C8') }),
                thickness: 2
            }))
            .setMouseInteractions(false);
        this.chart.engine.container.onwheel = null;
        this.series = this.chart.addSeries();
        this.series.addPoints(
            { axis: 'Y', value: 0 },
            { axis: 'X', value: 0 },
            { axis: '-Y', value: 0 },
            { axis: '-X', value: 0 });
        this.series
            .setStrokeStyle(new SolidLine({
                thickness: 0,
                fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
            }))
            .setPointFillStyle(new SolidLine({
                thickness: 0,
                fillStyle: new SolidFill({ color: ColorHEX('#C22D2D') })
            }))
            .setCursorEnabled(false)
            .setFillStyle(new SolidFill({ color: ColorRGBA(194, 45, 45, 0.3) }))
            .setHighlighted(true);
        this.series.setMouseInteractions(false);
        var font = new FontSettings({});
        font = font.setFamily("helvetica");
        font = font.setWeight("bold");
        this.chart.setAxisLabelFont(font);
        this.chart.setScaleLabelFont(font);
        this.setupComplete = true;
    }

    pullData() {
        Data.getInstance().get('Acceleration').then(data => {
            if (this.setupComplete) {
                let x = data[0];
                let y = data[1];
                if (x > 0 && y > 0) {
                    this.series.addPoints(
                        { axis: 'Y', value: y },
                        { axis: 'X', value: x },
                        { axis: '-Y', value: 0 },
                        { axis: '-X', value: 0 });
                }
                else if (x > 0 && y < 0) {
                    this.series.addPoints(
                        { axis: 'Y', value: 0 },
                        { axis: 'X', value: x },
                        { axis: '-Y', value: Math.abs(y) },
                        { axis: '-X', value: 0 });
                }
                else if (x < 0 && y > 0) {
                    this.series.addPoints(
                        { axis: 'Y', value: y },
                        { axis: 'X', value: 0 },
                        { axis: '-Y', value: 0 },
                        { axis: '-X', value: Math.abs(x) });
                }
                else {
                    this.series.addPoints(
                        { axis: 'Y', value: 0 },
                        { axis: 'X', value: 0 },
                        { axis: '-Y', value: Math.abs(y) },
                        { axis: '-X', value: Math.abs(x) });
                }
            }
        });
    }

    render() {
        return (
            <div id='radial'>
                <div id={this.chartId} className='fill' style={{ height: '700px' }}></div>
            </div>
        );
    }
}