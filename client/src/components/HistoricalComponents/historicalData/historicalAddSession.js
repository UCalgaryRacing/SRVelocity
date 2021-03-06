import React from 'react';
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import { useAlert } from 'react-alert'

function AlertHOC(Component) {
  return function WrappedComponent(props) {
    const alert = useAlert();
    return <Component {...props} alert={alert} />;
  };
}

class historicalAddSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      labels: this.props.labels,

      csvId: this.props.csvId,
      date: this.props.date,
      id: this.props.id,
      sessionName: this.props.sessionName,
      subteams: this.props.subteams,
    };
    this.formRefs = [];
    this.fields = [];
  }

  /*
  getDerivedStateFromProps(nextProps) {
    this.formRefs = [];
    this.fields = [];
    this.generateFields();
  }
*/
  componentWillReceiveProps(nextProps) {
    this.fromRefs = [];
    this.fields = [];
    this.generateFields();
  }

  componentDidMount = () => {
    this.generateFields();
  };

  setRef = (ref) => {
    this.formRefs.push(ref);
  };

  generateFields = () => {
    var i = 0;
    var margin = 40;
    while( i < this.state.labels.length) {
      this.fields.push(
        <div style={{ marginBottom: "-20px"}}>
          <div style={{ marginBottom: "40px"}}>
            <Form className="searchForm">
              <Form.Control
                style={{ textAlign: "center" }}
                className="searchFormControl"
                ref={this.setRef}
                autoComplete="on"
                placeHolder={this.state.labels[i]}
                key={i}
                required
                />
            </Form>
          </div>
        </div>
      );
      margin += 40;
      i++;
    }
    this.forceUpdate();
  };

  submit = () => {
    this.props.submit(this.csvId, this.date, this.id, this.name, this.subteam);
    this.props.toggleAddSession();
  }

  /*
  render = () => {
    return (
        <Modal show={this.props.show} 
        onHide={this.props.onHide}
        centered>
          <Modal.Header closeButton>
            <Modal.Title>Add a Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form className="searchForm">
                <Form.Control
                style={{ textAlign: 'center' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Name"
                required
                ref={this.name}
                />
              </Form>
            </Form.Group>
              {this.fields}
              <Button
                style={{
                  width: "100%",
                  height: "36px",
                  background: "#C22E2D",
                  borderColor: "#C22E2D",
                  marginTop: "10px",
                }}
                onClick={this.submit}
              >
                <b>Submit</b>
              </Button>
          </Modal.Body>
        </Modal>
    );
  };*/

  render = () => {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        centered
        id="renameModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload a CSV File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showError ? (
            <p style={{ color: 'red' }}>Please choose a '.CSV' file</p>
          ) : null}
          <div
            style={{
              background: '#B0B0B0',
              border: '1px dashed',
              height: '500px',
            }}
          >
          </div>
          <Form.Group style={{ marginTop: '30px' }}>
            <Form className="searchForm" style={{ marginBottom: '10px' }}>
              <Form.Control
                style={{ textAlign: 'center' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Vehicle"
                required
                ref={this.vehicle}
              />
            </Form>
            <Form className="searchForm">
              <Form.Control
                style={{ textAlign: 'center' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Driver"
                required
                ref={this.driver}
              />
            </Form>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {this.state.showFailure && (
            <p style={{ textAlign: 'center' }}>
              Something went wrong. Ensure the name is not a duplicate.
            </p>
          )}
          <Button
            style={{
              width: '100%',
              height: '36px',
              background: '#C22E2D',
              borderColor: '#C22E2D',
              marginTop: '10px',
            }}
            onClick={this.submit}
          >
            <b>Upload</b>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default AlertHOC(historicalAddSession);