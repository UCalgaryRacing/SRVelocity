import React from 'react';
import { Button, Jumbotron, ListGroup } from 'react-bootstrap';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import './_styling/SessionBox.css';
import download from 'downloadjs';
import RenameFileModal from './renameFileModal';
import Quill from './quill';
import Comment from './comment';

export default class sessionBox extends React.Component {
import { Button, Form, Jumbotron, Accordion, Card, ListGroup } from 'react-bootstrap';
import './_styling/SessionBox.css';
/*
import firebase from 'firebase/app'
import 'firebase/database';

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
*/
export default class SessionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvId: this.props.csvId,
      date: this.props.date,
      id: this.props.id,
      sessionName: this.props.sessionName,
      subteams: this.props.subteams,
    };

    this.info = [];
  }


  componentWillMount = () => {
    this.generateBox();
  }

  generateBox = () => {
    var labels = ["Subteam", "Date", "id", "csvid"];
    var values = [this.state.subteams, this.state.date, this.state.id, this.state.csvid];

    var i = 0;
    var margin = 30;
    while(i < labels.length) {
      this.info.push(
        <div id="column" style={{marginTop: margin + "px" }} >
          <div id="label">{labels[i]}:&nbsp;</div>
          <div id="subfields">{values[i]}</div>
        </div>
      );
      margin += 30;
      i++
    }
    this.info.push(
      <div id="column" style={{ marginTop: margin + "px" }}>
        {this.props.children}
      </div>
    )
    this.forceUpdate();
  }

  nameSession = (name) => {
    this.state.name = name;
  }

  createSession = () => {

  };

  renameSession = (newName, id) => {

  };

  deleteSession = () => {

  };

  addRun = () => {

  }

  render = () => {
    return (
      <div id="SessionBox">
        <Jumbotron>
          <h1>
            {this.state.name}
          </h1>
          <h2>
            Subteams: {this.state.subteams}
          </h2>
        </Jumbotron>
      <div>
        <div id='SessionBox'>
          <Jumbotron className='box'>
            <div className='sessionName' style={{ marginTop: this.margin + "px", cursor: "pointer"}}><u>
              {this.state.sessionName}
            </u></div>
            <div id='subfields'
            style={{
            height: '36px',
            position: 'absolute',
            lineHeight: '36px',
            fontSize: '20px',
            }}
            >
              <div className='subteam'> <span className='label-span'>Subteam:</span> {this.state.subteams} </div>
              <div className='date'> <span className='label-span'>Date: </span>{this.state.date} </div>
              <div className='id'> <span className='label-span'>id: </span>{this.state.id} </div>
              <div className='csvId'> <span className='label-span'> csvId: </span>{this.state.csvId} </div>
            </div>
            <div>
            </div>
          </Jumbotron>
          <Button 
            id="boxButton"
            style={{ position: 'absolute', right: '20px', marginTop: '-245px' }}
          >
            <img
            id="logoImg"
            width="27px"
            style={{
              marginTop: '-14px',
              marginLeft: '-13px',
              position: 'absolute',
            }}
            //placeholder, change this
            src={require('../../../assets/edit.svg')}
            />
          </Button>
          <Button 
            id="boxButton"
            style={{ position: 'absolute', right: '20px', marginTop: '-199px' }}
          >
            <img
            id="logoImg"
            width="27px"
            style={{
              marginTop: '-14px',
              marginLeft: '-13px',
              position: 'absolute',
            }}
            //placeholder, change this
            src={require('../../../assets/edit.svg')}
            />
          </Button>
          <Button 
            id="boxButton"
            style={{ position: 'absolute', right: '20px', marginTop: '-153px' }}
          >
            <img
            id="logoImg"
            width="27px"
            style={{
              marginTop: '-14px',
              marginLeft: '-13px',
              position: 'absolute',
            }}
            //placeholder, change this
            src={require('../../../assets/edit.svg')}
            />
          </Button>
        </div>
      </div>
    );
  };
}