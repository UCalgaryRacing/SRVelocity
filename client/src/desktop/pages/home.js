import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import "../styling/home.css";

export default class HomePage extends React.Component {
	render = () => {
		return (
			<div id="homePage">
				<TopNav />
				<Jumbotron>
					<Row id="row1">
						<Col>
							<img
								id="logoImg"
								src={require("../../assets/logo.svg")}
								alt="Schulich Racing"
							/>
						</Col>
					</Row>
					<Row id="row2">
						<Col>
							<p id="welcomeHeader" style={{fontSize: 'calc(0.9vw + 0.4vh + 0.8em)'}}>
								<b>Welcome to Schulich Velocity!</b>
							</p>
							<p id="infoPara" style={{fontSize: 'calc(0.9vw + 0.4vh + 0.8em)', textAlign: 'justify'}}>
								Schulich Velocity is telemetry software created for the SR21.
								It is capable of receiving data from the SR21 at 60 Hz. This
								data is stored, plotted, and analyzed in various ways to help
								us make data driven decisions.
                			</p>
							<Button id="streamingButton" href="/streaming" style={{marginTop: '30px', width: '100%', fontSize: 'calc(0.9vw + 0.4vh + 0.8em)'}}>
								<b>Go to Streaming</b>
							</Button>
						</Col>
					</Row>
				</Jumbotron>
				<BottomNav />
			</div>
		)
	}
}
