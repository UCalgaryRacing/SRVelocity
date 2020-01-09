import React from 'react';
import TopNavM from '../componentsM/navigationComponentsM/topNavM'

export default class ErrorPageM extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <TopNavM />
                <h2> Error Page </h2>
            </React.Fragment>
        );
    }
}