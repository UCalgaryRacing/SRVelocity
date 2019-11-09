import React from 'react';
import TopNavM from '../components/navigationComponents/topNavM';
import '../../desktop/styling/home.css';

export default class HomePageM extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <TopNavM />
                <div id='homePage'>
                    <h2>Home Page</h2>
                </div>
            </React.Fragment>
        );
    }
}