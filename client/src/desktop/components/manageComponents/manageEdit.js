import React from 'react';
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import './manageEdit.css';

const MyForm = React.forwardRef((props, ref) => <input ref={ref}/>);

export default class ManageEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: this.props.labels,
            values: this.props.values
        }
        this.formRefs = new Array();
        this.fields = [];
    }

    componentWillMount = () => {
        this.formRefs = new Array();
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
                    <div style={{ textAlign: 'center', fontSize: '14px', color: '#C22E2D', marginBottom: '5px' }}>
                        {this.state.labels[i]}
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <Form className="searchForm" >
                            <Form.Control style={{textAlign: 'center'}}
                                className="searchFormControl"
                                ref={this.setRef}
                                autoComplete="on"
                                placeHolder={this.state.values[i]}
                                required
                            />
                        </Form>
                    </div>
                </div>
            );
            margin += 40;
            i++;
        }
    }

    submitEdit = async() => {
        let data = [];
        for(var form of this.formRefs) {
            if(form.value === '') data.push(form.placeholder);
            else data.push(form.value)
        } 
        let status = await this.props.submitEdit(data);
        if(!status) return;
        for(var form of this.formRefs) {
            if(form.value !== form.placeholder && form.value !== '') {
                form.placeholder = form.value;
                form.value = '';
            } 
        } 
    }

    render = () => {
        return (
            <div id='manageEdit' style={{ marginTop: '190px', paddingTop: '10px', borderTop: '1px solid', width: '100%' }}>
                <div style={{ height: '36px', lineHeight: '36px', fontSize: '20px' }}>
                    Edit
                </div>
                {this.fields}
                <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={this.submitEdit}><b>Submit Changes</b></Button>
            </div>
        );
    }
}