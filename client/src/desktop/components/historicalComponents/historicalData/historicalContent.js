import React from 'react';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv';
import CSVBox from './CSVBox';
import { Button, Form } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import SortFilesModal from './sortFilesModal';
import BottomNav from '../../navigationComponents/bottomNav';
import './historicalContent.css';

export default class HistoricalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '64px',
            toggleDash: false,
            CSVFiles: [],
            showUploadModal: false,
            showSortFilesModal: false
        }
        this.comments = [];
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
                files.sort(this.defaultSortFiles)
                this.setState({ CSVFiles: files })
            })
            .catch(err => { console.log(err) });
    }

    defaultSortFiles = (a, b) => {
        if(a.props.date > b.props.date) return -1
        else if(a.props.date < b.props.date) return 1
        else return 0
    }

    sortDate = (setting) => {
        if(setting === 'Newest'){
            const files = this.state.CSVFiles.slice(0).sort(function(a, b){
                if(a.props.date > b.props.date) return -1
                else if(a.props.date < b.props.date) return 1
                else return 0
            });
            this.setState({ CSVFiles: files })
        }
        else if(setting === 'Oldest'){
            const files = this.state.CSVFiles.slice(0).sort(function(a, b){
                if(a.props.date > b.props.date) return 1
                else if(a.props.date < b.props.date) return -1
                else return 0
            });
            this.setState({ CSVFiles: files })
        }
        else return
    }

    sortCar = (setting) => {
        if(setting === 'Newest'){
            const files = this.state.CSVFiles.slice(0).sort(function(a, b){
                if(a.props.car > b.props.car) return -1
                else if(a.props.car < b.props.car) return 1
                else return 0
            });
            this.setState({ CSVFiles: files })
        }
        else if(setting === 'Oldest'){
            const files = this.state.CSVFiles.slice(0).sort(function(a, b){
                if(a.props.car > b.props.car) return 1
                else if(a.props.car < b.props.car) return -1
                else return 0
            });
            this.setState({ CSVFiles: files })
        }
    }

    sortDriver = () => {
        const files = this.state.CSVFiles.slice(0).sort(function(a, b){
            var lastA = a.props.driver.slice(a.props.driver.indexOf(' ') + 1)
            var lastB = b.props.driver.slice(b.props.driver.indexOf(' ') + 1)
            if(lastA > lastB) return 1
            else if(lastA < lastB) return -1
            else return 0
        });
        this.setState({ CSVFiles: files })
    }

    deleteFile = (index) => {
        this.setState({ CSVFiles: this.state.CSVFiles.filter(file => file.props.index !== index) })
    }

    render = () => {
        let dashSelector = (
            <Button style={{ width: '150px', height: '36px', background: '#C22E2D', borderColor: '#C22E2D' }} onClick={() => { this.setState({ showUploadModal: true }) }}><b>Upload CSV</b></Button>
        );
        let typeSelector = (
            <Button style={{ width: '150px', height: '36px', background: '#C22E2D', borderColor: '#C22E2D' }} onClick={() => { this.setState({ showSortFilesModal: true }) }}><b>Sort Files</b></Button>
        );
        return (
            <div id='historicalPage' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
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
                    <Form className="emailForm" style={{position: 'absolute', top: '10px', right: '10px'}}>
                        <Form.Control style={{width: '150px', height: '36px'}}
                            className="emailFormControl"
                            ref={this.emailForm}
                            autoComplete="on"
                            placeHolder="Search"
                            required
                        />
                    </Form>
                </div>
                <div id='dashboard'>
                    <UploadFileModal show={this.state.showUploadModal} onHide={() => this.setState({ showUploadModal: false })} />
                    <SortFilesModal show={this.state.showSortFilesModal} onHide={() => this.setState({ showSortFilesModal: false })} sortDate={this.sortDate} sortCar={this.sortCar} sortDriver={this.sortDriver}/>
                    {this.state.CSVFiles}
                </div>
                <BottomNav/>
            </div>
        );
    }
}