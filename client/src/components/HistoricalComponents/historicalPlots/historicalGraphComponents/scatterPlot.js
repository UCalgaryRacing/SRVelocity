import React, { Component } from "react";
import {
  ColorRGBA,
  IndividualPointFill,
  PointShape,
  lightningChart,
  emptyTick,
  AxisScrollStrategies,
  SolidFill,
  ColorHEX,
  AutoCursorModes,
  SolidLine,
  FontSettings,
  emptyLine,
} from "@arction/lcjs";

const theme = {
  whiteFill: new SolidFill({ color: ColorHEX("#FFFFFF") }),
  lightGrayFill: new SolidFill({ color: ColorHEX("#A0A0A0A0") }),
  darkFill: new SolidFill({ color: ColorHEX("#505050") }),
};

export default class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.chartId = Math.trunc(Math.random() * 100000);
    this.i = 0;
    this.setupComplete = false;
    this.padding = 0;
    this.zero = false;
    this.mouseInteraction = false;
  }

  componentDidMount = () => {
    this.createChart();
  };
  componentWillUnmount = () => {
    this.chart.dispose();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) this.updateData();
  };

  createChart = () => {
    //Set up chart
    this.chart = lightningChart()
      .ChartXY({ containerId: this.chartId })
      .setBackgroundFillStyle(theme.whiteFill)
      .setChartBackgroundFillStyle(theme.whiteFill);
    this.pointSeries = this.chart.addPointSeries({
      pointShape: PointShape.Circle,
    });
    this.individualStyle = new IndividualPointFill();
    this.individualStyle.setFallbackColor(ColorRGBA(255, 0, 0, 255));
    this.pointSeries
      .setPointSize(10.0)
      .setPointFillStyle(this.individualStyle)
      .setMouseInteractions(this.mouseInteraction);
    this.chart
      .setMouseInteractions(this.mouseInteraction)
      .setMouseInteractionWheelZoom(this.mouseInteraction)
      .setMouseInteractionPan(this.mouseInteraction)
      .setMouseInteractionRectangleFit(this.mouseInteraction)
      .setMouseInteractionRectangleZoom(this.mouseInteraction)
      .setMouseInteractionsWhileScrolling(this.mouseInteraction)
      .setMouseInteractionsWhileZooming(this.mouseInteraction);
    this.chart
      .getDefaultAxisX()
      .setScrollStrategy(AxisScrollStrategies.fitting)
      .setMouseInteractions(this.mouseInteraction)
      .setTickStyle((visibleTick) =>
        visibleTick
          .setTickStyle(emptyLine)
          .setLabelFont(font)
          .setLabelFillStyle(new SolidFill({ color: ColorHEX("#000") }))
          .setGridStrokeStyle(
            new SolidLine({
              thickness: 1.5,
              fillStyle: new SolidFill({ color: ColorHEX("#FFF") }),
            })
          )
      )
      .setStrokeStyle(
        new SolidLine({
          thickness: 3,
          fillStyle: new SolidFill({ color: ColorHEX("#C8C8C8") }),
        })
      );
    this.chart
      .getDefaultAxisY()
      .setScrollStrategy(AxisScrollStrategies.fitting)
      .setMouseInteractions(this.mouseInteraction)
      .setTickStyle((visibleTick) =>
        visibleTick
          .setTickStyle(emptyLine)
          .setLabelFont(font)
          .setLabelFillStyle(new SolidFill({ color: ColorHEX("#000") }))
          .setGridStrokeStyle(
            new SolidLine({
              thickness: 1.5,
              fillStyle: new SolidFill({ color: ColorHEX("#FFF") }),
            })
          )
      )
      .setStrokeStyle(
        new SolidLine({
          thickness: 3,
          fillStyle: new SolidFill({ color: ColorHEX("#C8C8C8") }),
        })
      );

    // TODO: Need to show cursor with current value the heatmap
    let autoCursor = this.chart.getAutoCursor();
    autoCursor.setGridStrokeXStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: new SolidFill({ color: ColorHEX("#C22D2D") }),
      })
    );
    autoCursor.setGridStrokeYStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: new SolidFill({ color: ColorHEX("#C22D2D") }),
      })
    );
    autoCursor.getPointMarker().setSize(0);
    autoCursor.disposeTickMarkerX();
    autoCursor.disposeTickMarkerY();
    var font = new FontSettings({});
    font = font.setFamily("helvetica");
    font = font.setWeight("bold");
    autoCursor.getResultTable().setFont(font);
    autoCursor
      .getResultTable()
      .setTextFillStyle(new SolidFill({ color: ColorHEX("#FFF") }));
    autoCursor
      .getResultTable()
      .getBackground()
      .setFillStyle(new SolidFill({ color: ColorHEX("#C22D2D") }));
    this.pointSeries.setCursorEnabled(true);
    //Don't allow scrolling
    this.chart.engine.container.onwheel = null;
    this.chart.engine.container.ontouchstart = null;
    this.chart.engine.container.ontouchmove = null;
    this.setupComplete = true;
  };

  updateData = () => {
    if (this.setupComplete) {
      if (this.props.xData === undefined || this.props.yData === undefined)
        return;

      let tempArray = [];
      for (const [index, data] of this.props.xData.entries()) {
        let point = {};
        point.x = data;
        point.y = this.props.yData[index];
        point.color = ColorRGBA(255, 0, 0, 255);
        if (point.x === undefined || point.y === undefined) continue;
        tempArray.push(point);
      }

      if (tempArray.length > 0) {
        this.pointSeries.clear();
        this.pointSeries.add(tempArray);
      }
    }
  };

  addPlot = () => {};

  render() {
    return (
      <div id="historicalScatter" style={{ marginBottom: "20px" }}>
        <div
          id={this.chartId}
          className="fill"
          style={{ height: "500px" }}
          onWheel={(event) => {
            return true;
          }}
        ></div>
      </div>
    );
  }
}
