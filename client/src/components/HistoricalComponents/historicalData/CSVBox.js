import React from 'react';
import { Button } from 'react-bootstrap'
import { GATEWAYSERVERIP } from '../../../dataServerEnv'
import './CSVBox.css'
import download from 'downloadjs'
import RenameFileModal from './renameFileModal'
import Quill from './quill';
import Comment from './comment';

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
            commentData: {}
        }
        this.comments = [];
    }

    componentDidMount = () => {
        this.fetchComments();
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
                if (response.ok) this.props.deleteFile(this.props.index)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteComment = (ID) => {
        fetch(GATEWAYSERVERIP + '/historical/deleteComment/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileID: this.props.ID,
                commentID: ID
            })
        })
            .then(async response => {
                if (response.ok) {
                    let temp = this.state.commentData;
                    delete temp[ID];
                    await this.setState({commentData: temp});
                    this.loadComments();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    pushComment = (content) => {
        fetch(GATEWAYSERVERIP + '/historical/addComment',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileID: this.props.ID,
                content: content,
                commenter: sessionStorage.getItem("Name"),
                commenterID: sessionStorage.getItem("ID")
            })
        })
        .then(res => res.json())
        .then(async res => {
            let temp = this.state.commentData;
            temp[res.ID] = {
                commenter: sessionStorage.getItem("Name"),
                commenterID: sessionStorage.getItem("ID"),
                content: content,
                date: res.date
            }
            await this.setState({commentData: temp});
            this.loadComments();
        })
    }

    fetchComments = () => {
        fetch(GATEWAYSERVERIP + '/historical/getComments/' + this.props.ID, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(async res => {
                await this.setState({commentData: res});
                this.loadComments();
            })
            .catch(err => { console.log(err) })
    }

    loadComments = () => {
        this.comments = [];
        for (var comment in this.state.commentData) {
            let date = new Date(parseInt(this.state.commentData[comment].date));
            this.comments.push(
                <Comment
                    content={this.state.commentData[comment].content}
                    date={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                    commenter={this.state.commentData[comment].commenter}
                    commenterID={this.state.commentData[comment].commenterID}
                    ID={comment}
                    key={this.comments.length + 1}
                    deleteComment={this.deleteComment}
                />
            );
        }
        this.forceUpdate();
    }

    toggleComments = () => {
        this.setState({ showComments: !this.state.showComments });
    }

    toggleQuill = () => {
        this.setState({ showQuill: !this.state.showQuill })
    }

    render = () => {
        return (
            <div id="CSVBox">
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '20px', cursor: 'pointer', textDecoration: 'underline' }}>
                    {this.state.filename}
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '46px', color: '#B0B0B0' }} >
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Created:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.date}</div>
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '92px', color: '#B0B0B0' }}>
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Vehicle:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.car}</div>
                </div>
                <div style={{ height: '36px', position: 'absolute', lineHeight: '36px', fontSize: '14px', marginTop: '138px', color: '#B0B0B0' }}>
                    <div style={{ color: '#C22E2D', width: '60px', position: 'absolute' }}>Driver:&nbsp;</div><div style={{ position: 'absolute', left: '65px', width: '160px' }}>{this.state.driver}</div>
                </div>
                <Button id='historicalButton' onClick={this.deleteFile} style={{ position: 'absolute', right: '20px' }}>
                    <img id="logoImg" width="40px" style={{ marginTop: '2px' }} src={require('../../../assets/delete-x.svg')} />
                </Button>
                <Button id='historicalButton' onClick={() => this.setState({ showRenameModal: true })} style={{ position: 'absolute', right: '20px', marginTop: '46px' }}>
                    <img id="logoImg" width="27px" style={{ marginTop: '-14px', marginLeft: '-13px', position: 'absolute' }} src={require('../../../assets/edit.svg')} />
                </Button>
                <Button id='historicalButton' onClick={this.downloadFile} style={{ position: 'absolute', right: '20px', marginTop: '92px' }}>
                    <img id="logoImg" width="20px" style={{ marginTop: '-10px', marginLeft: '-10px', position: 'absolute' }} src={require('../../../assets/download.svg')} />
                </Button>
                <Button id='historicalButton' onClick={this.toggleComments} style={{ position: 'absolute', right: '20px', marginTop: '138px' }}>
                    <img id="logoImg" width="20px" style={{ marginTop: '-10px', marginLeft: '-10px', position: 'absolute' }} src={require('../../../assets/comment.svg')} />
                </Button>
                <div id='comments' style={{ display: this.state.showComments ? '' : 'none', marginTop: '184px', paddingTop: '10px', borderTop: '1px solid', width: '100%', minHeight: 'calc(100% + 46px)' }}>
                    <div style={{ height: '36px', lineHeight: '36px', fontSize: '20px' }}>
                        Comments
                    </div>
                    <div >
                        {this.comments.length > 0 ? this.comments : (<div style={{ color: '#B0B0B0' }}>Nothing Yet!</div>)}
                    </div>
                    <Quill pushComment={this.pushComment} />
                </div>
                <RenameFileModal currentName={this.state.filename} showRenameModal={this.state.showRenameModal} onHide={() => this.setState({ showRenameModal: false })} renameFile={this.renameFile} />
            </div>
        );
    }
}