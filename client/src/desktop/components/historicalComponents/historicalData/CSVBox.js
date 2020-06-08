import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import { GATEWAYSERVERIP } from '../../../../dataServerEnv'
import '../../../styling/CSVBox.css'
import download from 'downloadjs'
import RenameFileModal from './renameFileModal'
import Quill from './quill';

export default class CSVBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: this.props.filename,
            driver: this.props.driver,
            car: this.props.car,
            date: this.props.date,
            showRenameModal: false,
            showComments: false,
            showQuill: false
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
        if (!newName.endsWith(".csv")) newName += ".csv"
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
                if (response.ok) {
                    this.setState({
                        filename: newName,
                        showRenameModal: false
                    })
                }
                else {
                    this.setState({
                        showRenameModal: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteFile = () => {
        fetch(GATEWAYSERVERIP + '/historical/deleteFile/' + this.state.filename, {
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    this.props.deleteFile(this.props.index)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    pushComment = (content) => {
        console.log(content)
    }

    fetchComments = () => {

    }

    toggleComments = () => {
        this.setState({ showComments: !this.state.showComments });
    }

    toggleQuill = () => {
        this.setState({showQuill: !this.state.showQuill})
    }

    render = () => {
        return (
            <div id="CSVBox">
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '20px', cursor: 'pointer', textDecoration: 'underline' }} onClick={this.downloadFile}>
                    {this.state.filename}
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '46px', color: '#B0B0B0' }} onClick={this.downloadFile}>
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Created:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.date}</div>
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '92px', color: '#B0B0B0' }} onClick={this.downloadFile}>
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Vehicle:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.car}</div>
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '138px', color: '#B0B0B0' }} onClick={this.downloadFile}>
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Driver:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.driver}</div>
                </div>
                <Button id='historicalButton' onClick={this.deleteFile} style={{ position: 'absolute', right: '20px' }}>
                    <img id="logoImg" width="40px" style={{ marginTop: '2px' }} src={require('../../../../assets/delete-x.svg')} />
                </Button>
                <Button id='historicalButton' onClick={() => this.setState({ showRenameModal: true })} style={{ position: 'absolute', right: '20px', marginTop: '46px' }}>
                    <img id="logoImg" width="27px" style={{ marginTop: '-14px', marginLeft: '-13px', position: 'absolute' }} src={require('../../../../assets/edit.svg')} />
                </Button>
                <Button id='historicalButton' onClick={this.downloadFile} style={{ position: 'absolute', right: '20px', marginTop: '92px' }}>
                    <img id="logoImg" width="20px" style={{ marginTop: '-10px', marginLeft: '-10px', position: 'absolute' }} src={require('../../../../assets/download.svg')} />
                </Button>
                <Button id='historicalButton' onClick={this.toggleComments} style={{ position: 'absolute', right: '20px', marginTop: '138px' }}>
                    <img id="logoImg" width="20px" style={{ marginTop: '-10px', marginLeft: '-10px', position: 'absolute' }} src={require('../../../../assets/comment.svg')} />
                </Button>
                <div id='comments' style={{ display: this.state.showComments ? '' : 'none', marginTop: '184px', paddingTop: '10px', borderTop: '1px solid', width: '100%', minHeight: 'calc(100% + 46px)' }}>
                    <div style={{ height: '36px', lineHeight: '36px', fontSize: '20px' }} onClick={this.downloadFile}>
                        Comments
                    </div>
                    <Button id='historicalButton' onClick={this.toggleQuill} style={{ position: 'absolute', right: '20px', marginTop: '-36px' }}>
                        <img id="logoImg" width="20px" style={{ marginTop: '-10px', marginLeft: '-10px', position: 'absolute' }} src={require('../../../../assets/plus.svg')} />
                    </Button>
                    <div style={{display: this.state.showQuill ? '' : 'none'}}>
                        <Quill pushComment={this.pushComment}/>
                    </div>
                </div>
                <RenameFileModal showRenameModal={this.state.showRenameModal} onHide={() => this.setState({ showRenameModal: false })} renameFile={this.renameFile} />
            </div>
        );
    }
}