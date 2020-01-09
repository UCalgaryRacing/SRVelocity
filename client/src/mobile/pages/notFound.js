import React from 'react';
import TopNavM from '../componentsM/navigationComponentsM/topNavM'

export default class NotFoundPageM extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <TopNavM />
                <h2>Cannot Find Page</h2>
            </React.Fragment>

        );
    }
}