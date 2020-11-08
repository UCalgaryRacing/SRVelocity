import React from "react";
import Select from "react-select";
import { Row, Col, Container } from "react-bootstrap";
import ScatterPlot from "./historicalGraphComponents/scatterPlot";

export default class HistoricalPlotDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCSV: this.props.currentCSV,
      options: [],
      yAxis: null,
      xAxis: null,
      yData: [],
      xData: [],
    };
  }

  componentDidMount = () => {
    this.updateOptions();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentCSV === this.props.currentCSV) {
      return;
    }

    this.updateOptions();
  };

  updateOptions = () => {
    let temp = this.state.currentCSV.meta.fields.map((field) => {
      return { value: field, label: field };
    });
    this.setState({
      options: temp,
    });
  };

  handleYChange = (selectedOption) => {
    let tempData = this.state.currentCSV.data.map(
      (dict) => dict[selectedOption.value]
    );

    this.setState({
      yAxis: selectedOption,
      yData: tempData,
    });
  };

  handleXChange = (selectedOption) => {
    let tempData = this.state.currentCSV.data.map(
      (dict) => dict[selectedOption.value]
    );

    this.setState({
      xAxis: selectedOption,
      xData: tempData,
    });
  };

  render = () => {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <p>Please choose a field for the Y Axis:</p>
              <Select
                value={this.state.yAxis}
                onChange={this.handleYChange}
                options={this.state.options}
              />
            </Col>
            <Col>
              <p>Please choose a field for the X Axis:</p>
              <Select
                value={this.state.xAxis}
                onChange={this.handleXChange}
                options={this.state.options}
              />
            </Col>
          </Row>
        </Container>
        <ScatterPlot yData={this.state.yData} xData={this.state.xData} />
      </div>
    );
  };
}
