import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styling/settingsM.css';

export default class SettingsM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    render = () => {
        return (
            <div id='settingsM'>
                <img src={require('../../../assets/settings.svg')} onClick={this.showModal} alt='Settings' />
                <Modal id='settingsModal' show={this.state.showModal} onHide={this.hideModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Settings
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}