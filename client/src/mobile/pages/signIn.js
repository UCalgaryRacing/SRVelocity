import React from 'react';
import TopNavM from '../componentsM/navigationComponentsM/topNavM'
import { Jumbotron, Row, Col, FormGroup, Form, Button, Container } from 'react-bootstrap';
export default class SignInPageM extends React.Component {

    constructor(props) {
        super(props);
        this.emailForm = React.createRef();
        this.passwordForm = React.createRef();
    }

    handleEnterKey = () => {

    }

    handleSignIn = () => {

    }

    handleForgotPassword = () => {

    }

    render = () => {
        return (
            <div id='signIn'>
                <TopNavM />
                <Jumbotron className="w-responsive text-center mx-auto p-3 mt-5">

                    <img src={require('../../assets/logo.svg')} style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }} />
                    <Form className='emailForm' >
                        <Form.Control className='emailFormControl' ref={this.emailForm} autoComplete='on' placeHolder='Email' required />
                    </Form>
                    <Form className='passwordForm'>
                        <Form.Control className='passwordFormControl' ref={this.passwordForm} type='password' autoComplete='on' placeHolder='Password' required />
                    </Form>
                    <Button className='signInButton' onClick={this.handleSignIn}><b>Sign In</b></Button>
                    <Button className='forgotPasswordButton' onClick={this.handleForgotPassword}><b>I Forgot My Password</b></Button>

                </Jumbotron>
            </div >
        );
    }
}