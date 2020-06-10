import React from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import Member from "./memberView";
import ManageBox from '../manageBox';
import ManageAddModal from '../manageAddModal';
import { withRouter } from "react-router-dom";
var _ = require('lodash');

class TeamDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			memberRender: [],
			showAddModal: false,
			searchedMembers: [],
			showSearched: false
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
				"18.217.215.72:7000/teamMember/getAllTeamMembers",
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
						delete={this.deleteMember}
						submitEdit={this.submitEdit}
					/>
				);
			});
		}
		this.setState({ memberRender: render });
	}

	submitEdit = async (data, ID) => {
		const requestURL = "18.217.215.72:7000/teamMember/" + ID;
		return fetch(requestURL, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: data[0],
				lastName: data[1],
				email: data[2],
				subteamName: data[3],
				isLead: false,
				isApproved: false
			})
		})
			.then(res => {
				if (res.ok) return true;
				else{
					//show error
					return false;
				}
			})
			.catch(err => {
				return false;
			})
	}

	deleteMember = (ID) => {
		const requestURL = "18.217.215.72:7000/teamMember/" + ID;
		fetch(requestURL, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => {
				if (res.ok) {
					for (var el in this.state.memberRender) {
						if (parseInt(this.state.memberRender[el].key) === ID) {
							let temp = this.state.memberRender;
							temp.splice(el, 1);
							this.setState({ memberRender: temp });
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

	search = (e) => {
		e.preventDefault();
		const text = e.target.value;
		if (text === "") {
			this.setState({ showSearched: false });
			return;
		}
		var filtered = [...this.state.memberRender]
		function filterParam(param, index, value) {
			return filtered.filter(file => file.props[param][index].toLowerCase().includes(value.toLowerCase()))
		}
		var fNameFilter = filterParam('values', 0, text);
		var lNameFilter = filterParam('values', 1, text);
		var emailFilter = filterParam('values', 2, text);
		let temp = _.unionBy(fNameFilter, lNameFilter, 'key');
		filtered = _.unionBy(temp, emailFilter, 'key');
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
					<Button id='sortButton' style={{ marginLeft: '0px' }} onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Sort Data</b></Button>&nbsp;&nbsp;
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
