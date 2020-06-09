import React from 'react';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv';
import CSVBox from './CSVBox';
import { Button, Form } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './historicalDash.css'

export default class HistoricalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: this.props.marginLeft,
            toggleDash: false,
            CSVFiles: [],
            showUploadModal: false,
            sideOpen: false
        }
        this.comments = [];
    }

    componentDidMount = () => {
        this.getAllFiles();
    }


    changeContent = (newContent) => {
        this.setState({ content: newContent });
        this.forceUpdate();
    }

    getAllFiles = () => {
        fetch(GATEWAYSERVERIP + '/historical/getFiles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                var files = []
                let i = 0
                for (var file of res) {
                    let date = new Date(parseInt(file.metadata.date));
                    files.push(
                        <CSVBox filename={file.name}
                            driver={file.metadata.driver}
                            car={file.metadata.car}
                            date={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                            deleteFile={this.deleteFile}
                            ID={file.metadata.id}
                            key={i}
                            index={i}
                        />
                    )
                    i++
                }
                this.setState({ CSVFiles: files })
            })
            .catch(err => { console.log(err) });
    }

    deleteFile = (index) => {
        this.setState({ CSVFiles: this.state.CSVFiles.filter(file => file.props.index !== index) })
    }

    render = () => {
        return (
            <div id='historicalDash'>
                <div id='top' style={{
                    position: 'fixed',
                    top: '56px',
                    right: '0',
                    left: '0',
                    zIndex: '999',
                    height: this.state.typeOption === 'plotting' && this.state.showBottomNav && window.innerWidth < 1000 ? '102px' : '56px',
                    paddingLeft: 'calc(' + this.props.marginLeft + ' + 10px)',
                    paddingTop: '10px',
                    background: '#F5F5F5',
                    borderColor: '#C22D2D',
                    borderWidth: '0',
                    borderBottomWidth: '1px',
                    borderStyle: 'solid'
                }}>
                    <Button id='uploadButton' onClick={() => { this.setState({ showUploadModal: true }) }}><b>Upload CSV</b></Button>&nbsp;&nbsp;
                    <Button id='sortButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Sort Data</b></Button>&nbsp;&nbsp;
                    <Form className="searchForm" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Form.Control
                            className="searchFormControl"
                            ref={this.emailForm}
                            autoComplete="on"
                            placeHolder="Search"
                            required
                        />
                    </Form>
                </div>
                <div id='data'>
                    <UploadFileModal show={this.state.showUploadModal} onHide={() => this.setState({ showUploadModal: false })} />
                    {this.state.CSVFiles}
                </div>
            </div>
        );
    }
}