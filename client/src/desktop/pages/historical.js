import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import HistoricalSideNav from '../components/navigationComponents/historicalSideNav';
import HistoricalContent from '../components/historicalComponents/historicalContent';
import '../styling/streaming.css'

export default class HistoricalPage extends React.Component {
    constructor(props) {
        super(props);
        this.historicalContent = React.createRef();
    }

    render = () => {
        return (
            <div id='streamingPage' style={{marginTop: '80px'}}>
                <TopNav />
                <HistoricalSideNav streamingContent={this.historicalContent} />
                <HistoricalContent ref={this.historicalContent}/>
            </div>
        );
    }
}