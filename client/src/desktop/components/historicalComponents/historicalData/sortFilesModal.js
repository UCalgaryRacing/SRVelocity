import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

export default class SortFilesModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectTypePage: true,
            sortOption: '',
            settings: false,
            settingOption: ''
        }
        this.options = ['Date', 'Car', 'Driver']
        this.optionsDate = ['Newest', 'Oldest']
        this.optionsCar = ['Newest', 'Oldest']
    }

    selectType = (option) => {
        if(this.state.sortOption === option) this.setState({ sortOption: '' })
        else this.setState({ sortOption: option })
    }

    selectTypeDate = (option) => {
        if(this.state.settingOption === option) this.setState({ settingOption: '' })
        else this.setState({ settingOption: option })
    }

    selectTypeCar = (option) => {
        if(this.state.settingOption === option) this.setState({ settingOption: '' })
        else this.setState({ settingOption: option })
    }

    selectTypeDriver = () => {
        this.props.sortDriver()
        this.onHide()
    }

    onHide = () => {
        this.setState({
            selectTypePage: true,
            sortOption: '',
            settings: false,
            settingOption: ''
        })
        this.props.onHide()
    }

    continue = () => {
        if(this.state.sortOption === '') return
        if(this.state.sortOption === 'Driver'){
            this.selectTypeDriver()
            return
        }
        this.setState({ 
            selectTypePage: false, 
            settings: true
        })
    }

    submit = () => {
        if(this.state.settingOption === '') return
        else if(this.state.sortOption === 'Date'){
            this.props.sortDate(this.state.settingOption)
            this.onHide()
        }
        else if(this.state.sortOption === 'Car'){
            this.props.sortCar(this.state.settingOption)
            this.onHide()
        }
        else return
    }

    render = () => {
        return(
            <Modal show={this.props.show} onHide={this.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sort Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(this.state.selectTypePage === true) ? 
                        <div>
                            <p>How would you like to sort the displayed files?</p>
                            <Form>
                                <Form.Check name={this.options[0]} label={this.options[0]} id={1} key={1} onChange={() => this.selectType('Date')} disabled={(this.state.sortOption === 'Date' || this.state.sortOption === '') ? false : true}/>
                                <Form.Check name={this.options[1]} label={this.options[1]} id={2} key={2} onChange={() => this.selectType('Car')} disabled={(this.state.sortOption === 'Car' || this.state.sortOption === '') ? false : true}/>
                                <Form.Check name={this.options[2]} label={this.options[2]} id={3} key={3} onChange={() => this.selectType('Driver')} disabled={(this.state.sortOption === 'Driver' || this.state.sortOption === '') ? false : true}/>
                            </Form>
                            <Button onClick={this.continue} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "calc(100% - 20px)", alignContent: 'center', marginTop: '15px', marginBottom: '15px', marginLeft: '10px' }}>Continue</Button>
                        </div>
                    : null}
                    {(this.state.sortOption === 'Date' && this.state.settings === true) ?
                        <div>
                            <Form>
                                <Form.Check name={this.optionsDate[0]} label={this.optionsDate[0]} id={1} key={1} onChange={() => this.selectTypeDate('Newest')} disabled={(this.state.settingOption === 'Oldest') ? true : false}/>
                                <Form.Check name={this.optionsDate[1]} label={this.optionsDate[1]} id={2} key={2} onChange={() => this.selectTypeDate('Oldest')} disabled={(this.state.settingOption === 'Newest') ? true : false}/>
                            </Form>
                            <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "95%", alignContent: 'center', marginTop: '15px'}}>Submit</Button>
                        </div>
                    : 
                    (this.state.sortOption === 'Car' && this.state.settings) ? 
                        <div>
                            <Form>
                                <Form.Check name={this.optionsCar[0]} label={this.optionsCar[0]} id={1} key={1} onChange={() => this.selectTypeCar('Newest')} disabled={(this.state.settingOption === 'Oldest') ? true : false}/>
                                <Form.Check name={this.optionsCar[1]} label={this.optionsCar[1]} id={2} key={2} onChange={() => this.selectTypeCar('Oldest')} disabled={(this.state.settingOption === 'Newest') ? true : false}/>
                            </Form>
                            <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "95%", alignContent: 'center', marginTop: '15px'}}>Submit</Button>
                        </div>
                    : null}
                </Modal.Body>
            </Modal>
        );
    }
}