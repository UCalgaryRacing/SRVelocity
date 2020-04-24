import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../styling/sideNav.css';

export default class HistoricalSideNav extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <SideNav
                    onToggle={() => { this.props.streamingContent.current.changeLeftMargin() }}
                    onSelect={(selected) => { this.props.streamingContent.current.changeContent(selected) }}
                    style={{ top: '56px', fontSize: '2rem' }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Dash">
                        <NavItem eventKey="Data">
                            <NavIcon>
                                <img src={require('../../../assets/streaming.svg')} style={{ marginLeft: '14px', marginTop: '8px' }} alt='Dash' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Download Data</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Create Plots">
                            <NavIcon>
                                <img src={require('../../../assets/plot.svg')} style={{ marginLeft: '15px', marginTop: '8px' }} alt='Custom Plots' />
                            </NavIcon>
                            <NavText>
                                <b>&nbsp;&nbsp;&nbsp;Create Plots</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Data Analysis">
                            <NavIcon>
                                <img src={require('../../../assets/analysis.svg')} style={{ marginLeft: '16px', marginTop: '10px' }} alt='Data Analysis' />
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