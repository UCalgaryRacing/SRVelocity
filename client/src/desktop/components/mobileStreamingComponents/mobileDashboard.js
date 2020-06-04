import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from 'react-bootstrap';
import GraphingDashboard from './plottingDash/graphingDashboard';
import DataDashboard from './dataDash/dataDashboard';
import Data from '../../../data';
import SensorData from '../../../constants';
import '../../styling/dashboard.css';

export default class MobileDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.graphDash = React.createRef();
        this.state = {
            typeOption: 'plotting',
            showTrackMap: false,
            showAccelMap: false,
            selectionComplete: true
        }
    }

    changeDash = () => {
        this.setState({
            selectionComplete: (this.state.dashOption === 'default') ? false : true
        });
    }

    changeType = () => {
        this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' });
    }

    doTestRun = () => {
        Data.getInstance().doTestRun();
    }

    updateSelectionComplete = () => {
        this.setState({ selectionComplete: !this.state.selectionComplete });
    }

    addGraph = () => {
        this.graphDash.current.showAddModal();
    }

    render = () => {
        let testRun = (<Button id='accelMapButton' onClick={this.doTestRun} style={{ position: 'absolute', right: '15px' }}><b>Do a Test Run</b></Button>);
        return (
            <div id='dashboard'>
                <div style={{ position: 'fixed', top: '56px', right: '0', left: '0', zIndex: '999', height: '60px', paddingLeft: this.props.leftMargin, paddingTop: '12px', background: '#F5F5F5', borderColor: '#C22D2D', borderWidth: '0', borderBottomWidth: '2px', borderStyle: 'solid' }}>
                    {this.state.selectionComplete ? testRun : ''}
                </div>
                <div style={{ paddingTop: '98px' }}>
                    { ((this.state.typeOption === 'plotting') ? <GraphingDashboard ref={this.graphDash}/> : <DataDashboard categories={SensorData.getInstance().getCategories()} />)}
                </div>
            </div>
        );
    }
}
