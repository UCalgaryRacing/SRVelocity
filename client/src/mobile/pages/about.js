import React from 'react';
import TopNavM from '../components/navigationComponents/topNavM';

export default class AboutPage extends React.Component {
    render = () => {
        return (
            <div id='aboutPage'>
                <TopNavM/>
                <h2> About Page </h2>
            </div>
        );
    }
}