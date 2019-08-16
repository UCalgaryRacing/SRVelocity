import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class SideNavbar extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <SideNav onSelect={(selected) => this.props.sideNav(selected)} style={{marginTop: '56px', fontSize: '2rem'}}>
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="none">
                        <NavItem className="dash" eventKey="Dash">
                            <NavIcon>
                                <img src={require('../../assets/dashboard.svg')} style={{ marginLeft: '22px', marginTop: '15px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Dash</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Suspension">
                            <NavIcon>
                                <img src={require('../../assets/suspension.svg')} style={{marginLeft: '20px', marginTop: '14px'}}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Suspension</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain">
                            <NavIcon>
                                <img src={require('../../assets/engine.svg')} style={{ marginLeft: '19px', marginTop: '10px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Power Train</b>
                            </NavText>
                            <NavItem eventKey="RPM">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>RPM</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Throttle Position">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Throttle Position</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Injector Pulse Width">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Injector Pulse Width</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Barometer">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Barometer</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Manifold Air Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Manifold Air Pressure</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Air To Fuel">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Air To Fuel</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Intake Air Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Intake Air Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Engine Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Engine Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Oil Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Oil Pressure</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Oil Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Oil Temperature</b>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Fuel Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Fuel Temperature</b>
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="Acceleration">
                            <NavIcon>
                                <img src={require('../../assets/acceleration.svg')} style={{ marginLeft: '18px', marginTop: '9px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Acceleration</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Roll">
                            <NavIcon>
                                <img src={require('../../assets/roll.svg')} style={{ marginLeft: '14px', marginTop: '9px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Roll</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Pitch">
                            <NavIcon>
                                <img src={require('../../assets/pitch.svg')} style={{ marginLeft: '15px', marginTop: '3px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Pitch</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Yaw">
                            <NavIcon>
                                <img src={require('../../assets/yaw.svg')} style={{ marginLeft: '15px', marginTop: '7px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Yaw</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Track Map">
                            <NavIcon>
                                <img src={require('../../assets/track.svg')} style={{ marginLeft: '14px', marginTop: '6px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Track Map</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Speed">
                            <NavIcon>
                                <img src={require('../../assets/speed.svg')} style={{ marginLeft: '20px', marginTop: '12px' }}></img>
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Speed</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Distance">
                            <NavIcon>
                                <img src={require('../../assets/distance.svg')} style={{ marginLeft: '19px', marginTop: '10px' }}></img>
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