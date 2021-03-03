import React from 'react';
import { Button, Jumbotron, ListGroup } from 'react-bootstrap';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import './_styling/sessionBox.css';
import download from 'downloadjs';
import RenameFileModal from './renameFileModal';
import Quill from './quill';
import Comment from './comment';

export default class sessionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvid: this.props.csvid,
      date: this.props.date,
      id: this.props.date,
      name: this.props.name,
      subteams: this.props.subteams,
    };
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
      <div>
        <Jumbotron>
          <h1>
            {this.state.name}
          </h1>
          <h2>
            Subteams: {this.state.subteams}
          </h2>
        </Jumbotron>
      </div>

    );
  };
}