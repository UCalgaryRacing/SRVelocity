import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { GATEWAYSERVERIP } from '../../../../dataServerEnv'

export default class UploadFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            filename: "",
            showError: false
        }
    }

    setFile = (newFiles) => {
        this.setState({
            file: newFiles[0],
            filename: newFiles[0].name
        })
    }

    uploadFile = () => {
        this.props.onHide()
        if (!this.state.file) return;

        const reader = new FileReader()

        reader.onload = (e) => {
            var formData = new FormData()
            formData.append('file', this.state.file)

            fetch(GATEWAYSERVERIP + '/historical/uploadFile/', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        this.props.onHide()
                    } else {
                        this.props.onHide()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        reader.readAsText(this.state.file)
    }

    render = () => {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload a CSV File</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#B0B0B0', border: '1px dashed' }}>
                    {this.state.showError ?
                        <p style={{ color: 'red' }}>Please choose a '.CSV' file</p>
                        : null}
                    <Dropzone
                        accept='.csv'
                        multiple={false}
                        onDropRejected={() => this.setState({ showError: true })}
                        onDropAccepted={file => this.setFile(file)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p style={{ textAlign: 'center' }}>Drag 'n' drop or click me</p>
                                <p style={{ textAlign: 'center' }}>{this.state.filename}</p>
                            </div>
                        )}
                    </Dropzone>

                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.uploadFile}><b>Upload</b></Button>
                </Modal.Footer>
            </Modal>
        );
    }
}