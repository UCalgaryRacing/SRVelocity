
import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import CSVBox from './CSVBox';
import SessionBox from './SessionBox';
import { Button, Form, Jumbotron, Accordion, Card, ListGroup } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './_styling/historicalDash.css';


import firebase from 'firebase/app';
import 'firebase/database';
import fbApp from '../../../../src/config.js';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SessionFiles: [],
      csvId: [],
      date: [],
      id: [],
      sessionNames: [],
      subteam: [],
      sessionIDs: [],

      marginLeft: this.props.marginLeft,
    };
  }


  componentDidMount = () => {
    this.getSessions();
  };


  getSessions = () => {
    // Get a reference to the database service
    var database = fbApp.database();

    const rootRef = firebase.database().ref();
    const sessionRef = rootRef.child('Session');


    var sessionList = [];
    var date = new Date();
    let i = 0;
    //iterate through every session ID
    sessionRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //add the add the session keys to the sessionIDs array
        //this.state.sessionIDs.push(childSnapshot.key);
        /*
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
        */
        sessionList.push(
          <SessionBox
            csvId={childSnapshot.child('csvId').val()}
            //date={childSnapshot.child('date').val().toLocaleDateString()}
            date={childSnapshot.child('date').val()}
            id={childSnapshot.child('id').val()}
            sessionName={childSnapshot.child('name').val()}
            subteams={childSnapshot.child('subteam').val()}
            key={i}
            index={i}
          />
        );
        i++;
      });
    });
    this.setState({ SessionFiles : sessionList });
  }

/*
  addSessionBox = (csvId, date, id, sessionName, subteams) => {
    let sessionList = [...this.state.SessionFiles];
    sessionList.unshift(
      <SessionBox
        csvId={csvId}
        date={date}
        id={id}
        sessionName={sessionName}
        subteams={subteams}
        key={id}
        index={this.state.SessionFiles.length + 1}
      /> 
    );
    this.setState({ SessionFiles: sessionList }, this.forceUpdate());

    console.log("==========================================================================");
    console.log(this.state.SessionFiles);
  }*/

  /*
    addSessionBox = (sessionName, ID) => {
      let sessionFiles = [...this.state.Sessions];
      let date = new Date();
      sessionFiles.unshift(
        <SessionBox
        sessionName={sessionName}
        ID={ID}
        key={sessionName}
        index={this.state.Sessions.length + 1}
        />
      );
      this.setState({ Sessions: sessionFiles }, this.forceUpdate());
    };
  */

  render = () => {
    return (
      <div>
        <div>
          {this.state.SessionFiles}
        </div>
      </div>
    );
  };
}
