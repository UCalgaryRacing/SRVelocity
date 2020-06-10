import React from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import Member from "./memberView";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
import { withRouter } from "react-router-dom";

class TeamDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			memberRender: [],
			showAddModal: false,
			searchedMembers: []
		}
	}

	componentWillMount = () => {
		this.createTeamMemberList();
	}

	async createTeamMemberList() {
		try {
			const members = await this.fetchTeamMembers();
			await this.renderTeamMembers(members);
		} catch (err) {
			console.log(err);
		}
	}

	fetchTeamMembers = async () => {
		try {
			let res = await fetch(
				"http://localhost:7000/teamMember/getAllTeamMembers",
				{
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res.status == 401) {
				console.log("LOG IN REQUIRED");
				this.props.history.push("/signin");
			}
			res = await res.json();
			return await res;
		} catch (err) {
			console.log(err);
		}
	};

	renderTeamMembers = async (members) => {
		let render = [];
		if (members != null) {
			members.forEach((ele) => {
				render.push(
					<ManageBox
						labels={["First Name", "Last Name", "Email", "Subteam"]}
						values={[ele.first_name, ele.last_name, ele.email, ele.subteam_name]}
						ID={ele.member_id}
						key={ele.member_id}
						deleteSensor={this.deleteMember}
					/>
				);
			});
		}
		this.setState({ memberRender: render });
	}

	deleteMember = () => {

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
					{this.state.showSearched ? this.state.searchedFiles : this.state.memberRender}
				</div>
				<ManageAddModal submit={this.addSensor} show={this.state.showAddModal} toggleAddModal={this.toggleAddModal} labels={["First Name", "Last Name", "Email", "Subteam"]} title={"Add Team Member"} />
			</div>
		)
	}
}

export default withRouter(TeamDash);
