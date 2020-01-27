import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import SideNavbar from '../components/navigationComponents/sideNav';
import StreamingContent from '../components/streamingComponents/streamingContent';
import '../styling/streaming.css'

export default class StreamingPage extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard'
        }
    }

    render = () => {
        return (
            <div id='streamingPage'>
                <TopNav/>
                <SideNavbar streamingContent={this.streamingContent}/>
                <StreamingContent ref={this.streamingContent}/>
            </div>
        );
    }
}