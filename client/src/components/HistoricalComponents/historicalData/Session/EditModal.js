import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import classes from './styles/editModal.module.css';

const subTeamOptions = [
  { value: 1, label: 'Frame & Body' },
  { value: 2, label: 'Suspension' },
  { value: 3, label: 'Powertrain' },
  { value: 4, label: 'Electrical' },
  { value: 5, label: 'Aero' },
];

export default function EditModal({
  show,
  currName,
  currSubteams,
  onHide,
  onSubmit,
}) {
  const [name, setName] = useState('');

  const [subteams, setSubteams] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const getValueFromSubteam = (subteams) => {
    let names = subteams.split(',');
    let values = [];
    names.forEach((num) => {
      values.push(subTeamOptions[parseInt(num) - 1]);
    });
    return values;
  };

  const getSubteamFromValue = (selectedValues) => {
    let subteam = [];
    selectedValues.forEach((selected) => {
      subteam.push(selected.value);
    });

    return subteam.join();
  };

  const onChangeSubteam = (selectedOption) => {
    setSubteams(getSubteamFromValue(selectedOption));
  };

  const handleSubmit = () => {
    let newSubteams = subteams === '' ? currSubteams : subteams;
    let newName = name === '' ? currName : name;
    if (name !== '' || subteams !== '') {
      onSubmit(newName, newSubteams);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className={classes.editModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Session</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form className="searchForm">
            <Form.Control
              className="searchFormControl"
              style={{ textAlign: 'center' }}
              placeholder={currName}
              required
              onChange={handleNameChange}
            />
          </Form>
        </Form.Group>

        <Form.Label>Subteam</Form.Label>
        <Select
          isMulti
          defaultValue={getValueFromSubteam(currSubteams)}
          name="subteams"
          options={subTeamOptions}
          onChange={onChangeSubteam}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className={classes.submitBtn} onClick={handleSubmit}>
          <b>Submit</b>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
