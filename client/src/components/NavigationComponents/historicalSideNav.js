import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './_styling/sideNav.css';

export default class HistoricalSideNav extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <SideNav
                    onToggle={() => { this.props.streamingContent.current.changeLeftMargin() }}
                    onSelect={(selected) => { this.props.streamingContent.current.changeContent(selected) }}
                    style={{ top: '56px', fontSize: '2rem' }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Data">
                        <NavItem eventKey="Data">
                            <NavIcon>
                                <img src={require('../../assets/data.svg')} style={{ marginLeft: '14px', marginTop: '8px' }} alt='Dash' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Historical Data</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Create Plots">
                            <NavIcon>
                                <img src={require('../../assets/chart.svg')} style={{ marginLeft: '19px', marginTop: '10px' }} alt='Custom Plots' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Create Plots</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Data Analysis">
                            <NavIcon>
                                <img src={require('../../assets/inspect.svg')} style={{ marginLeft: '-34px', marginTop: '10px', transform: 'scaleX(-1)'}} alt='Data Analysis' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Data Analysis</b>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
        );
    }
}