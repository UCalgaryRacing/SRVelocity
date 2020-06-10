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
            this.setState({ showRenameModal: this.props.showRenameModal })
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    submitName = () => {
        this.props.renameFile(this.state.newName)
    }

    render = () => {
        return (
            <Modal show={this.state.showRenameModal} onHide={this.props.onHide} centered id='renameModal'>
                <Modal.Header closeButton>
                    <Modal.Title>Rename This File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form className="searchForm" >
                            <Form.Control style={{ textAlign: 'center' }}
                                className="searchFormControl"
                                autoComplete="on"
                                placeholder={this.props.currentName}
                                required
                                onChange={this.handleNameChange}
                            />
                        </Form>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.submitName}><b>Submit Name</b></Button>
                </Modal.Footer>
            </Modal>
        );
    }
}