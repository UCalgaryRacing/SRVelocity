import React from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
var _ = require('lodash');

class VehicleDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicleRender: [],
			showAddModal: false,
			searchedVehicles: [],
			showSearched: false
		}
	}

	componentWillMount = () => {
		this.createVehicleList();
	}

	createVehicleList = async () => {
		try {
			const vehicles = await this.fetchVehicles();
			await this.renderVehicleTable(vehicles);
			this.forceUpdate();
		} catch (err) {
			console.log(err)
		}
	}

	fetchVehicles = async () => {
		try {
			const requesturl = "/vehicle/getVehicles/";
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
						delete={this.deleteVehicle}
						submitEdit={this.submitEdit}
					/>
				);
			});
		}
		this.setState({ vehicleRender: render });
	}

	addVehicle = (data) => {
		const requestURL = "/vehicle/postVehicle";
		fetch(requestURL, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data[0],
			})
		})
			.then(res => res.json())
			.then(res => {
				if(!res.ok) {
					//show error
					return;
				}
				let box = (
					<ManageBox
						labels={["Name"]}
						values={[data[0]]}
						ID={res.ID} //Get from req
						key={res.ID}
						delete={this.deleteVehicle}
						submitEdit={this.submitEdit}
					/>
				)
				let temp = this.state.vehicleRender;
				temp.push(box);
				this.setState({ sensorRender: temp });
			})
	}

	submitEdit = async (data, ID) => {
		const requestURL = "/vehicle/putVehicle/" + ID;
		return fetch(requestURL, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data[0]
			})
		})
			.then(res => {
				if (res.ok) return true;
				else {
					//show error
					return false;
				}
			})
			.catch(err => {
				//show error
				return false;
			})
	}

	deleteVehicle = (ID) => {
		const requestURL = "/vehicle/deleteVehicle/" + ID;
		fetch(requestURL, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => {
				if (res.ok) {
					for (var el in this.state.vehicleRender) {
						if (parseInt(this.state.vehicleRender[el].key) === ID) {
							let temp = this.state.vehicleRender;
							temp.splice(el, 1);
							this.setState({ vehicleRender: temp });
							break;
						}
					}
				} else {
					//show error
				}
			})
			.catch((error) => {
				//show error
				console.log(error)
			});
	}

	toggleAddModal = () => {
		this.setState({ showAddModal: !this.state.showAddModal });
	}

	search = (e) => {
		e.preventDefault();
		const text = e.target.value;
		if (text === "") {
			this.setState({ showSearched: false });
			return;
		}
		var filtered = [...this.state.vehicleRender]
		function filterParam(param, index, value) {
			return filtered.filter(file => file.props[param][index].toLowerCase().includes(value.toLowerCase()))
		}
		filtered = filterParam('values', 0, text);
		this.setState({
			searchedVehicles: filtered,
			showSearched: true
		})
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
					{this.state.showSearched ? this.state.searchedVehicles : this.state.vehicleRender}
				</div>
				<ManageAddModal submit={this.addVehicle} show={this.state.showAddModal} toggleAddModal={this.toggleAddModal} labels={["Name"]} title={"Add Vehicle"} />
			</div>
		)
	}
}

export default VehicleDash;
