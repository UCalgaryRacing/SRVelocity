import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import { GATEWAYSERVERIP } from '../../../../dataServerEnv'
import '../../../styling/CSVBox.css'
import download from 'downloadjs'
import RenameFileModal from './renameFileModal'

export default class CSVBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: this.props.filename,
            driver: this.props.driver,
            car: this.props.car,
            showRenameModal: false
        }
    }

    downloadFile = () => {
        fetch(GATEWAYSERVERIP + '/historical/getFile/' + this.state.filename, {
            method: 'GET'
        })
        .then(res => res.blob())
        .then(blob => download(blob, this.state.filename))
        .catch(err => { console.log(err) });

    }

    renameFile = (newName) => {
        if (!newName.endsWith(".csv")) {
            newName += ".csv"
        }
        let postParams = {
            oldFilename: this.state.filename,
            newFilename: newName
        }

        fetch(GATEWAYSERVERIP + '/historical/renameFile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postParams)
        })
        .then(response => {
            if(response.ok) {
                this.setState({ filename: newName,
                                    showRenameModal: false
                                })}
            else {
                this.setState({
                    showRenameModal: false
                })
            }})
        .catch(err => {
            console.log(err)
        })
    }

    deleteFile = () => {
        fetch(GATEWAYSERVERIP + '/historical/deleteFile/' + this.state.filename, {
            method: 'GET'
        })
        .then(response => {
            if(response.ok) {
                this.props.deleteFile(this.props.index)
            }})
        .catch(err => {
            console.log(err)
        })
    }

    render = () => {
        return (
            <div id="CSVBox">
                {this.state.filename}
                <Button className="float-right" variant="danger" onClick={this.deleteFile}>Delete</Button>
                <Button className="float-right" onClick={() => this.setState({showRenameModal: true})}>Rename</Button>
                <Button className="float-right" variant="success" onClick={this.downloadFile}>Download</Button>

                <RenameFileModal showRenameModal={this.state.showRenameModal} onHide={() => this.setState({showRenameModal: false})} renameFile={this.renameFile}/>
            </div>
        );
    }
}