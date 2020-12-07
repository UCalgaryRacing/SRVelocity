import React from 'react';
import Select from 'react-select';
import { Row, Col, Container, Button, Modal, Badge } from 'react-bootstrap';
import ScatterPlot from './historicalGraphComponents/scatterPlot';
import CSVoption from './CSVoption';
import { readString } from 'react-papaparse';

import { GATEWAYSERVERIP } from '../../../dataServerEnv';

export default class HistoricalPlotDash extends React.Component {
  constructor(props) {
    super(props);

    this.cache = new Map();
    this.cache.set(this.props.currentCSVid, []);

    this.state = {
      currentCSV: this.props.currentCSV,
      options: [],
      yAxis: null,
      xAxis: null,
      yData: [],
      xData: [],
      show: false,
      selectedCSV: [], // ids
      plottedCSVFiles: [], //CSV object {CSVdata, color, id}
      availableColours: ['#2e3131', '#bfbfbf'],
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

  componentWillUnmount = () => {
    console.log('Unmounting...');
  };

  updateOptions = () => {
    let temp = this.state.currentCSV.meta.fields.map((field) => {
      return { value: field, label: field };
    });
    this.setState({
      options: temp,
    });
  };

  handleYChange = async (selectedOption) => {
    // First check if we already have data for column
    const hasValue = this.cache
      .get(this.props.currentCSVid)
      .findIndex((data) => data.name == selectedOption.value);

    let tempData = null;
    if (hasValue === -1) {
      tempData = await this.initCSVCacheData(
        this.props.currentCSVid,
        this.props.currentCSVname,
        selectedOption.value
      );
    } else {
      tempData = this.cache.get(this.props.currentCSVid)[hasValue].values;
    }

    console.log(this.cache);

    this.state.selectedCSV.forEach(async (csv) => {
      const hasCol = this.cache
        .get(csv.id)
        .findIndex((data) => data.name == selectedOption.value);

      let csvTempData = null;
      if (hasCol === -1) {
        csvTempData = await this.initCSVCacheData(
          csv.id,
          csv.name,
          selectedOption.value
        );
      } else {
        csvTempData = this.cache.get(csv.id)[hasCol].values;
      }

      csv.yData = csvTempData;
    });

    this.setState({
      yAxis: selectedOption,
      yData: tempData,
    });
  };

  handleXChange = async (selectedOption) => {
    // First check if we already have data for column
    const hasValue = this.cache
      .get(this.props.currentCSVid)
      .findIndex((data) => data.name == selectedOption.value);

    let tempData = null;
    if (hasValue === -1) {
      tempData = await this.initCSVCacheData(
        this.props.currentCSVid,
        this.props.currentCSVname,
        selectedOption.value
      );
    } else {
      tempData = this.cache.get(this.props.currentCSVid)[hasValue].values;
    }

    console.log(this.cache);

    this.state.selectedCSV.forEach(async (csv) => {
      const hasCol = this.cache
        .get(csv.id)
        .findIndex((data) => data.name == selectedOption.value);

      let csvTempData = null;
      if (hasCol === -1) {
        csvTempData = await this.initCSVCacheData(
          csv.id,
          csv.name,
          selectedOption.value
        );
      } else {
        csvTempData = this.cache.get(csv.id)[hasCol].values;
      }

      csv.xData = csvTempData;
    });

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

  // TODO: Needs to be refactored
  showCSVFiles = () => {
    let files = [];
    let i = 0;
    for (let file of this.props.CSVFiles) {
      if (
        !this.state.plottedCSVFiles.includes(file.metadata.id) &&
        this.props.currentCSVid !== file.metadata.id
      ) {
        let date = new Date(parseInt(file.metadata.date));
        files.push(
          <CSVoption
            filename={file.name}
            driver={file.metadata.driver}
            car={file.metadata.car}
            date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
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

  initCSVCacheData = async (id, filename, col_name) => {
    try {
      let res = await fetch(
        'http://localhost:5000/' +
          'historical/getColumn/' +
          filename +
          '/' +
          col_name
      );
      let resJson = await res.json();
      let resData = resJson.map(Number);

      // Cache managemnt
      this.cache.get(id).push({
        name: col_name,
        values: resData,
      });
      return resData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  // TODO: Needs to be refactored
  addCompareCSV = (CSVSelected, filename, id) => {
    this.handleClose();

    if (this.state.selectedCSV.length == 2) return;

    this.cache.set(id, []); // Add to cache

    const config = {
      header: true,
      dynamicTyping: true,
    };

    let parseResult = readString(CSVSelected, config);
    let tempXData = [];
    let tempYData = [];

    if (this.state.xAxis) {
      tempXData = parseResult.data.map((dict) => dict[this.state.xAxis.value]);
      this.initCSVCacheData(id, filename, this.state.xAxis).catch((err) =>
        console.log(err)
      );
    }
    if (this.state.yAxis) {
      tempYData = parseResult.data.map((dict) => dict[this.state.yAxis.value]);
      this.initCSVCacheData(id, filename, this.state.yAxis).catch((err) =>
        console.log(err)
      );
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
    const i = e.currentTarget.getAttribute('data-value');
    console.log(i);
    this.setState(function (prevState, prevProps) {
      // Remove from cache
      const CSV_id = prevState.selectedCSV[i].id;
      this.cache.delete(CSV_id);

      const col = prevState.selectedCSV[i].color;
      prevState.availableColours.push(col);
      prevState.availableColours.sort();

      prevState.selectedCSV.splice(i, 1);
      prevState.plottedCSVFiles.splice(i, 1);

      return {};
    });
  };

  legendGenerator = () => {
    let labels = [];
    labels.push(
      <span key={'m'}>
        <Badge variant="primary" style={{ backgroundColor: '#FF0000' }}>
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
          <Row style={{ marginTop: '15px' }}>
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
