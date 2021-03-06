
import React from 'react';
import SessionBox from './SessionBox';
import { Button, Form, Jumbotron, Accordion, Card, ListGroup } from 'react-bootstrap';
import './_styling/Sessions.css';

import UploadFileModal from './uploadFileModal.js';

import firebase from 'firebase/app';
import 'firebase/database';
import fbApp from '../../../../src/config.js';
import historicalAddSession from './historicalAddSession';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SessionFiles: [],
      searchedSessionFiles: [],
      showSearched: false,
      showAddSession: false,

      marginLeft: this.props.marginLeft,
      
      testVar: 0,
    };
    this.sessionRef = this.getRef().child('Session');
  }


  componentDidMount = () => {
    this.getSessions();
  };

  getRef = () => {
    return fbApp.database().ref();
  }

  getSessions = () => {
    // Get a reference to the database service
    //const sessionRef = fbApp.database().ref().child('Session');

    this.renderSessionTable(this.sessionRef);
    this.forceUpdate();
  }

  renderSessionTable = (sessionRef) => {
    var sessionList = [];
    let i = 0;
    //iterate through every session ID
    sessionRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let date = new Date(childSnapshot.child('date').val() * 1);
        sessionList.push(
          <SessionBox
            csvId={childSnapshot.child('csvId').val()}
            date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
            //date={childSnapshot.child('date').val()}
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
    this.setState({ SessionFiles: sessionList });
  }

  toggleAddSession = () => {
    this.setState({ showAddSession: !this.state.showAddSession});
  };

  addSession = (csvId, date, id, name, subteam) => {
    this.getRef().child('Session/' + id).set({
      csvId: csvId,
      date: date,
      id: id,
      name: name,
      subteam: subteam
    });

    let box = (
      <SessionBox 
        csvId={csvId}
        date={date}
        id={id}
        sessionName={name}
        subteams={subteam}
      />
    );
    let temp = this.state.SessionFiles;
    this.insert(box, temp, 0, temp.length - 1);
    this.setState({ SessionFiles : temp })
  }

  
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
    }

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
      <div id="Sessions">
        {/*<div id="top"
          style={{
            position: 'fixed',
            top: '56px',
            right: '0',
            left: '0',
            zIndex: '999',
            height:
              this.state.typeOption === 'data' &&
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
              id="addSessionButton"
              onClick={() => {
                this.setState({ showAddSession: true})
              }}
            >
              <b>Add Session</b>
            </Button>
            &nbsp;&nbsp;
            </div>*/}
          <div>
          <div id="data">
            {this.state.showSearched ? this.state.searchedSessionFiles : this.state.SessionFiles}
            </div>
              {/*
            <historicalAddSession 
              submit={this.addSession}
              show={this.state.showAddSession}
              onHide={() => this.setState({ showAddSession: false })}
              //toggleAddSession={this.toggleAddSession}
              labels={["Name"], ["Subteam"]}
              title={"Add Session"}
            />
              */}
              <historicalAddSession 
                show={this.state.showAddSession}
                onHide={() => this.setState({ showAddSession : false})}
                addCSVBox={this.addSessionBox}
              />
          </div>
      </div>
    );
  };
}
