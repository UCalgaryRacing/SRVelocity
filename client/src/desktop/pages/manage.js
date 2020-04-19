import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import ManageSideNav from '../components/navigationComponents/manageSideNav';
import ManageContent from '../components/manageComponents/manageContent';
import '../styling/streaming.css'

export default class HistoricalPage extends React.Component {
    constructor(props) {
        super(props);
        this.manageContent = React.createRef();
    }

    render = () => {
        return (
            <div id='streamingPage' style={{marginTop: '80px'}}>
                <TopNav />
                <ManageSideNav manageContent={this.manageContent} />
                <ManageContent ref={this.manageContent}/>
            </div>
        );
    }
}