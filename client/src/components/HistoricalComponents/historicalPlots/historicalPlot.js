import React from 'react';
import Select from 'react-select';
import { Row, Col, Container, Button, Modal, Badge } from 'react-bootstrap';
import ScatterPlot from './historicalGraphComponents/scatterPlot';
import CSVoption from './CSVoption';
import { readString } from 'react-papaparse';
import './historicalPlot.css';

import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import { fetchWrapper } from '../../fetchWrapper';

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
    let temp = this.state.currentCSV.fields.map((field) => {
      return { value: field, label: field };
    });
    this.setState({
      options: temp,
    });
  };

  handleYChange = async (selectedOption) => {
    const tempData = await this.checkCache(
      this.props.currentCSVid,
      this.props.currentCSVname,
      selectedOption.value
    );

    console.log(this.cache);

    const promises = this.state.selectedCSV.map(async (csv) => {
      csv.yData = await this.checkCache(csv.id, csv.name, selectedOption.value);
    });

    Promise.all(promises).then(() => {
      this.setState({
        yAxis: selectedOption,
        yData: tempData,
      });
    });
  };

  handleXChange = async (selectedOption) => {
    const tempData = await this.checkCache(
      this.props.currentCSVid,
      this.props.currentCSVname,
      selectedOption.value
    );

    // console.log(this.cache);

    const promises = this.state.selectedCSV.map(async (csv) => {
      csv.xData = await this.checkCache(csv.id, csv.name, selectedOption.value);
    });

    Promise.all(promises).then(() => {
      this.setState({
        xAxis: selectedOption,
        xData: tempData,
      });
    });
  };

  checkCache = async (id, filename, col_name) => {
    const hasCol = this.cache
      .get(id)
      .findIndex((data) => data.name === col_name);

    let data = null;
    if (hasCol === -1) {
      data = await this.initCSVCacheData(id, filename, col_name);
    } else {
      const cache = this.cache.get(id);
      data = cache[hasCol].values;

      cache.unshift(cache[hasCol]);
      this.cache.get(id).splice(hasCol, 1);
    }

    return data;
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
      let res = await fetchWrapper.get(
        GATEWAYSERVERIP + '/historical/getColumn/' + id + '/' + col_name
      );
      let resJson = await res.json();
      let resData = resJson.map(Number);

      // Cache managemnt
      if (this.cache.get(id).length === 3) {
        const last = this.cache.get(id).pop();
      }

      // Push to the front of array
      this.cache.get(id).unshift({
        name: col_name,
        values: resData,
      });
      return resData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  addCompareCSV = (filename, id) => {
    this.handleClose();

    if (this.state.selectedCSV.length === 2) return;

    this.cache.set(id, []); // Add to cache

    let xData = [];
    let yData = [];
    if (this.state.xAxis) {
      xData = this.initCSVCacheData(id, filename, this.state.xAxis.label);
    }
    if (this.state.yAxis) {
      yData = this.initCSVCacheData(id, filename, this.state.yAxis.label);
    }

    Promise.all([xData, yData])
      .then((values) => {
        this.setState(function (prevState, props) {
          prevState.selectedCSV.push({
            name: filename,
            id: id,
            xData: values[0],
            yData: values[1],
            color: prevState.availableColours.shift(),
          });
          prevState.plottedCSVFiles.push(id);
          return {};
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeCSV = (e) => {
    const i = e.currentTarget.getAttribute('data-value');
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
      <div id="historicalPlot">
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
              <Button id="addButton" onClick={this.handleShow}>
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
