import React from 'react';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv'
import CSVBox from './CSVBox'
import { Button } from 'react-bootstrap'
import UploadFileModal from './uploadFileModal'

export default class HistoricalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '64px',
            toggleDash: false,
            CSVFiles: [],
            showUploadModal: false
        }
    }

    componentDidMount = () => {
        this.getAllFiles()
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
        this.forceUpdate();
    }

    changeLeftMargin = () => {
        this.setState({ marginLeft: (this.state.marginLeft === '64px') ? '270px' : '64px' });
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
                    files.push(
                        <CSVBox filename={file.name}
                            driver={file.metadata.driver}
                            car={file.metadata.car}
                            date={file.metadata.date}
                            deleteFile={this.deleteFile}
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
        let dashSelector = (
            <Button style={{ width: '150px', height: '36px', background: '#C22E2D', borderColor: '#C22E2D' }} onClick={() => { this.setState({ showUploadModal: true }) }}><b>Upload CSV</b></Button>
        );
        let typeSelector = (
            <Button style={{ width: '150px', height: '36px', background: '#C22E2D', borderColor: '#C22E2D' }} onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Sort Data</b></Button>
        );
        return (
            <div id='streamingPage' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                <div id='top' style={{
                    position: 'fixed',
                    top: '56px',
                    right: '0',
                    left: '0',
                    zIndex: '999',
                    height: this.state.typeOption === 'plotting' && this.state.showBottomNav && window.innerWidth < 1000 ? '102px' : '56px',
                    paddingLeft: 'calc(' + this.state.marginLeft + ' + 10px)',
                    paddingTop: '10px',
                    background: '#F5F5F5',
                    borderColor: '#C22D2D',
                    borderWidth: '0',
                    borderBottomWidth: '1px',
                    borderStyle: 'solid'
                }}>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    {/* {this.state.selectionComplete && this.state.typeOption === 'plotting' ? addGraph : ''}
                    {this.state.selectionComplete && this.state.typeOption === 'plotting' ? testRun : ''} */}
                </div>
                <div id='dashboard'>
                    <UploadFileModal show={this.state.showUploadModal} onHide={() => this.setState({ showUploadModal: false })} />
                    {this.state.CSVFiles}
                </div>
            </div>
        );
    }
}