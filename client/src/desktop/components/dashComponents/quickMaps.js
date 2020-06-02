import React from 'react';
import Button from 'react-bootstrap/Button';
import GraphBox from './plottingDash/graphBox';
import RadialChart from './graphComponents/radialChart';

export default class QuickMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTrackMap: false,
            showTrack: false, //Need this to avoid memory leak
            showAccelMap: false,
            showAccel: false  //Need this to avoid memory leak
        }
    }

    toggleTrackMap = () => {
        this.setState({ showTrackMap: true, showTrack: !this.state.showTrack, showAccel: false });
    }

    toggleAccelMap = () => {
        this.setState({ showAccelMap: true, showAccel: !this.state.showAccel, showTrack: false });
    }

    render = () => {
        return (
            <div>
                {this.state.showTrackMap ? <div id='trackMap' style={{ display: this.state.showTrack ? '' : 'none' }}><GraphBox sensors={[{ category: 'Track Map' }]} id={10000} key={10000} hideClose={true} /></div> : null}
                {this.state.showAccelMap ? <div id='accelMap' style={{ display: this.state.showAccel ? '' : 'none' }}><RadialChart showLabels={false} /></div> : null}
                <div style={{ position: 'fixed', right: '0', bottom: '0', background: "#F5F5F5", zIndex: '10000', padding: '3px', width: '367px', height: '47px', borderColor: '#C22D2D', borderWidth: '0', borderTopWidth: '2px', borderLeftWidth: '2px', borderStyle: 'solid'}}>
                    <Button style={{position: 'absolute', left: '5px', bottom: '5px'}} id='trackMapButton' onClick={this.toggleTrackMap}><b>{(this.state.showTrack) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <Button style={{position: 'absolute', right: '5px', bottom: '5px'}} id='accelMapButton' onClick={this.toggleAccelMap}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button>
                </div>
            </div>
        );
    }
}
