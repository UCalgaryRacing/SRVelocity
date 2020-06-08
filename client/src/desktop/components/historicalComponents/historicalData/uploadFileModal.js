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
        if(!this.state.file) return;

        //const reader = new FileReader()
        //reader.onload = (e) => {
        // var formData = new FormData()
        // formData.append('file', this.state.file)
        //     fetch(GATEWAYSERVERIP + '/historical/uploadFile/', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'multipart/form-data'
        //         },
        //         body: formData
        //     })
        //     .then(response => {
        //         if(response.ok) {
        //             this.props.onHide()
        //         } else {
        //             this.props.onHide()
        //         }})
        //     .catch(err => {
        //         console.log(err)
        //     })
        // //}

        //reader.readAsText(this.state.file)
    }

    render = () => {
        return (
                <Modal show={this.props.show} onHide={this.props.onHide} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Upload a CSV File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.showError ?
                        <p style={{color: 'red'}}>Please enter a '.CSV' file</p>
                        :null}

                        <Dropzone 
                        accept='.csv' 
                        multiple={false}
                        onDropRejected={() => this.setState({showError: true})}
                        onDropAccepted={ file => this.setFile(file)}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop a file here, or click on me to select a file</p>
                                <p>File: {this.state.filename}</p>
                                </div>
                            )}
                            </Dropzone>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.uploadFile}>
                        Upload File
                      </Button>
                    </Modal.Footer>
                  </Modal> 
        );
    }
}