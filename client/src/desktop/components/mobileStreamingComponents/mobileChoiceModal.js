import React from 'react'
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import SensorData from "../../../constants";


export default class ModalSensorChoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: this.props.plots
        }
        this.selections = []
    }

    componentDidMount = () => {
        SensorData.getInstance().getCategories()
        .then( categories => {
            this.selections = categories.map( (category, index) => {
                    return <Button onClick={this.submit} id={category}>{category}</Button>
            })
        })
    }


    submit = (event) => {
        this.props.onHide()
        this.props.changeGraph(event.target.id)
    }


    render = () => {
        return(
            <div id='graphChoice' style={{marginLeft: '20px'}}>
                <Modal centered show={this.props.show} onHide={this.props.onHide} size='lg'>
                    <ButtonGroup vertical>
                        {this.selections}
                    </ButtonGroup>
                </Modal>
            </div>
        );
    }
}