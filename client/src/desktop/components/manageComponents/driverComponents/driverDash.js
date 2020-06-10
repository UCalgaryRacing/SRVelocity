import React from "react";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
import { Row, Col, Button, Form } from "react-bootstrap";
import './driverDash.css';

class DriverDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drivers: [],
			driverRender: [],
			showAddModal: false
		}
	}

	componentWillMount = () => {
		this.createDriverList();
	}

	createDriverList = async () => {
		try {
			const drivers = await this.fetchDrivers();
			await this.renderDriverTable(drivers);
			this.forceUpdate();
		} catch (err) {
			console.log(err);
		}
	}

	fetchDrivers = async () => {
		try {
			const requesturl = "http://localhost:7000/driver/getDrivers";
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

	renderDriverTable = (drivers) => {
		let render = [];
		if (drivers != null) {
			drivers.forEach((ele) => {
				render.push(
					<ManageBox
						labels={["First Name", "Last Name"]}
						values={[ele.first_name, ele.last_name]}
						ID={ele.driver_id}
						key={ele.driver_id}
						deleteDriver={this.deleteDriver}
					/>
				);
			});
		}
		this.setState({ driverRender: render });
	}

	deleteDriver = () => {

	}

	async submitPost() {
		try {
			const requestURL = "http://localhost:7000/driver/postDriver";
			const res = await fetch(requestURL, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: this.refs.first_name.current.value,
					lastName: this.refs.last_name.current.value,
				}),
			});
			const resJSON = await res.json();
			this.errorDisplay(res, resJSON);
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
					{this.state.showSearched ? this.state.searchedFiles : this.state.driverRender}
				</div>
				<ManageAddModal submit={this.addSensor} show={this.state.showAddModal} toggleAddModal={this.toggleAddModal} labels={["First Name", "Last Name"]} title={"Add Driver"} />
			</div>
		)
	}
}

export default DriverDash;
