import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import '../styling/home.css';

export default class HomePage extends React.Component {

    render = () => {
        return (
            <div id='homePage'>
                <TopNav/>
                <BottomNav/>
            </div>
        );
    }
}