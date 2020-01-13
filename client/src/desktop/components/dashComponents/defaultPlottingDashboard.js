import React from 'react';
import GraphingDashboard from './graphingDashboard';
import {constGraphTitles} from '../../../constants';
import '../../styling/defaultDash.css';

export default class DefaultPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: constGraphTitles
        }
    }

    render = () => {
        return (
            <div id='defaultDash'>
                <GraphingDashboard graphInfo={this.state.graphTitles}></GraphingDashboard>
            </div>
        );
    }
}
