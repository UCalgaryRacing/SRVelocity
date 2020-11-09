import React from "react";
import Select from "react-select";
import { Row, Col, Container, Button, Modal, Badge } from "react-bootstrap";
import ScatterPlot from "./historicalGraphComponents/scatterPlot";
import CSVoption from "./CSVoption";
import { readString } from "react-papaparse";

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
      show: false,
      selectedCSV: [],
      plottedCSVFiles: [this.props.currentCSVid],
      availableColours: ["#2e3131", "#bfbfbf"],
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

    // this.setState({
    //   yAxis: selectedOption,
    //   yData: tempData,
    // });

    this.setState(function (prevState, prevProps) {
      prevState.selectedCSV.forEach((csv, i, arr) => {
        let csvTempData = csv.CSVdata.data.map(
          (dict) => dict[selectedOption.value]
        );

        csv.yData = csvTempData;
      });

      return {
        yAxis: selectedOption,
        yData: tempData,
        selectedCSV: prevState.selectedCSV,
      };
    });
  };

  handleXChange = (selectedOption) => {
    let tempData = this.state.currentCSV.data.map(
      (dict) => dict[selectedOption.value]
    );

    // this.setState({
    //   xAxis: selectedOption,
    //   xData: tempData,
    // });

    this.setState(function (prevState, prevProps) {
      prevState.selectedCSV.forEach((csv, i, arr) => {
        let csvTempData = csv.CSVdata.data.map(
          (dict) => dict[selectedOption.value]
        );

        csv.xData = csvTempData;
      });

      return {
        xAxis: selectedOption,
        xData: tempData,
        selectedCSV: prevState.selectedCSV,
      };
    });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  // TODO: Needs to be refactored
  showCSVFiles = () => {
    let files = [];
    let i = 0;
    for (let file of this.props.CSVFiles) {
      if (!this.state.plottedCSVFiles.includes(file.metadata.id)) {
        let date = new Date(parseInt(file.metadata.date));
        files.push(
          <CSVoption
            filename={file.name}
            driver={file.metadata.driver}
            car={file.metadata.car}
            date={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
            ID={file.metadata.id}
            key={i}
            index={i}
            onSelect={this.addCompareCSV}
          />
        );
        i++;
      }
    }
    return files;
  };

  // TODO: Needs to be refactored
  addCompareCSV = (CSVSelected, filename, id) => {
    this.handleClose();

    if (this.state.selectedCSV.length == 2) return;

    const config = {
      header: true,
      dynamicTyping: true,
    };

    let parseResult = readString(CSVSelected, config);

    let tempXData = [];
    let tempYData = [];

    if (this.state.xAxis) {
      tempXData = parseResult.data.map((dict) => dict[this.state.xAxis.value]);
    }
    if (this.state.yAxis) {
      tempYData = parseResult.data.map((dict) => dict[this.state.yAxis.value]);
    }

    this.setState(function (prevState, props) {
      prevState.selectedCSV.push({
        name: filename,
        id: id,
        CSVdata: parseResult,
        xData: tempXData,
        yData: tempYData,
        color: prevState.availableColours.shift(),
      });
      prevState.plottedCSVFiles.push(id);
      return {};
    });
  };

  removeCSV = (e) => {
    const i = e.currentTarget.getAttribute("data-value");
    console.log(i);
    this.setState(function (prevState, prevProps) {
      const col = prevState.selectedCSV[i].color;
      prevState.availableColours.push(col);
      prevState.availableColours.sort();

      prevState.selectedCSV.splice(i, 1);

      prevState.plottedCSVFiles.splice(i + 1, 1);

      return {};
    });
    // Add colour back
    // remove id
    // remove from selectedCSV
  };

  legendGenerator = () => {
    let labels = [];
    labels.push(
      <span key={"m"}>
        <Badge variant="primary" style={{ backgroundColor: "#FF0000" }}>
          {this.props.currentCSVname}
        </Badge>
      </span>
    );

    this.state.selectedCSV.forEach((csv, i, arr) => {
      labels.push(
        <span key={i} onClick={this.removeCSV} data-value={i}>
          <Badge variant="primary" style={{ backgroundColor: csv.color }}>
            {csv.name}
          </Badge>
        </span>
      );
    });

    return labels;
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
            <Col>
              <p>Click to add another CSV file:</p>
              <Button onClick={this.handleShow}>
                <b>Add</b>
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col>
              <p>Legend:</p>
              {this.legendGenerator()}
            </Col>
          </Row>
        </Container>
        <ScatterPlot
          yData={this.state.yData}
          xData={this.state.xData}
          compareCSV={this.state.selectedCSV}
        />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select a CSV File</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="CSV-select-modal">{this.showCSVFiles()}</div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}
