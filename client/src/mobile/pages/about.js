import React from 'react';
import TopNav from '../componentsM/navigationComponentsM/topNavM';

export default class AboutPage extends React.Component {
    render = () => {
        return (
            <div id='aboutPage'>
                <TopNav/>
                <h2> About Page </h2>
            </div>
        );
    }
}