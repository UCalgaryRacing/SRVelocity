import React from 'react';
import '../../styling/defaultDash.css';
import {GraphingDashboard} from './graphingDashboard';
import {constGraphTitles} from '../../../constants'


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
