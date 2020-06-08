import React from 'react';
import { GATEWAYSERVERIP } from '../../../dataServerEnv'
import CSVBox from './CSVBox'
import { Button } from 'react-bootstrap'
import UploadFileModal from './uploadFileModal'

export default class HistoricalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '80px',
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
        this.setState({ marginLeft: (this.state.marginLeft === '80px') ? '270px' : '80px' });
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
                files.push(<CSVBox filename={file.name} 
                    driver={file.metadata.driver} 
                    car={file.metadata.car}
                    date={file.metadata.date}
                    deleteFile={this.deleteFile} 
                    key={i} 
                    index={i}/>)
                i++
            }
            this.setState({ CSVFiles: files})
        })
        .catch(err => { console.log(err) });
    }

    deleteFile = (index) => {
        this.setState({ CSVFiles: this.state.CSVFiles.filter(file => file.props.index !== index)})
    }


    render = () => {
        return (
            <div id='streamingPage' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                <div id='dashboard'>
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem' }}>
                        Historical Dashboard
                        </p>
                    <Button onClick={() => {this.setState({showUploadModal: true})}}>Upload a CSV File</Button>
                    <UploadFileModal show={this.state.showUploadModal} onHide={() => this.setState({showUploadModal: false})}/>
                    {this.state.CSVFiles}
                </div>
            </div>
        );
    }
}

/* <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem' }}>
                        On this dashboard, you will be able to download CSV data, comment on CSV data, create and save custom data 
                        visualization. There may also be some applications for race/driver comparisons. This part of the system will
                        not be visible to the public. 
                        </p> */