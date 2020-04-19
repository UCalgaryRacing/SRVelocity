import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../styling/sideNav.css';

export default class StreamingSideNav extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <SideNav
                    onToggle={() => { this.props.streamingContent.current.changeLeftMargin() }}
                    onSelect={(selected) => { this.props.streamingContent.current.changeContent(selected) }}
                    style={{ top: '56px', fontSize: '2rem' }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Dash">
                        <NavItem eventKey="Dash">
                            <NavIcon>
                                <img src={require('../../../assets/streaming.svg')} style={{ marginLeft: '14px', marginTop: '8px' }} alt='Dash' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Dashboard</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Custom Plots">
                            <NavIcon>
                                <img src={require('../../../assets/plot.svg')} style={{ marginLeft: '15px', marginTop: '8px' }} alt='Custom Plots' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Custom Plots</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Data Analysis">
                            <NavIcon>
                                <img src={require('../../../assets/analysis.svg')} style={{ marginLeft: '16px', marginTop: '10px' }} alt='Suspension' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Data Analysis</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Digital Twin">
                            <NavIcon>
                                <img src={require('../../../assets/f1.svg')} style={{ marginLeft: '5px', marginTop: '-3px' }} alt='Suspension' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Digital Twin</b>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
        );
    }
}