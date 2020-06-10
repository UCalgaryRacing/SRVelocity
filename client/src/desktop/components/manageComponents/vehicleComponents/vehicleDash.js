import React from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
//import './sensorDash.css';
var _ = require('lodash');

class VehicleDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicleRender: [],
			showAddModal: false,
		}
	}

	componentWillMount = () => {
		this.createVehicleList();
	}

	createVehicleList = async() => {
		try {
			const vehicles = await this.fetchVehicles();
			await this.renderVehicleTable(vehicles);
			this.forceUpdate();
		} catch(err) {
			console.log(err)
		}
	}

	fetchVehicles = async () => {
		try {
			const requesturl = "http://localhost:7000/vehicle/getVehicles/";
			let res = await fetch(requesturl, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.status == 401) {
				console.log("LOG IN REQUIRED");
				this.props.history.push("/signin");
			}
			return await res.json();
		} catch (err) {
			console.log(err);
		}
	}

	renderVehicleTable = (vehicles) => {
		let render = [];
		if (vehicles != null) {
			vehicles.forEach((ele) => {
				render.push(
					<ManageBox
						labels={["Name"]}
						values={[ele.name]}
						ID={ele.vehicle_id}
						key={ele.vehicle_id}
						deleteSensor={this.deleteVehicle}
					/>
				);
			});
		}
		this.setState({ vehicleRender: render });
	}

	deleteVehicle = () => {

	}

	async submitPost() {
		try {
			const requestURL = "http://localhost:7000/vehicle/postVehicle";
			const res = await fetch(requestURL, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: this.refs.name.current.value,
				}),
			});
			await res.json();
		} catch (err) {
			console.log(err);
		}
	}

	toggleAddModal = () => {
		this.setState({ showAddModal: !this.state.showAddModal });
	}

	render() {
		return (
			<div id='driverDash'>
				<div id='top' style={{
					position: 'fixed',
					top: '56px',
					right: '0',
					left: '0',
					zIndex: '999',
					height: '56px',
					paddingLeft: 'calc(' + this.props.marginLeft + ' + 10px)',
					paddingTop: '10px',
					background: '#F5F5F5',
					borderColor: '#C22D2D',
					borderWidth: '0',
					borderBottomWidth: '1px',
					borderStyle: 'solid'
				}}>
					<Button id='uploadButton' onClick={this.toggleAddModal}><b>Add</b></Button>&nbsp;&nbsp;
				<Button id='sortButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Sort Data</b></Button>&nbsp;&nbsp;
				<Form className="searchForm" style={{ position: 'absolute', top: '10px', right: '10px' }}>
						<Form.Control
							onChange={this.search}
							className="searchFormControl"
							ref={this.emailForm}
							autoComplete="on"
							placeHolder="Search"
							required
						/>
					</Form>
				</div>
				<div id='data'>
					{this.state.showSearched ? this.state.searchedFiles : this.state.vehicleRender}
				</div>
				<ManageAddModal submit={this.addSensor} show={this.state.showAddModal} toggleAddModal={this.toggleAddModal} labels={["Name"]} title={"Add Vehicle"} />
			</div>
		)
	}
}

export default VehicleDash;
