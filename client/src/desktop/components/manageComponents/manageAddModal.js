import React from 'react';
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import "./manageAddModal.css";

export default class ManageAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            labels: this.props.labels
        }
        this.formRefs = [];
        this.fields = [];
    }

    componentWillReceiveProps(nextProps) {
        this.formRefs = [];
        this.fields = [];
        this.generateFields();
    }

    componentDidMount = () => {
        this.generateFields();
    }

    setRef = (ref) => {
        this.formRefs.push(ref);
    }

    generateFields = () => {
        var i = 0;
        var margin = 40;
        while (i < this.state.labels.length) {
            this.fields.push(
                <div style={{ marginBottom: '-20px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <Form className="searchForm" >
                            <Form.Control style={{ textAlign: 'center' }}
                                className="searchFormControl"
                                ref={this.setRef}
                                autoComplete="on"
                                placeHolder={this.state.labels[i]}
                                key={i}
                                required
                            />
                        </Form>
                    </div>
                </div>
            );
            margin += 40;
            i++;
        }
        this.forceUpdate();
    }

    submit = async () => {
        //Need to check types
        let data = [];
        for (var form of this.formRefs) data.push(form.value);
        this.props.submit(data);
        this.props.toggleAddModal();
    }

    render = () => {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.toggleAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ position: 'absolute', marginLeft: '8px', marginBottom: '16px', marginTop: '2px', fontSize: '2rem' }}>{this.props.title}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0' }}>
                        <div id='manageAddModal' style={{ marginTop: '10px', paddingLeft: '10px', paddingRight: '10px', marginBottom: '10px' }}>
                            {this.fields}
                            <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.submit}><b>Submit</b></Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}