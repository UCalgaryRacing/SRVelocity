import React from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './_styling/topNav.css';
import handleLogout from '../../pages/signin'


export default class TopNav extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      //editMode: false,
      //optionRender: [],
      isLoggedIn: false,
      name: "",
    };

    this.name = sessionStorage.getItem("Name");
    
    if(this.name == "")
    {
        this.isLoggedIn = false;
        this.name = "Login"
    }
    else
    {
        this.isLoggedIn = true;
    }
  }


handleLogout = async () => {
		try{
			    const res = await fetch("/teamMember/logout", )
            
                this.setState({isLoggedIn: false})

                if (!res.ok) {
                    throw new Error(res.status);
                }

            sessionStorage.clear();

			sessionStorage.setItem("Name", "");
			sessionStorage.setItem("ID", "");
			this.props.refreshPage();
        
		} catch (err) {
			console.log(err);
		}
	}
    


    render = () => {
        return (
            <header>
                <Navbar id='top' collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand className="link-0" href="/"><b>SR Velocity</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='mr-auto'>
                        <Nav.Link className="link-1" href="/streaming">Streaming</Nav.Link> 
                        <Nav.Link className="link-2" href="/historical">Historical</Nav.Link> 
                        <Nav.Link className="link-3" href="/manage">Manage</Nav.Link>
                    </Nav>
                    <Nav className='about'>
                        <Nav.Link className="link-4" href="/signin" placeholder="Login"> {this.isLoggedIn ? this.name : 'Login'}</Nav.Link>
                        {/*<Nav.Link className="link-5" href="/signup" active="true" hidden="true" >Sign Up</Nav.Link>*/}
                        <Nav.Link className="link-6" href = "/" onClick={this.handleLogout}>Logout</Nav.Link>  
                        <Nav.Link className="link-7" href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
               </Navbar> 
            </header>
        );
    }
}