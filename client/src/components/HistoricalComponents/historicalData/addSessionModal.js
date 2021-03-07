import React from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import './_styling/addSessionModal.css';
import modalStyling from './_styling/modalStyling.module.css';

export default class AddSessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.subteam = React.createRef();

    this.state = {
      show: this.props.show,
      hide: this.props.hide,
    };
    this.forms = [];
    this.formData = [];
  }

  componentDidMount = () => {
    this.generateForms();
  };

  submit = async () => {
    let name = this.name.current.value;
    let subteam = this.name.current.value;

    this.props.submit(name, subteam);
    //this.props.submit(this.formData[0], this.formData[1]);
    this.props.hide();
  };

  setData = (ref) => {
    this.formData.push(ref);
  };

  generateForms = () => {
    var i = 0;
    for(i = 0; i < this.props.fields.length; i++)
    {
      this.forms.push(
        <div>
          <Form>
            <Form.Control
            ref={this.setData}
            autoComplete="on"
            placeHolder={this.props.fields[i]}
            key={i}
            required
            />
          </Form>
        </div>
      )
    }
  }

  render = () => {
    return (
      <>
      <Modal id="top" show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton className="header">
          <Modal.Title className="title">
            <b>Add Session</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={modalStyling.forms}>
            {/*{this.forms}*/}
              <Form.Group>
                <Form>
                  <Form.Control
                    autoComplete="on"
                    placeholder="Name"
                    ref={this.name}
                    required
                  />
                </Form>
                <Form>
                  <Form.Control 
                    autoComplete="on"
                    placeholder="Subteam"
                    ref={this.subteam}
                    required
                  />

                </Form>
              </Form.Group>


          </div>
          <Button className={modalStyling.submitButton} onClick={this.submit}>
            <b>Submit</b>
          </Button>
        </Modal.Body>
      </Modal>
      </>
    );
  };
}