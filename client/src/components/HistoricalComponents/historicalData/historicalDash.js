import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import CSVBox from './CSVBox';
import sessionRenderer from './Session';
import { Button, Form } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './_styling/historicalDash.css';

var _ = require('lodash');

export default class HistoricalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Dash',
      marginLeft: this.props.marginLeft,
      toggleDash: false,
      CSVFiles: [],
      sessions: [],
      showUploadModal: false,
      sideOpen: false,
      showSearched: false,
      searchedFiles: [],
      showSearchModal: false,
    };
    this.comments = [];
  }

  componentDidMount = () => {
    this.getAllFiles();
  };

  changeContent = (newContent) => {
    this.setState({ content: newContent });
    this.forceUpdate();
  };

  getAllFiles = async () => {
    try {
      let csvFiles = await this.getCSVFiles();
      let sessions = await this.getSessions();

      this.setState({
        CSVFiles: csvFiles,
        sessions: sessions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getSessions = async () => {
    try {
      const rawSession = await fetch(GATEWAYSERVERIP + '/session/getSessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const csvSessions = await rawSession.json();
      return sessionRenderer(csvSessions);
    } catch (error) {
      throw error;
    }
  };

  getCSVFiles = async () => {
    try {
      const rawCSV = await fetch(GATEWAYSERVERIP + '/historical/getFiles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const csvJson = await rawCSV.json();

      var files = [];
      let i = 0;
      for (var file of csvJson) {
        let date = new Date(parseInt(file.metadata.date));
        files.push(
          <CSVBox
            filename={file.name}
            driver={file.metadata.driver}
            car={file.metadata.car}
            date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
            realDate={date}
            deleteFile={this.deleteCSV}
            ID={file.metadata.id}
            key={i}
            index={i}
          />
        );
        i++;
      }
      files.sort(function (a, b) {
        //Newest first
        var tempA = b.props.realDate;
        var tempB = a.props.realDate;
        if (tempA > tempB) return 1;
        else if (tempA < tempB) return -1;
        else return 0;
      });
      return files;
    } catch (error) {
      throw error;
    }
  };

  addCSVBox = (filename, driver, vehicle, ID) => {
    let files = [...this.state.CSVFiles];
    let date = new Date();
    files.unshift(
      <CSVBox
        filename={filename}
        driver={driver}
        car={vehicle}
        date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
        realDate={date}
        deleteFile={this.deleteCSV}
        ID={ID}
        key={filename}
        index={this.state.CSVFiles.length + 1}
      />
    );
    this.setState({ CSVFiles: files }, this.forceUpdate());
  };

  deleteCSV = (index) => {
    this.setState({
      CSVFiles: this.state.CSVFiles.filter(
        (file) => file.props.index !== index
      ),
    });
  };

  insert = (box, temp, startIndex, endIndex) => {
    var length = temp.length;
    var start = typeof startIndex != 'undefined' ? startIndex : 0;
    var end = typeof endIndex != 'undefined' ? endIndex : length - 1;
    var m = start + Math.floor((end - start) / 2);

    if (length === 0) {
      temp.push(box);
      return;
    }
    if (
      box.props.values[0].toUpperCase() >
      temp[end].props.values[0].toUpperCase()
    ) {
      temp.splice(end + 1, 0, box);
      return;
    }
    if (
      box.props.values[0].toUpperCase() <
      temp[start].props.values[0].toUpperCase()
    ) {
      temp.splice(start, 0, box);
      return;
    }
    if (start >= end) {
      return;
    }
    if (
      box.props.values[0].toUpperCase() < temp[m].props.values[0].toUpperCase()
    ) {
      this.insert(box, temp, start, m - 1);
      return;
    }
    if (
      box.props.values[0].toUpperCase() > temp[m].props.values[0].toUpperCase()
    ) {
      this.insert(box, temp, m + 1, end);
      return;
    }
  };

  search = (e) => {
    e.preventDefault();
    const text = e.target.value;
    if (text === '') {
      this.setState({ showSearched: false });
      return;
    }
    var filtered = [...this.state.CSVFiles];
    function filterParam(param, value) {
      return filtered.filter((file) =>
        file.props[param].toLowerCase().includes(value.toLowerCase())
      );
    }
    var fileFilter = filterParam('filename', text);
    var driverFilter = filterParam('driver', text);
    var carFilter = filterParam('car', text);
    var dateFilter = filterParam('date', text);
    let temp1 = _.unionBy(fileFilter, driverFilter, 'key');
    let temp2 = _.unionBy(carFilter, dateFilter);
    filtered = _.unionBy(temp1, temp2, 'key');
    this.setState({
      searchedFiles: filtered,
      showSearched: true,
    });
  };

  render = () => {
    return (
      <div id="historicalDash">
        <div
          id="top"
          style={{
            position: 'fixed',
            top: '56px',
            right: '0',
            left: '0',
            zIndex: '999',
            height:
              this.state.typeOption === 'plotting' &&
              this.state.showBottomNav &&
              window.innerWidth < 1000
                ? '102px'
                : '56px',
            paddingLeft: 'calc(' + this.props.marginLeft + ' + 10px)',
            paddingTop: '10px',
            background: '#F5F5F5',
            borderColor: '#C22D2D',
            borderWidth: '0',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <Button
            id="uploadButton"
            onClick={() => {
              this.setState({ showUploadModal: true });
            }}
          >
            <b>Upload CSV</b>
          </Button>
          &nbsp;&nbsp;
          <Button id="sortButton" onClick={this.changeType}>
            <b>Sort Data</b>
          </Button>
          &nbsp;&nbsp;
          <Form
            className="searchForm"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <Form.Control
              onChange={this.search}
              className="searchFormControl"
              ref={this.emailForm}
              autoComplete="on"
              placeHolder="Search"
              required
            />
          </Form>
        </div>
        <div id="data">
          <UploadFileModal
            show={this.state.showUploadModal}
            onHide={() => this.setState({ showUploadModal: false })}
            addCSVBox={this.addCSVBox}
          />
          {this.state.sessions}
          {/* {this.state.showSearched
            ? this.state.searchedFiles
            : this.state.CSVFiles} */}
        </div>
      </div>
    );
  };
}
