import React, { useState } from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import Select from 'react-select';
import modalStyling from './_styling/modalStyling.module.css';

const subTeamOptions = [
  { value: 1, label: 'Frame & Body' },
  { value: 2, label: 'Suspension' },
  { value: 3, label: 'Powertrain' },
  { value: 4, label: 'Electrical' },
  { value: 5, label: 'Aero' },
];
export default class AddSessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subteam: [],
    };
  }

  resetState = () => {
    this.setState({name: '', subteam : []});
    this.props.hide();
  };

  submit = async () => {
    if(this.state.name !== '')
    {
      let subteam = this.state.subteam.join();

      this.props.submit(this.state.name, subteam);
      this.resetState();
    }
  };

  onChangeSubteam = (selectedOption) => {
    var subteamList = [];
    if(selectedOption == null)
      this.setState({subteams: subteamList})
    else
    {
    selectedOption.forEach((selected) => {
      subteamList.push(selected.value);
    });

    this.setState({subteam : subteamList})
    }
  };

  setName = (inputName) => {
    this.setState({name : inputName.target.value});
  };

  render = () => {
    return (
    <Modal show={this.props.show} onHide={this.resetState} centered className={modalStyling.addSessionModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Session</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form className="searchForm">
            <Form.Control
              className="searchFormControl"
              style={{ textAlign: 'center' }}
              placeHolder="Session Name"
              onChange={this.setName}
              required
            />
          </Form>
        </Form.Group>

        <Form.Label>Subteam</Form.Label>
        <Select
          isMulti
          name="subteams"
          options={subTeamOptions}
          onChange={this.onChangeSubteam}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className={modalStyling.submitButton} onClick={this.submit}>
          <b>Submit</b>
        </Button>
      </Modal.Footer>
    </Modal>
    );
  };
}
