import React from 'react'
import '../../styling/calculationBoxM.css'

export default class CalculationBoxM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id='calculationBoxM'>
                <h6>
                    {this.props.title}
                </h6>
                <p>
                    {this.props.data()}
                </p>
            </div>
        );
    }
}