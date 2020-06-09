import React from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ManageBox from '../manageBox';
import './sensorDash.css';

class SensorDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedVehicle: {},
			vehicleTableRender: [],
			sensorRender: [],
			sensorMode: false,
			selectedSensor: {},
			sensorSelected: false,
			add: false,
		};
		this.vehicles = [];
	}

	componentWillMount = () => {
		// Just fetch SR-21 for now, sort feature will by default only show sensors from current vehicle
		this.createSensorList();
	}

	async createSensorList() {
		try {
			const sensors = await this.fetchSensors();
			await this.renderSensorTable(sensors);
			await this.setState({
				sensorMode: true,
				sensorSelected: false,
				add: false,
			});
		} catch (err) {
			console.log(err);
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
			this.vehicles = await res.json();
		} catch (err) {
			console.log(err);
		}
	};

	fetchSensors = async () => {
		try {
			const requesturl = "http://localhost:7000/sensor/getSensors/" + 14;
			let res = await fetch(requesturl, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.status == 401) this.props.history.push("/signin");
			return await res.json();
		} catch (err) {
			console.log(err);
		}
	};

	addSensor() {

	}

	deleteSensor = () => {

	}

	renderSensorTable = async (sensors) => {
		let render = [];
		if (sensors != null) {
			sensors.forEach((ele) => {
				render.push(
					<ManageBox
						labels={["Name", "Category", "Output Unit", "CAN ID", "Frequency", "Code Name"]}
						values={[ele.name, ele.category, ele.output_unit, ele.can_id, ele.frequency, ele.code_name]}
						ID={ele.sensor_id}
						key={ele.name}
					/>
				);
			});
		}
		this.setState({ sensorRender: render });
	};

	render() {
		return (
			<div id='sensorDash'>
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
					<Button id='uploadButton' onClick={() => { this.addSensor({}); }}><b>Add</b></Button>&nbsp;&nbsp;
					<Button id='sortButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Sort Data</b></Button>&nbsp;&nbsp;
					<Form className="searchForm" style={{ position: 'absolute', top: '10px', right: '10px' }}>
						<Form.Control
							className="searchFormControl"
							ref={this.emailForm}
							autoComplete="on"
							placeHolder="Search"
							required
						/>
					</Form>
				</div>
				<div id='data'>
					{this.state.sensorRender}
				</div>
			</div>
		);
	}
}
export default withRouter(SensorDash);
