import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

export default class RenameFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: "",
            showRenameModal: this.props.showRenameModal
        }
    }

    componentDidUpdate = () => {
        if (this.props.showRenameModal !== this.state.showRenameModal) {
            this.setState({ showRenameModal: this.props.showRenameModal})
        }
    }
    
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value})
    }

    submitName = () => {
        this.props.renameFile(this.state.newName)
    }

    render = () => {
        return (
                <Modal show={this.state.showRenameModal} onHide={this.props.onHide} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Rename a File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please enter the new name for the file.
                        <Form.Group>
                            <Form.Control type="text" placeholder="New name" onChange={this.handleNameChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.submitName}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal> 
        );
    }
}