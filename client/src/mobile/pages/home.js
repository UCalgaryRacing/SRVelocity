import React from 'react';
import TopNav from '../../desktop/components/navigationComponents/topNav';
import BottomNav from '../../desktop/components/navigationComponents/bottomNav';
import '../../desktop/styling/home.css';

export default class HomePageM extends React.Component {
    render = () => {
        return (
            <div id='homePage'>
                <TopNav/>
                <BottomNav/>
            </div>
        );
    }
}