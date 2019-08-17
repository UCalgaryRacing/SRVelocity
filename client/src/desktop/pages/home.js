import React from 'react';
import TopNav from '../components/navigationComponents/topNav';

export default class HomePage extends React.Component {

    render = () => {
        return (
            <div id='homePage'>
                <TopNav/>
            </div>
        );
    }
}