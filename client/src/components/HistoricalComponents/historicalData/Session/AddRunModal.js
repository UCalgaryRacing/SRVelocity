import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import classes from './styles/editModal.module.css';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv';

export default function AddRunModal({ show, onHide, onSubmit, runs }) {
  const [selection, setSelection] = useState({ csvs: [], isFetching: true });
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (show) {
      fetchingCSVs();
    } else {
      setSelection({ csvs: [], isFetching: false });
      setSelectedId('');
    }
  }, [show]);

  const onChange = (e) => {
    e.preventDefault();
    setSelectedId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedId !== '') {
      onSubmit(selectedId);
    } else {
      onHide();
    }
  };

  const fetchingCSVs = async () => {
    try {
      setSelection({ csvs: [], isFetching: true });
      const rawCSV = await fetch(GATEWAYSERVERIP + '/historical/getFiles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const csvJson = await rawCSV.json();
      setSelection({ csvs: csvJson, isFetching: false });
    } catch (error) {
      console.log(error);
      setSelection({ csvs: [], isFetching: false });
    }
  };

  const renderOption = () => {
    let options = [];
    let runIds = runs.length === 0 ? [] : runs.map((run) => run.id);
    options.push(<option key={-1} value=""></option>);
    selection.csvs.forEach((csv, i) => {
      if (!runIds.includes(csv.metadata.id)) {
        options.push(
          <option value={csv.metadata.id} key={i}>
            {csv.name}
          </option>
        );
      }
    });

    return options;
  };

  return (
    <Modal show={show} onHide={onHide} centered className={classes.editModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Run</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        <Form.Group>
          <Form.Label>Run</Form.Label>
          {selection.isFetching ? (
            'Loading...'
          ) : (
            <Form className="searchForm">
              <Form.Control
                className="searchFormControl"
                as="select"
                onChange={onChange}
                placeholder="Choose a subteam..."
                //   onChange={handleNameChange}
              >
                {renderOption()}
              </Form.Control>
            </Form>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className={classes.submitBtn} onClick={handleSubmit}>
          <b>Submit</b>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
