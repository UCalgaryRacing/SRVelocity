import React from 'react';
import TopNav from '../components/topNav';
import SideNavbar from '../components/sideNav';

export default class StreamingPage extends React.Component {

    render = () => {
        return (
            <div id='streamingPage'>
                <TopNav/>
                <SideNavbar/>
            </div>
        );
    }
}