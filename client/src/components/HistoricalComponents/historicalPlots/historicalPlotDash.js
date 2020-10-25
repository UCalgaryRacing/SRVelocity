import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';
import { Button, Form, CardDeck } from 'react-bootstrap';
import { readString } from 'react-papaparse'
import SimpleCSVBox from './SimpleCSVBox'
import HistoricalPlot from './historicalPlot'
import './historicalPlotDash.css'
var _ = require('lodash');


export default class HistoricalPlotDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginLeft: this.props.marginLeft,
            CSVFiles: [],
            showSearched: false,
            searchedFiles: [],
            showPlots: false,
            currentCSV: null
        }
    }

    componentDidMount = () => {
        this.getAllFiles();
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
                        <SimpleCSVBox
                            filename={file.name}
                            driver={file.metadata.driver}
                            car={file.metadata.car}
                            date={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                            ID={file.metadata.id}
                            key={i}
                            index={i}
                            showFilePlot={this.showFilePlots}
                        />
                    )
                    i++
                }
                files.sort(function(a, b){ //Newest first
                    var tempA = b.props.realDate
                    var tempB = a.props.realDate
                    if(tempA > tempB) return 1
                    else if(tempA < tempB) return -1
                    else return 0
                });
                this.setState({ CSVFiles: files })
            })
            .catch(err => { console.log(err) });
    }

    showFilePlots = (CSVString) => {
        const config = {
            header: true,
            dynamicTyping: true
        }

        let parseResult = readString(CSVString, config)

        this.setState({currentCSV: parseResult,
                        showPlots: true})
    }


    search = (e) => {
        e.preventDefault();
        const text = e.target.value;
        if (text === "") {
            this.setState({ showSearched: false });
            return;
        }
        var filtered = [...this.state.CSVFiles]
        function filterParam(param, value) {
            return filtered.filter(file => file.props[param].toLowerCase().includes(value.toLowerCase()))
        }
        var fileFilter = filterParam('filename', text);
        var driverFilter = filterParam('driver', text);
        var carFilter = filterParam('car', text);
        var dateFilter = filterParam('date', text);
        let temp1 = _.unionBy(fileFilter, driverFilter, 'key');
        let temp2 = _.unionBy(carFilter, dateFilter);
        filtered = _.unionBy(temp1, temp2, 'key');
        this.setState({
            searchedFiles: filtered,
            showSearched: true
        })
    }

    render = () => {
        return (
            <div id='historicalPlotDash'>
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
                    {this.state.showPlots ? 
                    <Button id='backButton' onClick={() => this.setState({showPlots: false})}>Back</Button> 
                    :
                    <div>
                    <Button id='sortButton' onClick={this.changeType} ><b>Sort Data</b></Button>&nbsp;&nbsp;
                    <Form className="searchForm" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Form.Control
                            onChange={this.search}
                            className="searchFormControl"
                            ref={this.emailForm}
                            autoComplete="on"
                            placeHolder="Search"
                            required
                        />
                    </Form>
                    </div>
                    }
                </div>
                <div id='data'>
                    {this.state.showPlots ? 
                        <HistoricalPlot currentCSV={this.state.currentCSV}/> 
                        :
                        <div>
                        <p style={{textAlign:'center', fontFamily:'Helvetica', fontSize:'large'}}>Click on a box to view custom plots</p>
                        <CardDeck>
                        {this.state.showSearched ? this.state.searchedFiles : this.state.CSVFiles}
                        </CardDeck>
                        </div>
                    }
                </div>
            </div>
        );
    }
}