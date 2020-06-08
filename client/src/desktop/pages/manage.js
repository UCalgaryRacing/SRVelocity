import React from 'react';
import ManageSideNav from '../components/navigationComponents/manageSideNav';
import ManageContent from '../components/manageComponents/manageContent';
import WithAuth from './withAuth';
import '../styling/streaming.css'

class ManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.manageContent = React.createRef();
    }

    render = () => {
        return (
            <div id='streamingPage' style={{marginTop: '80px'}}>
                <ManageSideNav manageContent={this.manageContent} />
                <ManageContent ref={this.manageContent}/>
            </div>
        );
    }
}

export default WithAuth(ManagePage);