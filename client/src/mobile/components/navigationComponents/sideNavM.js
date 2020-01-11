import React from "react";
import Sidebar from "react-sidebar"
import { NavItem } from '@trendmicro/react-sidenav';
import Collapsible from 'react-collapsible'
import Settings from '../settingsComponentsM/settingsM.js'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Nav } from 'react-bootstrap'

import '../../styling/sideNavM.css';
import '../../styling/sideNavToggleM.css'
import '../../styling/topNavM.css'

export default class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    onSelect = (content) => {
        if(this.props.streamingContent.current !== null) {
            this.props.streamingContent.current.changeContent(content)
        }
    }

    render() {
        return (
            <div style={{position: 'relative', height: '60px'}}>
                <Sidebar 
                    sidebar={
                        <React.Fragment>
                            <NavItem eventKey='Dashboard'>
                                <button class="tab-button" onClick={() => {this.onSelect('Dash')}}>Dashboard</button>
                            </NavItem>
                            <NavItem eventKey='Suspension'>
                                <button class="tab-button" onClick={() => {this.onSelect('Suspension')}}>Suspension</button>
                            </NavItem>
                            <NavItem eventKey='Powertrain'>
                                <Collapsible trigger="Powertrain">
                                    <button eventKey='RPM' class="collapse-content-button" onClick={() => {this.onSelect('RPM')}}>RPM</button>
                                    <button eventKey='Throttle Position' class="collapse-content-button" onClick={() => {this.onSelect('Throttle Position')}}>Throttle Position</button>
                                    <button eventKey='Injector Pulse Width' class="collapse-content-button" onClick={() => {this.onSelect('Injector Pulse Width')}}>Injector Pulse Width</button>
                                    <button eventKey='Barometer' class="collapse-content-button" onClick={() => {this.onSelect('Barometer')}}>Barometer</button>
                                    <button eventKey='Manifold Air Pressure' class="collapse-content-button" onClick={() => {this.onSelect('Manifold Air Pressure')}}>Manifold Air Pressure</button>
                                    <button eventKey='Air To Fuel' class="collapse-content-button" onClick={() => {this.onSelect('Air To Fuel')}}>Air to Fuel</button>
                                    <button eventKey='Intake Air Temperature' class="collapse-content-button" onClick={() => {this.onSelect('Intake Air Temperature')}}>Intake Air Temperature</button>
                                    <button eventKey='Engine Temperature' class="collapse-content-button" onClick={() => {this.onSelect('Engine Temperature')}}>Engine Temperature</button>
                                    <button eventKey='Oil Pressure' class="collapse-content-button" onClick={() => {this.onSelect('Oil Pressure')}}>Oil Pressure</button>
                                    <button eventKey='Oil Temperature' class="collapse-content-button" onClick={() => {this.onSelect('Oil Temperature')}}>Oil Temperature</button>
                                    <button eventKey='Fuel Temperature' class="collapse-content-button" onClick={() => {this.onSelect('Fuel Temperature')}}>Fuel Temperature</button>
                                </Collapsible>
                            </NavItem>
                            <NavItem eventKey='Acceleration'>
                                <button class="tab-button" onClick={() => {this.onSelect('Acceleration')}}>Acceleration</button>
                            </NavItem>
                            <NavItem eventKey='Roll'>
                                <button class="tab-button" onClick={() => {this.onSelect('Roll')}}>Roll</button>
                            </NavItem>
                            <NavItem eventKey='Pitch'>
                                <button class="tab-button" onClick={() => {this.onSelect('Pitch')}}>Pitch</button>
                            </NavItem>
                            <NavItem eventKey='Yaw'>
                                <button class="tab-button" onClick={() => {this.onSelect('Yaw')}}>Yaw</button>
                            </NavItem>
                            <NavItem eventKey='Track Map'>
                                <button class="tab-button" onClick={() => {this.onSelect('Track Map')}}>Track Map</button>
                            </NavItem>
                            <NavItem eventKey='Speed'>
                                <button class="tab-button" onClick={() => {this.onSelect('Speed')}}>Speed</button>
                            </NavItem>
                            <NavItem eventKey='Distance'>
                                <button class="tab-button" onClick={() => {this.onSelect('Distance')}}>Distance</button>
                            </NavItem>
                        </React.Fragment>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { width: "175px", height: "100%", background: "rgb(194, 45, 45)", position: "fixed", top: '56px' } }}
                >
                    <div class="container" onClick={() => this.onSetSidebarOpen(true)}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                </Sidebar>
            </div>
        );
    }
}