import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { GATEWAYSERVERIP } from '../../../dataServerEnv'

export default class UploadFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.driver = React.createRef();
        this.vehicle = React.createRef();
        this.state = {
            file: null,
            filename: "",
            showError: false,
            showEmpty: false,
            showFailure: false
        }
    }

    setFile = (newFiles) => {
        this.setState({
            file: newFiles[0],
            filename: newFiles[0].name
        })
    }

    uploadFile = () => {
        let driver = this.driver.current.value;
        let vehicle = this.vehicle.current.value;
        let filename = this.state.filename;
        if (driver === "" || vehicle === "") {
            this.setState({ showEmpty: true });
            return;
        }
        this.setState({ showEmpty: false});
        if (!this.state.file) return;

        const reader = new FileReader()

        reader.onload = (e) => {
            var formData = new FormData()
            formData.append('file', this.state.file)

            var meta = {
                driver: driver,
                car: vehicle,
                filename: filename
            }

            fetch(GATEWAYSERVERIP + '/historical/uploadFile/', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(response => {
                    let ID = response.ID;
                    fetch(GATEWAYSERVERIP + '/historical/updateMetadata', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(meta)
                    })
                        .then(res => {
                            this.props.addCSVBox(filename, driver, vehicle, ID);
                            this.setState({ showEmpty: false});
                            this.props.onHide();
                        })
                        .catch(err => {
                            this.props.onHide();
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        reader.readAsText(this.state.file)
    }

    render = () => {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} centered id='renameModal'>
                <Modal.Header closeButton>
                    <Modal.Title>Upload a CSV File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showError ?
                        <p style={{ color: 'red' }}>Please choose a '.CSV' file</p>
                        : null}
                    <div style={{ background: '#B0B0B0', border: '1px dashed', height: '500px' }}>
                        <Dropzone
                            accept='.csv'
                            multiple={false}
                            onDropRejected={() => this.setState({ showError: true })}
                            onDropAccepted={file => this.setFile(file)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} style={{ width: '100%', height: '100%' }}>
                                    <input {...getInputProps()} />
                                    <p style={{ textAlign: 'center' }}>Drag 'n' drop or click me</p>
                                    <p style={{ textAlign: 'center' }}>{this.state.filename}</p>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <Form.Group style={{ marginTop: '30px' }}>
                        <Form className="searchForm" style={{ marginBottom: '10px' }}>
                            <Form.Control style={{ textAlign: 'center' }}
                                className="searchFormControl"
                                autoComplete="on"
                                placeholder='Vehicle'
                                required
                                ref={this.vehicle}
                            />
                        </Form>
                        <Form className="searchForm" >
                            <Form.Control style={{ textAlign: 'center' }}
                                className="searchFormControl"
                                autoComplete="on"
                                placeholder='Driver'
                                required
                                ref={this.driver}
                            />
                        </Form>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.showFailure && <p style={{ textAlign: 'center' }}>Something went wrong. Ensure the name is not a duplicate.</p>}
                    <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.uploadFile}><b>Upload</b></Button>
                </Modal.Footer>
            </Modal>
        );
    }
}