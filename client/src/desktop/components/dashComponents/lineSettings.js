import React from 'react'
import { Form } from 'react-bootstrap';


export default class LineSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            readyToSubmit: false
        }
    }


    render = () => {
        return(
            <div>
                <Form.Label style={{ fontSize: '15px' }}>Plot Settings - Line Plot Data</Form.Label>
            </div>
        );
    }
}