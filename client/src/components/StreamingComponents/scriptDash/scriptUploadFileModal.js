import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import fileIcon from '../../../assets/fileIcon.svg';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import { fetchWrapper } from '../../fetchWrapper';

class ScriptUploadFileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      filename: '',
      showError: false,
      showEmpty: false,
      showFailure: false,
    };
    this.scriptName = React.createRef();
    this.description = React.createRef();
    this.authorName = React.createRef();
  }

  setFile = (newFiles) => {
    this.setState({
      file: newFiles[0],
      filename: newFiles[0].name,
    });
  };

  uploadFile = () => {
    let filename = this.state.filename;

    this.setState({ showEmpty: false });
    if (!this.state.file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      var formData = new FormData();
      formData.append('file', this.state.file);

      var meta = {
        filename: filename,
      };

      //Call fetch here
    };

    reader.readAsText(this.state.file);
  };

  render = () => {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        centered
        id="renameModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload a Matlab Script File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showError ? (
            <p style={{ color: 'red' }}>Please choose a '.m' file</p>
          ) : null}
          <div
            style={{
              backgroundColor: '#B0B0B0',
              border: '1px dashed',
              height: '150px',
              backgroundImage: `url(${fileIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          >
            <Dropzone
              accept=".m"
              multiple={false}
              onDropRejected={() => this.setState({ showError: true })}
              onDropAccepted={(file) => this.setFile(file)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    margin: 0,
                  }}
                >
                  <input {...getInputProps()} />
                  <p
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <b>Drag 'n' drop or click me</b>
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    <b>{this.state.filename}</b>
                  </p>
                </div>
              )}
            </Dropzone>
          </div>
          <Form style={{ marginTop: '30px' }}>
            <Form.Group className="searchForm" style={{ marginBottom: '10px' }}>
              <Form.Control
                style={{ textAlign: 'center' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Script Name"
                required
                ref={this.scriptName}
              />
            </Form.Group>
            <Form.Group className="searchForm" style={{ marginBottom: '10px' }}>
              <Form.Control
                style={{ textAlign: 'center' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Author of Script"
                required
                ref={this.authorName}
              />
            </Form.Group>
            <Form.Group className="searchForm">
              <Form.Control
                style={{ textAlign: 'left' }}
                className="searchFormControl"
                autoComplete="on"
                placeholder="Description"
                ref={this.description}
                as="textarea"
              />
            </Form.Group>
          </Form>
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
            onClick={this.uploadFile}
          >
            <b>Upload</b>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}
export default ScriptUploadFileModal;
