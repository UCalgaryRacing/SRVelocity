import React from "react";
import TeamList from "./teamMemberComponents/teamList";
import SensorDash from "./sensorComponents/sensorDash";
import VehicleDash from "./vehicleComponents/vehicleDash";
import DriverDash from "./driverComponents/driverDash";
import BottomNav from '../navigationComponents/bottomNav';

export default class ManageContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "Sensors",
			marginLeft: window.innerWidth < 1000 ? "0px" : "64px",
			toggleDash: false,
			sideOpen: false
		};
	}

	componentWillMount = () => {
		window.addEventListener("resize", this.updateMargin);
	}

	updateMargin = () => {
		if (window.innerWidth < 1000) {
			this.setState({
				marginLeft: "0px"
			});
		} else {
			this.setState({
				marginLeft: this.state.sideOpen ? '240px' : '64px'
			});
		}
	}

	changeContent = (newContent) => {
		this.setState({ content: newContent });
		this.forceUpdate();
	};

	changeLeftMargin = () => {
		this.setState({
			marginLeft: this.state.marginLeft === "64px" ? "240px" : "64px",
		});
	};

	render() {
		return (
			<div
				id="managementPage"
				style={{
					transition: "all 0.15s",
					marginLeft: this.state.marginLeft,
				}}
			>
				{this.state.content === "Sensors" ? <SensorDash marginLeft={this.state.marginLeft} /> : null}
				{this.state.content === "Drivers" ? <DriverDash /> : null}
				{this.state.content === "Vehicles" ? <VehicleDash /> : null}
				{this.state.content === "People" ? <TeamList /> : null}
				<BottomNav />
			</div>
		);
	}
}
