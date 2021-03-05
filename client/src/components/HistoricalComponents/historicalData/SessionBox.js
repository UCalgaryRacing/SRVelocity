import React from 'react';
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

      sessionIDS: [],

      apples: 0,
    };
  }

  componentDidMount = () => {
    /*
    const rootRef = firebase.database().ref();
    const sessionRef = rootRef.child('Session');

    var sessionFiles = [];
    //iterate through every session ID
    sessionRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //add the add the session keys to the sessionIDs array
        //this.state.sessionIDs.push(childSnapshot.key);
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

      });
    });
    */
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
      <div id='SessionBox'>
        <Jumbotron className='box'>
          <h1 className='sessionName'><u>
            {this.state.sessionName}
          </u></h1>
          <h4 id='subfields'>
            <p className='subteam'> <span className='subteam-span'>Subteam:</span> {this.state.subteams} </p>
            <p className='date'> Date: {this.state.date} </p>
            <p className='id'> id: {this.state.id} </p>
            <p className='csvId'> csvId: {this.state.csvId} </p>
          </h4>
        </Jumbotron>
      </div>
    );
  };
}