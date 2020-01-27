import React from 'react';
import TopNavM from '../componentsM/navigationComponentsM/topNavM';
import { Button } from 'react-bootstrap';
import '../../desktop/styling/home.css';


export default class HomePageM extends React.Component {
    render = () => {
        return (
            <>
                <TopNavM />
                <img src={require('../../assets/logo.svg')} style={{ width: '80%', marginLeft: '40px', marginBottom: '10px', marginTop: '100px' }} />
                <p style={{ fontSize: '2rem', marginTop: '20px', textAlign: 'center' }}>
                    <b>Welcome to Schulich Velocity!</b>
                </p>
                <p style={{ fontSize: '1rem', marginTop: '20px', textAlign: 'center' }}>
                    Schulich Velocity is telemetry software created for the SR21. It is capable of receiving data from the SR21 at 10 Hz, plotting it, and performing other analysis that
                    helps us understand how the car is performing in real time.
                </p>
                <p style={{ fontSize: '1rem', marginTop: '40px', textAlign: 'center' }}>
                    Click the link below to get started with streaming.
                </p>
                <Button id='streamingButtonM' href='/streaming' style={{ width: '200px', height: '50px', backgroundColor: 'red', border: 'none', marginLeft: '80px', marginTop: '5px' }}>
                    <b style={{ fontSize: '22px' }}>Go to Streaming</b>
                </Button>
            </>
        );
    }
}      
