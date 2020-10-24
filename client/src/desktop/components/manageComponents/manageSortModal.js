import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

export default class ManageSortModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortChoice: ""
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({ sortChoice: "" });
    }

    selectType = (name) => {
        if(this.state.sortChoice === name){
            this.setState({ sortChoice: "" });
            return;
        }
        this.setState({ sortChoice: name });
    }

    submit = () => {
        this.props.submit(this.state.sortChoice);
        this.props.toggleSortModal();
    }

    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.toggleSortModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ position: 'absolute', marginLeft: '8px', marginBottom: '16px', marginTop: '2px', fontSize: '2rem' }}>{this.props.title}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0' }}>
                        <div id='manageAddModal' style={{ marginTop: '10px', paddingLeft: '10px', paddingRight: '10px', marginBottom: '10px' }}>
                            <Form>
                                <Form.Check name="Sensor Name" label="Sensor Name" id={1} key={1} disabled={(this.state.sortChoice !== 'Sensor Name' && this.state.sortChoice !== '') ? true : false} onChange={() => this.selectType('Sensor Name')}/>
                                <Form.Check name="Category" label="Category" id={2} key={2} disabled={(this.state.sortChoice !== 'Category' && this.state.sortChoice !== '') ? true : false} onChange={() => this.selectType('Category')}/>
                            </Form>
                            <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.submit}><b>Submit</b></Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}