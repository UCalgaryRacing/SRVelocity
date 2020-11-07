import React from 'react';
import ManageSideNav from '../components/NavigationComponents/manageSideNav';
import ManageContent from '../components/ManageComponents/manageContent';
import WithAuth from './withAuth';
import TopNav from "../components/NavigationComponents/topNav";

class ManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.manageContent = React.createRef();
    }

    render = () => {
        return (
            <div id='managePage'>
                <ManageSideNav manageContent={this.manageContent} />
                <ManageContent ref={this.manageContent}/>
            </div>
        );
    }
}

export default WithAuth(ManagePage);