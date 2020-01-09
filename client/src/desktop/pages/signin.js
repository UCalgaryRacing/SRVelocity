import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import { Jumbotron, Row, Col, FormGroup, Form, Button} from 'react-bootstrap';
import '../styling/signin.css';

export default class SignInPage extends React.Component {
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
                <TopNav />
                <Jumbotron>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <img src={require('../../assets/logo.svg')} style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}/>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <Form className='emailForm'>
                                <Form.Control className='emailFormControl' ref={this.emailForm} autoComplete='on' placeHolder='Email' required />
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form className='passwordForm'>
                                <Form.Control className='passwordFormControl' ref={this.passwordForm} type='password' autoComplete='on' placeHolder='Password' required />
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='signInButton' onClick={this.handleSignIn}><b>Sign In</b></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='forgotPasswordButton' onClick={this.handleForgotPassword}><b>I Forgot My Password</b></Button>
                        </Col>
                    </Row>
                </Jumbotron>
                <BottomNav/>
            </div>
        );
    }
}