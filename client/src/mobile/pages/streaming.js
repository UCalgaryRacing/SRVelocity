import React from 'react';
import TopNav from '../componentsM/navigationComponentsM/topNavM';
import SideNavbar from '../componentsM/navigationComponentsM/sideNavM';
import StreamingContent from '../componentsM/streamingComponentsM/streamingContentM';
import Settings from '../componentsM/settingsComponentsM/settingsM';

export default class StreamingPageM extends React.Component {
    render = () => {
        return (
            <div id='streamingPage' style={{height: '100%'}}>
                <SideNavbar streamingContent={this.streamingContent}/>
            </div>
        );
    }
}