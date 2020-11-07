import React from 'react';
import { Figure, Card, CardDeck } from 'react-bootstrap';
import BottomNav from "../components/NavigationComponents/bottomNav";
import TopNav from '../components/NavigationComponents/topNav';
import './_styling/about.css';
import { SocialIcon } from 'react-social-icons';

class Member extends React.Component {
    render = () => {
        return (
            <div id="memberCard" style={{ paddingBottom: '20px' }}>
                <Card border='light'>
                    <Card.Body>
                        <Figure.Image
                            width={250}
                            height={250}
                            src={this.props.src}
                            roundedCircle
                        />
                        <Card.Title fontWeight='bold'>
                            {this.props.name}
                        </Card.Title>
                        <Card.Text style={{ opacity: '0.5' }}>
                            {this.props.description}
                        </Card.Text>
                        
                        <div id='socialMedia'>
                        {this.props.linkedin ? 
                        <SocialIcon id='linkedin' url={this.props.linkedin} target='_blank' />
                            : null }
                        </div>
                        
                    </Card.Body>

                </Card>
            </div>
        )
    }
}

//Add what it can do, design, etc github

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.teamLeads = [
            {
                name: 'Kevin',
                src: require('../assets/teamPictures/Kevin.jpg'),
                description: 'Electrical Lead'
            },
            {
                name: 'Tyler',
                src: require('../assets/teamPictures/Tyler.jpg'),
                description: 'Electrical Lead',
                linkedin: 'http://linkedin.com/in/tyler-sawatzky'
            }, 
            {
                name: 'Justin',
                src: require('../assets/teamPictures/Justin.jpg'),
                description: 'Software Lead',
                linkedin: 'https://www.linkedin.com/in/justintijun/'
            },
            {
                name: 'Jeremy',
                src: require('../assets/teamPictures/Jeremy.jpg'),
                description: 'Software Lead'
            }
        ];

        this.teamMembers = [
            {
                name: 'Ryan',
                src: require('../assets/teamPictures/Ryan.jpg'),
                description: 'Software',
                linkedin: 'https://www.linkedin.com/in/ryan-ward-3177b61a1/'
            },
            {
                name: 'James',
                src: require('../assets/teamPictures/James.jpg'),
                description: 'Software',
                linkedin: 'https://www.linkedin.com/in/james-nguy-4629a11b9/'
            },
            {
                name: 'Camilla',
                src: require('../assets/teamPictures/Camilla.jpg'),
                description: 'Software',
                linkedin: 'https://www.linkedin.com/in/camilla-abdrazakov-4b077b1b2/'
            },
            {
                name: 'Jon',
                src: require('../assets/teamPictures/nopic.png'),
                description: 'Software',
                linkedin: 'https://www.linkedin.com/in/jonathan-mulyk-2b91471b2/'
            },
            {
                name: 'Justin',
                src: require('../assets/teamPictures/nopic.png'),
                description: 'Software',
                linkedin: 'www.linkedin.com/in/justinf34'
            },
            {
                name: 'Arham',
                src: require('../assets/teamPictures/Arham.jpg'),
                description: 'Software'
            },
            {
                name: 'Aidan',
                src: require('../assets/teamPictures/Aidan.jpg'),
                description: 'Electrical'
            },
            { 
                name: 'Yashvin',
                src: require('../assets/teamPictures/Yashvin.jpg'),
                description: 'Electrical'
            },
            {
                name: 'Will',
                src: require('../assets/teamPictures/Will.jpg'),
                description: 'Electrical/Software Alumni'
            },
            {
                name: 'Evan',
                src: require('../assets/teamPictures/Evan.jpg'),
                description: 'Electrical Alumni'
            },
            {
                name: 'Graison',
                src: require('../assets/teamPictures/nopic.png'),
                description: 'Electrical Alumni'
            }
        ];

        this.teamLeads = this.teamLeads.map(member => {
            return <div style={{ textAlign: 'center' }}>
                <Member name={member.name} src={member.src} description={member.description} linkedin={member.linkedin}/>
            </div>
        });

        this.teamMembers = this.teamMembers.map(member => {
            return <div style={{ textAlign: 'center' }}>
                <Member name={member.name} src={member.src} description={member.description} linkedin={member.linkedin}/>
            </div>
        });
    }


    render = () => {
        return (
            <div id='aboutPage' style={{ marginTop: '80px' }}>
                <p style={{
                    textAlign: 'center',
                    fontSize: 'xx-large',
                    borderBottomStyle: 'solid',
                    borderBottomColor: '#C22E2D',
                    paddingBottom: '20px',
                    marginBottom: '50px'
                }}>
                    Meet the Makers
                </p>
                <CardDeck style={{ justifyContent: 'center' }}>
                    {this.teamLeads}
                </CardDeck>
                <CardDeck style={{ justifyContent: 'center' }}>
                    {this.teamMembers}
                </CardDeck>
                <TopNav/>
                <BottomNav/>
            </div>
        );
    }
}