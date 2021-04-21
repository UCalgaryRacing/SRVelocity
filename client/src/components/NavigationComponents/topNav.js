import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './_styling/topNav.css';
import handleLogout from '../../pages/signin'


export default class TopNav extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      //editMode: false,
      //optionRender: [],
      //isLoggedIn: false,
    };

    this.name = sessionStorage.getItem("Name");
    
    if(this.name == "" || this.name == null)
    {
        this.isLoggedIn = false;
    }
    else
    {
        this.isLoggedIn = true;
    }
  }


handleLogout = async () => {
		try{
			    const res = await fetch("/teamMember/logout", )
            
                //this.setState({isLoggedIn: false})
                this.isLoggedIn = false;

                if (!res.ok) {
                    throw new Error(res.status);
                }

            sessionStorage.clear();

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
                        <Nav.Link className="link-streaming" href="/streaming">Streaming</Nav.Link> 
                        <Nav.Link className="link-historical" href="/historical">Historical</Nav.Link> 
                        <Nav.Link className="link-manage" href="/manage">Manage</Nav.Link>
                    </Nav>
                    <Nav className='about'>
                        <div>
                            {this.isLoggedIn ? 
                                <Nav.Link className="link-user" href="/">{this.name}</Nav.Link>
                                :   <Nav.Link className="link-login" href="/signin">Login</Nav.Link> 
                            }
                        </div>
                        <div>
                            {this.isLoggedIn ?
                            <Nav.Link className="link-logout" href = "/" onClick={this.handleLogout}>Logout</Nav.Link>  
                            : <Nav.Link className="link-signup" href = "/signup">Sign Up</Nav.Link>  
                            }
                        </div> 
                        <Nav.Link className="link-about" href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
               </Navbar> 
            </header>
        );
    }
}