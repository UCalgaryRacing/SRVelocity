import React from "react";
import { Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
import './sensorDash.css';
var _ = require('lodash');

class SensorDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorRender: [],
			showAddModal: false,
			searchedFiles: []
		};
	}

	componentWillMount = () => {
		// Just fetch SR-21 for now, sort feature will by default only show sensors from current vehicle
		this.createSensorList();
	}

	async createSensorList() {
		try {
			const sensors = await this.fetchSensors();
			await this.renderSensorTable(sensors);
			this.forceUpdate();
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

	addSensor = async (data) => {
		const requesturl = "http://localhost:7000/sensor/postSensor";
		fetch(requesturl, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data[0],
				outputUnit: data[2],
				category: data[1],
				codeName: data[5],
				canId: data[3],
				frequency: parseInt(data[4]),
				vehicleId: 14
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
						labels={["Name", "Category", "Output Unit", "CAN ID", "Frequency", "Code Name"]}
						values={[data[0], data[1], data[2], data[3], data[4], data[5]]}
						ID={res.ID} //Get from req
						key={res.ID}
						delete={this.deleteSensor}
						submitEdit={this.submitEdit}
					/>
				)
				let temp = this.state.sensorRender;
				this.insert(box, temp, 0, temp.length - 1);
				this.setState({ sensorRender: temp });
			})
			.catch(err => {
				console.log(err)
			})
	}

	submitEdit = async(data, ID) => {
		const requestURL = "http://localhost:7000/sensor/putSensor/" + ID;
        return fetch(requestURL, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data[0],
                outputUnit: data[2],
                category: data[1],
                codeName: data[5],
                canId: data[3],
                frequency: data[4],
            })
		})
		.then(res => { 
			if(res.ok) return true;
			else {
				//show error
				return false;
			}
		})
		.catch(err => {
			return false;
		})
	}

	insert = (box, temp, startIndex, endIndex) => {
		var length = temp.length;
		var start = typeof(startIndex) != 'undefined' ? startIndex : 0;
		var end = typeof(endIndex) != 'undefined' ? endIndex : length - 1;
		var m = start + Math.floor((end-start)/2);

		if(length == 0){
			temp.push(box);
			return;
		}
		if(box.props.values[0].toUpperCase() > temp[end].props.values[0].toUpperCase()){
			temp.splice(end+1, 0, box);
			return;
		}
		if(box.props.values[0].toUpperCase() < temp[start].props.values[0].toUpperCase()){
			temp.splice(start, 0, box);
			return;
		}
		if(start >= end){
			return;
		}
		if(box.props.values[0].toUpperCase() < temp[m].props.values[0].toUpperCase()){
			this.insert(box, temp, start, m-1);
			return;
		}
		if(box.props.values[0].toUpperCase() > temp[m].props.values[0].toUpperCase()){
			this.insert(box, temp, m+1, end);
			return;
		}
	}

	deleteSensor = (ID) => {
		const requestURL = "http://localhost:7000/sensor/" + ID;
        fetch(requestURL, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.ok) {
					for (var el in this.state.sensorRender) {
						if (parseInt(this.state.sensorRender[el].key) === ID) {
							let temp = this.state.sensorRender;
							temp.splice(el, 1);
							this.setState({ sensorRender: temp });
							break;
						}
					}
				} else {
					//Show error
				}
            })
            .catch((error) => {
                console.log(error)
            });
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
						key={ele.sensor_id}
						delete={this.deleteSensor}
						submitEdit={this.submitEdit}
					/>
				);
			});
		}
		render.sort(function(a, b){
			var tempA = a.props.values[0].toUpperCase()
			var tempB = b.props.values[0].toUpperCase()
			if(tempA > tempB) return 1
			else if(tempA < tempB) return -1
			else return 0
		});
		this.setState({ sensorRender: render });
	};

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
		var filtered = [...this.state.sensorRender]

		function filterParam(param, index, value) {
			return filtered.filter(file => file.props[param][index].toLowerCase().includes(value.toLowerCase()))
		}

		var nameFilter = filterParam('values', 0, text);
		var categoryFilter = filterParam('values', 1, text);
		var codeFilter = filterParam('values', 5, text);
		let temp = _.unionBy(nameFilter, categoryFilter, 'key');
		filtered = _.unionBy(temp, codeFilter, 'key');
		this.setState({
			searchedFiles: filtered,
			showSearched: true
		})
	}

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
					{this.state.showSearched ? this.state.searchedFiles : this.state.sensorRender}
				</div>
				<ManageAddModal submit={this.addSensor} show={this.state.showAddModal} toggleAddModal={this.toggleAddModal} labels={["Name", "Category", "Output Unit", "CAN ID", "Frequency", "Code Name"]} title={"Add Sensor"} />
			</div>
		);
	}
}
export default withRouter(SensorDash);
