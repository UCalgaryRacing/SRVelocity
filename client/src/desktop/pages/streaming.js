import React from 'react';
import TopNav from '../components/topNav';
import SideNavbar from '../components/sideNav';
import StreamingContent from '../components/streamingContent';

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