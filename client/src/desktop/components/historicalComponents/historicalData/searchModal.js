import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

export default class SearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            driver: "",
            car: ""
        }
    }

    submitSearch = () => {
        this.props.search(this.state.name, this.state.driver, this.state.car)
        this.props.onHide()
    }

    resetState = () => {
        this.setState({
            name: "",
            driver: "",
            car: ""
        })
    }

    render = () => {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} onShow={this.resetState} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Search for Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please fill out the following fields or leave some blank to not search for that attribute.
                        <Form.Group>
                        <Form.Control type="text" placeholder="File Name" onChange={event => this.setState({ name: event.target.value })} />
                        <Form.Control type="text" placeholder="Driver" onChange={event => this.setState({ driver: event.target.value })} />
                        <Form.Control type="text" placeholder="Car" onChange={event => this.setState({ car: event.target.value })} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.submitSearch}>
                        Search
                      </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}