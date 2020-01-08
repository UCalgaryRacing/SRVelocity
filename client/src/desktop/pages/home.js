import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import '../styling/home.css';

export default class HomePage extends React.Component {
    render = () => {
        return (
            <div id='homePage'>
                <TopNav />
                <Jumbotron>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <img src={require('../../assets/logo.svg')} style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }} />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <p style={{ fontSize: '3rem', marginTop: '20px' }}>
                                <b>Welcome to Schulich Velocity!</b>
                            </p>
                            <p style={{ fontSize: '2rem', marginTop: '20px' }}>
                                Schulich Velocity is telemetry software created for the SR21. It is capable of receiving data from the SR21 at 10 Hz, plotting it, and performing other analysis that
                                helps us understand how the car is performing in real time. 
                            </p>
                            <Button id='streamingButton' href='/streaming'>
                                <b>Go to Streaming</b>
                            </Button>
                        </Col>
                    </Row>
                </Jumbotron>
                <BottomNav />
            </div>
        );
    }
}