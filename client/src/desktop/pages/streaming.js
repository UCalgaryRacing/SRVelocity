import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import StreamingSideNav from '../components/navigationComponents/streamingSideNav';
import StreamingContent from '../components/streamingComponents/streamingContent';
import { isMobile } from "react-device-detect";
import '../styling/streaming.css'

export default class StreamingPage extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
    }

    render = () => {
        let sideNav = null;
        let topNav = null;
        if(!isMobile) {
            sideNav = <StreamingSideNav streamingContent={this.streamingContent}/>
            topNav = <TopNav/>
        }
        return (
            <div id='streamingPage'>
                {topNav}
                {sideNav}
                <StreamingContent ref={this.streamingContent}/>
            </div>
        );
    }
}