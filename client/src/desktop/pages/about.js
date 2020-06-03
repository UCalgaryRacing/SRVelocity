import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import { Figure, Container  } from 'react-bootstrap'

class Member extends React.Component {
    render = () => {
        return (
            <div>
                <Figure>
                    <Figure.Image
                        width={200}
                        height={200}
                        src={this.props.src}
                        roundedCircle
                    />
                </Figure>
                    <p fontWeight='bold'>
                        {this.props.name}
                    </p>
                    <p style={{opacity: '0.5'}}>
                        {this.props.description}
                    </p>
            </div>
        )
    }
}

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props)

        this.teamLeads =[
        {   name: 'Tyler',
            src: require('../../assets/teamPictures/Tyler.jpg'),
            description: 'Electrical Team Lead'
        }, {
            name: 'Justin',
            src: require('../../assets/teamPictures/Justin.jpg'),
            description: 'Software Team Lead'
        }
        ]

        this.teamMembers = [
        {   name: 'Jeremy',
            src: require('../../assets/teamPictures/Jeremy.jpg'),
            description: 'Software Team'
        }, 
        
        {   name: 'Ryan',
            src: require('../../assets/teamPictures/Ryan.jpg'),
            description: 'Software Team'
        },
        {   name: 'Kevin',
            src: require('../../assets/teamPictures/Kevin.jpg'),
            description: 'Software Team'
        },
        {   name: 'Will',
            src: require('../../assets/teamPictures/Will.jpg'),
            description: 'Electrical Team'
        },
        ,
        {   name: 'Evan',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Electrical Team'
        },
        ,
        {   name: 'James',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Software Team'
        },
        {   name: 'James',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Software Team'
        },
        {   name: 'Graison',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Electrical Team'
        },
        {   name: 'Yashvin',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Electrical Team'
        },
        {   name: 'Arham',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Software Team'
        },
        {   name: 'Aidan',
            src: require('../../assets/teamPictures/nopic.png'),
            description: 'Electrical Team'
        }
        ]

        this.teamLeads = this.teamLeads.map( member => {
            return <div style={{display: 'inline-block', width:'50%', textAlign: 'center'}}>
                <Member name={member.name} src={member.src} description={member.description}/>
                </div>
            })


        this.teamMembers = this.teamMembers.map( member => {
            return <div style={{display: 'inline-block', width:'25%'}}>
                <Member name={member.name} src={member.src} description={member.description}/>
                </div>
            })
    }


    render = () => {
        return (
            <div id='aboutPage' style={{marginTop: '80px'}}>
                <TopNav/>
                <p style={{
                    textAlign:'center', 
                    fontSize:'large', 
                    borderBottomStyle:'solid', 
                    borderBottomColor:'red',
                    paddingBottom:'20px',
                    marginBottom: '50px'}}>
                    Meet the Team
                </p>
                <div style={{marginLeft: '40px', marginBottom: '30px'}}>
                    <Container fluid>
                        {this.teamLeads}
                    </Container>
                </div>
                <div style={{margin:'30px', marginLeft: '40px', marginRight: '40px'}}>
                    <Container fluid>
                        {this.teamMembers}
                    </Container>
                </div>
            </div>
        );
    }
}