import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import CSVBox from './CSVBox';
import sessionRenderer from './Session';
import { Button, Form, Dropdown } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './_styling/historicalDash.css';
import AddSessionModal from './addSessionModal.js';
import fetch from 'node-fetch';

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
      showAddSessionModal: false,
      sideOpen: false,
      showSearched: false,
      searchedFiles: [],
      showSearchModal: false,
      view: true,
      setOpen: false,
      open: false,
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
      return sessionRenderer(
        csvSessions,
        this.onEditSession,
        this.deleteSession
      );
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

  addSession = async (name, subteam) => {
    let body = {
      name: name,
      subteam: '1,2,3',
    };

    try {
      let res = await fetch(GATEWAYSERVERIP + '/session/createSession', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      res = await res.json();

      let newSessions = await this.getSessions();
      this.setState({ sessions: newSessions });
    } catch (error) {
      //TODO: should catch specific error instead of general error
      //the error could occur while retrieving sessions
      console.log(error);
    }
  };

  deleteSession = async (id) => {
    let body = {
      sessionId: id,
    };

    try {
      let res = await fetch(GATEWAYSERVERIP + '/session/deleteSession', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        //TODO: Send all the sessions instead of queryng for them again?
        let newSessions = await this.getSessions();
        this.setState({ sessions: newSessions });
      } else {
        //TODO: find a better way to handle errors
        throw 'Something went wrong with deleting';
      }
    } catch (error) {
      //TODO: should catch specific error instead of general error
      //the error could occur while retrieving sessions
      console.log(error);
    }
  };

  onEditSession = async () => {
    let newSessions = await this.getSessions();
    this.setState({ sessions: newSessions });
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

  toggleAddSession = () => {
    this.setState({ showAddSessionModal: !this.state.showAddSessionModal });
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
    // let temp1 = _.unionBy(fileFilter, driverFilter, 'key');
    //let temp2 = _.unionBy(carFilter, dateFilter);
    //filtered = _.unionBy(temp1, temp2, 'key');
    this.setState({
      searchedFiles: filtered,
      showSearched: true,
    });
  };

  sortByDriver = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) =>
      a.props.driver.toUpperCase() < b.props.driver.toUpperCase() ? -1 : 1
    );
    this.setState({ CSVFiles: filtered });
  };

  sortByOldestDate = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) => (a.props.realDate < b.props.realDate ? -1 : 1));
    this.setState({ CSVFiles: filtered });
  };

  sortByNewestDate = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) => (a.props.realDate < b.props.realDate ? 1 : -1));
    this.setState({ CSVFiles: filtered });
  };

  sortByFileNameA = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) =>
      a.props.filename.toUpperCase() < b.props.filename.toUpperCase() ? -1 : 1
    );
    this.setState({ CSVFiles: filtered });
  };

  sortByFileNameZ = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) =>
      a.props.filename.toUpperCase() < b.props.filename.toUpperCase() ? 1 : -1
    );
    this.setState({ CSVFiles: filtered });
  };

  sortByVehicle = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a, b) =>
      a.props.car.toUpperCase() < b.props.car.toUpperCase() ? -1 : 1
    );
    this.setState({ CSVFiles: filtered });
  };

  changeView = () => {
    this.setState((prevState) => ({ view: !prevState.view }));
  };

  render = () => {
    return (
      <div id="historicalDash">
        <div></div>
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
          <Button id="toggleButton" onClick={this.changeView}>
            <b>Toggle View</b>
          </Button>
          &nbsp;&nbsp;
          <Button id="addSessionButton" onClick={this.toggleAddSession}>
            <b>Add Session</b>
          </Button>
          &nbsp;&nbsp;
          <Dropdown style={{ left: '480px', top: '-36px' }}>
            <Dropdown.Toggle
              variant="danger"
              id="dropdown-basic"
              id="sortDropdown"
            >
              <b>Sort by</b>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={this.sortByOldestDate}>
                Date Added (Oldest)
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={this.sortByNewestDate}>
                Date Added (Newest)
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={this.sortByDriver}>
                Driver
              </Dropdown.Item>
              <Dropdown.Item href="#/action-4" onClick={this.sortByVehicle}>
                Vehicle
              </Dropdown.Item>
              <Dropdown.Item href="#/action-5" onClick={this.sortByFileNameA}>
                File Name (A-Z)
              </Dropdown.Item>
              <Dropdown.Item href="#/action-6" onClick={this.sortByFileNameZ}>
                File Name (Z-A)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
              disabled={!this.state.view}
            />
          </Form>
        </div>
        <div id="data">
          <UploadFileModal
            show={this.state.showUploadModal}
            onHide={() => this.setState({ showUploadModal: false })}
            addCSVBox={this.addCSVBox}
          />
          <AddSessionModal
            show={this.state.showAddSessionModal}
            hide={this.toggleAddSession}
            fields={['Name', 'Subteam']}
            submit={this.addSession}
          />
          {this.state.view
            ? this.state.showSearched
              ? this.state.searchedFiles
              : this.state.CSVFiles
            : this.state.sessions}
        </div>
      </div>
    );
  };
}
