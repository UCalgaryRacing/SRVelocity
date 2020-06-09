import React from 'react';
import HistoricalSideNav from '../components/navigationComponents/historicalSideNav';
import HistoricalContent from '../components/historicalComponents/historicalContent';
import WithAuth from './withAuth';
import '../styling/historical.css';

var refreshPage;

class HistoricalPage extends React.Component {
    constructor(props) {
        super(props);
        this.historicalContent = React.createRef();
        refreshPage = this.props.refreshPage;
    }

    render = () => {
        return (
            <div id='historicalPage'>
                <HistoricalSideNav streamingContent={this.historicalContent} />
                <HistoricalContent ref={this.historicalContent}/>
            </div>
        );
    }
}

export default WithAuth(HistoricalPage);