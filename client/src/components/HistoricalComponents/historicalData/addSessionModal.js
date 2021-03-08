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
    this.name = React.createRef();
    this.state = {
      show: this.props.show,
      hide: this.props.hide,
      subteam: [],
    };
  }

  componentDidMount = () => {
  };

  submit = async () => {
    if(this.name.current.value !== '' && this.state.subteam.length !== 0)
    {
      let name = this.name.current.value;
      let subteam = this.state.subteam.join();

      this.props.submit(name, subteam);
      this.props.hide();
    }
  };


  onChangeSubteam = (selectedOption) => {
    this.state.subteam = [];
    selectedOption.forEach((selected) => {
      this.state.subteam.push(selected.value);
    });
  };

  render = () => {
    return (
    <Modal show={this.props.show} onHide={this.props.hide} centered className={modalStyling.addSessionModal}>
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
              ref={this.name}
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
