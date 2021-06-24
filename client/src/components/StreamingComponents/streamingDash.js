import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import GraphingDashboard from './plottingDash/graphingDashboard';
import DataDashboard from './dataDash/dataDashboard';
import CustomPlottingDash from './plottingDash/customPlottingDashboard';
import CustomDataDash from './dataDash/customDataDash';
import QuickMaps from './quickMaps';
import Data from '../../data';
import SensorData from '../../constants';
import { isMobile } from 'react-device-detect';
import './dashboard.css';

export default class StreamingDash extends React.Component {
  constructor(props) {
    super(props);
    this.graphDash = React.createRef();
    this.state = {
      dashOption: 'default',
      typeOption: 'plotting',
      showTrackMap: false,
      showAccelMap: false,
      selectionComplete: true,
      showBottomNav: true,
    };
  }

  changeDash = () => {
    this.setState({
      dashOption: this.state.dashOption === 'default' ? 'custom' : 'default',
      selectionComplete: this.state.dashOption === 'default' ? false : true,
    });
  };

  changeType = () => {
    this.setState({
      typeOption:
        this.state.typeOption === 'plotting' ? 'currentData' : 'plotting',
    });
  };

  doTestRun = () => {
    this.props.refreshPage();
    Data.getInstance().doTestRun();
  };

  updateSelectionComplete = () => {
    this.setState({ selectionComplete: !this.state.selectionComplete });
  };

  addGraph = () => {
    this.graphDash.current.showAddModal();
  };

  closeBottomNav = () => {
    this.setState({ showBottomNav: false });
  };

  openBottomNav = () => {
    this.setState({ showBottomNav: true });
  };

  render = () => {
    let dashSelector = (
      <ButtonGroup id="dashSelector" style={{ marginLeft: '10px' }}>
        <Button
          id="defaultButton"
          onClick={this.changeDash}
          disabled={this.state.dashOption === 'default' ? true : false}
        >
          <b>Default</b>
        </Button>
        <Button
          id="customButton"
          onClick={this.changeDash}
          disabled={this.state.dashOption === 'custom' ? true : false}
        >
          <b>Custom</b>
        </Button>
      </ButtonGroup>
    );
    let typeSelector = (
      <ButtonGroup id="typeSelector">
        <Button
          id="defaultButton"
          onClick={this.changeType}
          disabled={this.state.typeOption === 'plotting' ? true : false}
        >
          <b>Plotting</b>
        </Button>
        <Button
          id="customButton"
          onClick={this.changeType}
          disabled={this.state.typeOption === 'currentData' ? true : false}
        >
          <b>Current</b>
        </Button>
      </ButtonGroup>
    );
    let addGraph = (
      <Button
        id="addGraph"
        onClick={this.addGraph}
        style={{ position: 'absolute', textAlign: 'center' }}
      >
        <b>Add Graph</b>
      </Button>
    );
    let testRun = (
      <Button
        id="testButton"
        onClick={this.doTestRun}
        style={{ position: 'absolute', right: '10px' }}
      >
        <b>Do a Test Run</b>
      </Button>
    );
    let defaultDash = [
      'Track Map',
      'Oil Pressure',
      'Oil Temp',
      'Acceleration',
      'Axes',
    ];
    if (isMobile)
      defaultDash = [
        'Track Map',
        'Engine Temp',
        'Oil Pressure',
        'Acceleration',
      ];
    return (
      <div id="dashboard">
        <div
          id="top"
          style={{
            position: 'fixed',
            top: '56px',
            right: '0',
            left: '0',
            zIndex: '999',
            height:
              this.state.typeOption === 'plotting' &&
              this.state.showBottomNav &&
              window.innerWidth < 1000
                ? '102px'
                : '56px',
            paddingLeft: this.props.marginLeft,
            paddingTop: '10px',
            background: '#F5F5F5',
            borderColor: '#C22D2D',
            borderWidth: '0',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          {dashSelector}&nbsp;&nbsp;
          {typeSelector}&nbsp;&nbsp;
          {this.state.selectionComplete && this.state.typeOption === 'plotting'
            ? addGraph
            : ''}
          {this.state.selectionComplete && this.state.typeOption === 'plotting'
            ? testRun
            : ''}
        </div>
        <div id="plots" style={{ paddingTop: '35px' }}>
          {this.state.dashOption === 'default' ? (
            this.state.typeOption === 'plotting' ? (
              <GraphingDashboard plots={defaultDash} ref={this.graphDash} />
            ) : (
              <DataDashboard
                categories={SensorData.getInstance().getCategories()}
              />
            )
          ) : this.state.typeOption === 'plotting' ? (
            <CustomPlottingDash
              closeBottomNav={this.closeBottomNav}
              openBottomNav={this.openBottomNav}
              updateSelectionComplete={this.updateSelectionComplete}
              ref={this.graphDash}
            />
          ) : (
            <CustomDataDash
              closeBottomNav={this.closeBottomNav}
              openBottomNav={this.openBottomNav}
              updateSelectionComplete={this.updateSelectionComplete}
            />
          )}
        </div>
        {this.state.showBottomNav ? (
          <QuickMaps marginLeft={this.props.marginLeft} />
        ) : null}
      </div>
    );
  };
}
