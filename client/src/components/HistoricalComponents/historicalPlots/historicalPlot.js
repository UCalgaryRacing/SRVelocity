import React from "react";
import Select from "react-select";
import { Row, Col, Container, Button, Modal, CardDeck } from "react-bootstrap";
import ScatterPlot from "./historicalGraphComponents/scatterPlot";
import CSVoption from "./CSVoption";

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

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  showCSVFiles = () => {
    console.log(this.props.currentCSVName);
    let files = [];
    let i = 0;
    for (let file of this.props.CSVFiles) {
      if (file.name !== this.props.currentCSVName) {
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
          />
        );
        i++;
      }
    }
    return files;
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
