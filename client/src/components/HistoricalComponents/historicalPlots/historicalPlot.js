import React from "react";
import Select from "react-select";
import { Row, Col, Container, Button, Modal, CardDeck } from "react-bootstrap";
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
      if (file.metadata.id !== this.props.currentCSVid) {
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
  addCompareCSV = (CSVSelected, filename) => {
    const config = {
      header: true,
      dynamicTyping: true,
    };

    let parseResult = readString(CSVSelected, config);
    console.log(this.state.xAxis, this.state.yAxis);

    let tempXData = [];
    let tempYData = [];

    if (this.state.xAxis) {
      tempXData = parseResult.data.map((dict) => dict[this.state.xAxis.value]);
    }
    if (this.state.yAxis) {
      tempYData = parseResult.data.map((dict) => dict[this.state.yAxis.value]);
    }

    let new_csv = {
      name: filename,
      CSVdata: parseResult,
      xData: tempXData,
      yData: tempYData,
    };

    this.setState((prevState, props) => {
      selectedCSV: prevState.selectedCSV.push(new_csv);
    });
  };

  render = () => {
    console.log(this.state.selectedCSV);
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
        </Container>
        <ScatterPlot yData={this.state.yData} xData={this.state.xData} />

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
