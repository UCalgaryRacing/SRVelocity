import React from 'react';
import { Modal, Button } from "react-bootstrap";

export default class ConfirmationModal extends React.Component {
    showModal = () => {
        this.props.hideModal();
    };

    render = () => {
        return (
            <Modal
                id="newForumModal"
                show={this.props.showModal}
                onHide={this.props.hideModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <b style={{ fontSize: "25px" }}>Are you sure?</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "17px" }}>
                    Deletion of&nbsp;{this.props.name} will be permanent.
                    <br />
                    <br />
                    <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.props.delete}><b>Delete</b></Button>
                    <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.props.hideModal}><b>Cancel</b></Button>
                </Modal.Body>
            </Modal>
        );
    }
}