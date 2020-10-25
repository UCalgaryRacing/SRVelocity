import React from 'react';
import Button from 'react-bootstrap/Button';
import GraphBox from './plottingDash/graphBox';
import RadialChart from '../GraphComponents/radialChart';
import './quickMaps.css';

export default class QuickMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTrackMap: false,
            showTrack: false, //Need this to avoid memory leak
            showAccelMap: false,
            showAccel: false,  //Need this to avoid memory leak
        }
    }

    toggleTrackMap = () => {
        this.setState({ showTrackMap: true, showTrack: !this.state.showTrack});
        if(window.innerWidth < 1000) this.setState({showAccel: false});
    }

    toggleAccelMap = () => {
        this.setState({ showAccelMap: true, showAccel: !this.state.showAccel});
        if(window.innerWidth < 1000) this.setState({showTrack: false});
    }

    render = () => {
        return (
            <div id="quickMap">
                {this.state.showTrackMap ? <div id='trackMap' style={{ display: this.state.showTrack ? '' : 'none' }}><GraphBox sensors={[{ category: 'Track Map' }]} id={10000} key={10000} hideClose={true} /></div> : null}
                {this.state.showAccelMap ? <div id='accelMap' style={{ display: this.state.showAccel ? '' : 'none' }}><RadialChart showLabels={false} /></div> : null}
                <div style={{
                    position: 'fixed',
                    right: '0',
                    left: this.props.marginLeft,
                    bottom: '0',
                    background: "#F5F5F5",
                    zIndex: '1000',
                    padding: '0px',
                    height: '46px',
                    borderColor: '#C22E2D',
                    borderWidth: '0',
                    borderTopWidth: '1px',
                    borderStyle: 'solid'
                }}>
                    <Button style={{ position: 'absolute', left: '10px', bottom: '4px' }} id='trackMapButton' onClick={this.toggleTrackMap}><b>{(this.state.showTrack) ? 'Hide Track' : 'Show Track'}</b></Button>
                    <Button style={{ position: 'absolute', right: '10px', bottom: '4px' }} id='accelMapButton' onClick={this.toggleAccelMap}><b>{(this.state.showAccel) ? 'Hide Accel' : 'Show Accel'}</b></Button>
                </div>
            </div>
        );
    }
}
