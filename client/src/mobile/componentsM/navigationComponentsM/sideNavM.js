import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../../desktop/styling/sideNav.css';

export default class SideNavbar extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <SideNav 
                onToggle={() => {this.props.streamingContent.current.changeLeftMargin()}} 
                onSelect={(selected) => {this.props.streamingContent.current.changeContent(selected)}}
                style={{marginTop: '56px', fontSize: '2rem'}}>
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="Dash">
                        <NavItem eventKey="Dash">
                            <NavIcon>
                                <img src={require('../../../assets/dashboard.svg')} style={{ marginLeft: '20px', marginTop: '13px' }} alt='Dash'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Dashboard</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Suspension">
                            <NavIcon>
                                <img src={require('../../../assets/suspension.svg')} style={{marginLeft: '19px', marginTop: '13px'}} alt='Suspension'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Suspension</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Powertrain">
                            <NavIcon>
                                <img src={require('../../../assets/engine.svg')} style={{ marginLeft: '14px', marginTop: '3px' }} alt='Powertrain'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Power Train</b>
                            </NavText>
                            <NavItem eventKey="RPM">
                                <NavText>
                                    <b>RPM</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="TP">
                                <NavText>
                                    <b>Throttle Position</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="IPW">
                                <NavText>
                                    <b>Injector Pulse Width</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Barometer">
                                <NavText>
                                    <b>Barometer</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="MAP">
                                <NavText>
                                    <b>Manifold Air Pressure</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="ATF">
                                <NavText>
                                    <b>Air To Fuel</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="IAT">
                                <NavText>
                                    <b>Intake Air Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="ET">
                                <NavText>
                                    <b>Engine Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="OP">
                                <NavText>
                                    <b>Oil Pressure</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="OT">
                                <NavText>
                                    <b>Oil Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="FT">
                                <NavText>
                                    <b>Fuel Temperature</b>
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="Accel">
                            <NavIcon>
                                <img src={require('../../../assets/acceleration.svg')} style={{ marginLeft: '20px', marginTop: '4px' }} alt='Acceleration'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Acceleration</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Roll">
                            <NavIcon>
                                <img src={require('../../../assets/roll.svg')} style={{ marginLeft: '5px', marginRight: '4px', marginTop: '3px' }} alt='Roll'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Roll</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Pitch">
                            <NavIcon>
                                <img src={require('../../../assets/pitch.svg')} style={{ marginLeft: '4px', marginRight: '4px', marginTop: '-10px' }} alt='Pitch'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Pitch</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Yaw">
                            <NavIcon>
                                <img src={require('../../../assets/yaw.svg')} style={{ marginLeft: '4px', marginRight: '4px', marginTop: '-1px'}} alt='Yaw'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Yaw</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="TM">
                            <NavIcon>
                                <img src={require('../../../assets/trackmap.svg')} style={{ marginLeft: '18px', marginTop: '12px' }} alt='TM'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Track Map</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Speed">
                            <NavIcon>
                                <img src={require('../../../assets/speed.svg')} style={{ marginLeft: '17px', marginTop: '12px' }} alt='Speed'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Speed</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Distance">
                            <NavIcon>
                                <img src={require('../../../assets/distance.svg')} style={{ marginLeft: '17px', marginTop: '10px' }} alt='Distance'/>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Distance</b>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>


        );
           
    }
}