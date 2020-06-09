import React from 'react';
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import ManageEdit from './manageEdit';
import './manageBox.css';

export default class ManageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: this.props.labels,
            values: this.props.values,
            ID: this.props.ID,
            showEdit: false
        }
        this.info = [];
    }

    componentWillMount = () => {
        this.generateBox();
    }

    generateBox = () => {
        this.info = [];
        var i = 1;
        var margin = 30;
        while (i < this.state.labels.length) {
            this.info.push(
                <div id='column' style={{ marginTop: margin + 'px' }} onClick={this.downloadFile}>
                    <div id='label'>{this.state.labels[i]}:&nbsp;</div><div id='value'>{this.state.values[i]}</div>
                </div>
            )
            margin += 30;
            i++;
        }
    }

    submitEdit = (data) => {
        const requestURL = "http://localhost:7000/sensor/putSensor/" + this.state.ID;
        fetch(requestURL, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data[0],
                outputUnit: data[2],
                category: data[1],
                codeName: data[5],
                canId: data[3],
                frequency: data[4],
            })
        }).then(res => {
            if(res.ok) { 
                this.setState({ values: data, showEdit: false }, this.generateBox());
            }
        })
    }

    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    }

    render = () => {
        return (
            <div id='manageBox'>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '20px', cursor: 'pointer' }} onClick={this.downloadFile}>
                    {this.state.values[0]}
                </div>
                {this.info}
                <Button id='boxButton' onClick={this.deleteSensor} style={{ position: 'absolute', right: '20px' }}>
                    <img id="logoImg" width="40px" style={{ marginTop: '2px' }} src={require('../../../assets/delete-x.svg')} />
                </Button>
                <Button id='boxButton' onClick={this.toggleEdit} style={{ position: 'absolute', right: '20px', marginTop: '46px' }}>
                    <img id="logoImg" width="27px" style={{ marginTop: '-14px', marginLeft: '-13px', position: 'absolute' }} src={require('../../../assets/edit.svg')} />
                </Button>
                <div style={{ display: this.state.showEdit ? '' : 'none' }}>
                    <ManageEdit labels={this.state.labels} values={this.state.values} submitEdit={this.submitEdit} />
                </div>
            </div>
        )
    }
}