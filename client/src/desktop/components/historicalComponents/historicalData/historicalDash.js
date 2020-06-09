import React from 'react';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv';
import CSVBox from './CSVBox';
import { Button, Form } from 'react-bootstrap';
import UploadFileModal from './uploadFileModal';
import './historicalDash.css'
import SearchModal from './searchModal';

export default class HistoricalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: this.props.marginLeft,
            toggleDash: false,
            CSVFiles: [],
            showUploadModal: false,
            sideOpen: false,
            showSearched: false,
            searchedFiles: [],
            showSearchModal: false,
            emptySearch: false
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

    search = (name, driver, car) => {
        var filtered = [...this.state.CSVFiles]

        function filterParam(param, value){
            filtered = filtered.filter(file => file.props[param].toLowerCase().includes(value.toLowerCase()))
        }
        if(name && name !== "") { filterParam('filename', name) }
        if(driver && driver !== "") { filterParam('driver', driver) }
        if(car && car !== "") { filterParam('car', car) }

        this.setState({
            searchedFiles: filtered,
            showSearched: true,
            emptySearch: (filtered.length === 0)
        })
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
                    <Button id='sortButton' onClick={this.changeType} ><b>Sort Data</b></Button>&nbsp;&nbsp;

                    {this.state.showSearched ?
                    <Button id='searchButton' 
                    onClick={() => this.setState({showSearched: false})}>
                        <b>Show all Files</b>
                    </Button> : null}

                    <Button id='searchButton' 
                    onClick={() => this.setState({showSearchModal: true})}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <b>Search</b>
                    </Button>&nbsp;&nbsp;

                </div>
                <div id='data'>
                    <SearchModal show={this.state.showSearchModal} search={this.search} onHide={() => this.setState({ showSearchModal: false })} />
                    <UploadFileModal show={this.state.showUploadModal} onHide={() => this.setState({ showUploadModal: false })} />
                    {this.state.showSearched && this.state.emptySearch ? 
                    <p>No files matched your search.</p> : null}
                    {this.state.showSearched ? this.state.searchedFiles : this.state.CSVFiles}
                </div>
            </div>
        );
    }
}