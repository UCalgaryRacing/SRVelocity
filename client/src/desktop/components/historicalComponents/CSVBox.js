import React from 'react';
import { Button } from 'react-bootstrap'
import { GATEWAYSERVERIP } from '../../../dataServerEnv'
import '../../styling/CSVBox.css'
import download from 'downloadjs'

export default class CSVBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: this.props.filename
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

    renameFile = () => {

    }

    deleteFile = () => {
        //insert deletion

        this.props.deleteFile(this)
    }

    render = () => {
        return (
            <div id="CSVBox">
                {this.state.filename}
                <Button className="float-right" variant="danger" onClick={this.deleteFile}>Delete</Button>
                <Button className="float-right" onClick={this.renameFile}>Rename</Button>
                <Button className="float-right" variant="success" onClick={this.downloadFile}>Download</Button>
            </div>
        );
    }
}