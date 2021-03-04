import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import CSVBox from './CSVBox';
import sessionBox from './SessionBox';
import { Button, Form, Jumbotron, Accordion, Card, ListGroup } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './_styling/historicalDash.css';
import Dropdown from 'react-bootstrap/Dropdown';


import firebase from 'firebase/app';
import 'firebase/database';
//import { database } from '../../../config.js';

/*
var firebase = require('firebase/app');
require('firebase/database');
*/
const firebaseConfig = {
  apiKey: "AIzaSyA_rSnvjJ0IsGQymwTFqo5pqKNtVYobeuQ",
  authDomain: "schulich-velocity.firebaseapp.com",
  databaseURL: "https://schulich-velocity.firebaseio.com",
  projectId: "schulich-velocity",
  storageBucket: "schulich-velocity.appspot.com",
  messagingSenderId: "627030248616",
  appId: "1:627030248616:web:fd34df45c87f3a2a3b069d",
  measurementId: "G-ZSGK8C63GM"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

export default class HistoricalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Dash',
      marginLeft: this.props.marginLeft,
      toggleDash: false,
      CSVFiles: [],
      Sessions: [],
      showUploadModal: false,
      sideOpen: false,
      showSearched: false,
      searchedFiles: [],
      showSearchModal: false,
      view: true, 

      setOpen: false,
      open: false,

			//delete
      name: "",

      csvid: [],
      date: [],
      id: [],
      sessionNames: [],
      subteam: [],
      sessionIDs: [],
    };
    this.comments = [];
  }


	renderSession = () => {
		return(
    <div>
			{this.state.sessionNames.map(name => 
				<Jumbotron key={name}> 
						<h1><u>
								{name}
						</u></h1>
				</Jumbotron>)}
		</div>);
	}

  getSessionField = (sessionKey, field, ref) => {
    ref.on('value', (snapshot) => {
      this.setState({
        field: snapshot.child('Session').child(sessionKey).child(field).val()
      });
    });
  };

  componentDidMount = () => {
    this.getAllFiles();

    const rootRef = firebase.database().ref();
    const sessionRef = rootRef.child('Session');


    var sessionFiles = [];
    //iterate through every session ID
    sessionRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //add the add the session keys to the sessionIDs array
        this.state.sessionIDs.push(childSnapshot.key);
        var sessionKey = childSnapshot.key;

        var sessionName = childSnapshot.child('name').val();
        var sessionSubteam = childSnapshot.child('subteam').val();
        var sessionDate = childSnapshot.child('date').val();

				//var sessionDateFormatted = new Date(sessionDate)
				//sessionDateFormatted =  sessionDateFormatted.toLocaleDateString() + ' ' + sessionDateFormatted.toLocaleTimeString();
				var date = new Date(sessionDate * 1);

        this.state.sessionNames.push(sessionName);
        this.state.subteam.push(sessionSubteam);
				this.state.date.push(date.toLocaleDateString());


        sessionFiles.push(
            <sessionBox
                csvid={""}
                date={""}
                id={""}
                name={sessionName}
                subteam={sessionSubteam}
            />
        );

        rootRef.on('value', (snapshot) => {
          this.setState({
            sName: snapshot.child('Session').child(sessionKey).child('name').val(),
          });
        });
      });
    });
   
    //this.getSessionField('abdff979-6198-47de-b2af-ca5f6c5b33e0', 'name', rootRef);


   
    console.log("================================================\nNAME: " + this.state.name);
    console.log("SESSIONS =" + this.state.sessionIDs);
    console.log("ARRAY LENGTH: " + this.state.sessionIDs.length);
  };

  changeContent = (newContent) => {
    this.setState({ content: newContent });
    this.forceUpdate();
  };

  createSessionArray = () => {
    this.state.sessionAttributes.push(this.state.sessionIDS);
  }


  getAllFiles = () => {
    fetch(GATEWAYSERVERIP + '/historical/getFiles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        var files = [];
        let i = 0;
        for (var file of res) {
          let date = new Date(parseInt(file.metadata.date));
          files.push(
            <CSVBox
              filename={file.name}
              driver={file.metadata.driver}
              car={file.metadata.car}
              date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
              realDate={date}
              deleteFile={this.deleteFile}
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
        this.setState({ CSVFiles: files });
      })
      .catch((err) => {
        console.log(err);
      });
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
        deleteFile={this.deleteFile}
        ID={ID}
        key={filename}
        index={this.state.CSVFiles.length + 1}
      />
    );
    this.setState({ CSVFiles: files }, this.forceUpdate());
  };

  addSessionBox = (sessionName, ID) => {
    let sessionFiles = [...this.state.Sessions];
    let date = new Date();
    sessionFiles.unshift(
      <sessionBox
      sessionName={sessionName}
      ID={ID}
      key={sessionName}
      index={this.state.Sessions.length + 1}
      />
    );
    this.setState({ Sessions: sessionFiles }, this.forceUpdate());
  };

  deleteFile = (index) => {
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
    filtered.sort((a,b) => a.props.driver.toUpperCase() < b.props.driver.toUpperCase() ? -1 : 1 )
    this.setState({ CSVFiles: filtered })
  };

  sortByOldestDate = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a,b) => a.props.realDate < b.props.realDate ? -1 : 1 )
    this.setState({ CSVFiles: filtered })
  };

  sortByNewestDate = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a,b) => a.props.realDate < b.props.realDate ? 1 : -1 )
    this.setState({ CSVFiles: filtered })
  };

  sortByFileNameA = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a,b) => a.props.filename.toUpperCase() < b.props.filename.toUpperCase() ? -1 : 1 )
    this.setState({ CSVFiles: filtered })
  };

  sortByFileNameZ = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a,b) => a.props.filename.toUpperCase() < b.props.filename.toUpperCase() ? 1 : -1 )
    this.setState({ CSVFiles: filtered })
  };

  sortByVehicle = () => {
    var filtered = [...this.state.CSVFiles];
    filtered.sort((a,b) => a.props.car.toUpperCase() < b.props.car.toUpperCase() ? -1 : 1 )
    this.setState({ CSVFiles: filtered })
  };

  changeView = () => {
    this.setState((prevState) => ({view: !prevState.view}))
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
          <Button id="toggleButton" onClick={this.changeView}>
            <b>Toggle View</b>
          </Button>
          &nbsp;&nbsp;
          <Dropdown style={{left: '370px', top: '-36px'}}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
            <b>Sort by</b>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={this.sortByOldestDate}>Date Added (Oldest)</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={this.sortByNewestDate}>Date Added (Newest)</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={this.sortByDriver}>Driver</Dropdown.Item>
              <Dropdown.Item href="#/action-4" onClick={this.sortByVehicle}>Vehicle</Dropdown.Item>
              <Dropdown.Item href="#/action-5" onClick={this.sortByFileNameA}>File Name (A-Z)</Dropdown.Item>
              <Dropdown.Item href="#/action-6" onClick={this.sortByFileNameZ}>File Name (Z-A)</Dropdown.Item>
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
            />
          </Form>
        </div>
        <div id="data">
          <UploadFileModal
            show={this.state.showUploadModal}
            onHide={() => this.setState({ showUploadModal: false })}
            addCSVBox={this.addCSVBox}
            addSessionBox={this.addSessionBox}
          />
          {this.state.view ? 
          
          (this.state.showSearched
            ? this.state.searchedFiles
            : this.state.CSVFiles) : this.state.Sessions}
            {/* {this.state.Sessions} */}
        </div>
        <div>
            {/*
          <Jumbotron>
            <h1 id="sessionName">{this.state.name}</h1>
            <h5>Date: {this.state.date}</h5>
            <h5>Subteam(s): {this.state.subteam}</h5>
            {/*
            <p>
              <ListGroup>
                <ListGroup.Item>
                  <Button variant="outline-dark" size="lg" block>CSV0</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="outline-dark" size="lg" block>CSV1</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="outline-dark" size="lg" block>CSV2</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="outline-dark" size="lg" block>CSV3</Button>
                </ListGroup.Item>
                </ListGroup>
            </p> */}
            {/*
            <p>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Button} variant="outline-dark" size="lg" eventKey="0">
                    CSV0 Name = {this.state.name}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>CSV0 Information</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Button} variant="outline-dark" size="lg" eventKey="0">
                    CSV1 Name
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>CSV1 Information</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button variant="primary">Learn more</Button>
            </p>
            </Jumbotron>*/}
            {/*
          <div>
              {this.state.sessionIDs.map(session => 
                <Jumbotron key={session}> 
                    <h1>
                        {session} 
                    </h1>
                </Jumbotron>)}
              </div>*/}
							{/*
          <div>
              {this.state.sessionNames.map(name => 
                <Jumbotron key={name}> 
                    <h1><u>
                        {name}
                    </u></h1>
              {this.state.subteam.map(teams =>
              <h3 key={teams}>
                  {teams}
              </h3>
              )}
                </Jumbotron>)}
							</div>*/}
					<div>
						{[...this.state.sessionNames].map((x,i) =>
						<Jumbotron key={i}> 
							<h1><u>
								{this.state.sessionNames[i]}
							</u></h1>
							<h4>
								Subteam: {this.state.subteam[i]}
							</h4>
							<h4>
								Date: {this.state.date[i]}
							</h4>
						</Jumbotron>
						)}
					</div>
        </div>
      </div>
    );
  };
}
