import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import { Figure, Container, Card, CardGroup, CardDeck } from 'react-bootstrap';
import './about.css';

class Member extends React.Component {
    render = () => {
        return (
            <div style={{ paddingBottom: '20px' }}>
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
                name: 'Tyler',
                src: require('../../assets/teamPictures/Tyler.jpg'),
                description: 'Electrical Lead'
            }, {
                name: 'Justin',
                src: require('../../assets/teamPictures/Justin.jpg'),
                description: 'Software Lead'
            }
        ];

        this.teamMembers = [
            {
                name: 'Jeremy',
                src: require('../../assets/teamPictures/Jeremy.jpg'),
                description: 'Software'
            },
            {
                name: 'Ryan',
                src: require('../../assets/teamPictures/Ryan.jpg'),
                description: 'Software'
            },
            {
                name: 'James',
                src: require('../../assets/teamPictures/James.jpg'),
                description: 'Software'
            },
            {
                name: 'Arham',
                src: require('../../assets/teamPictures/Arham.jpg'),
                description: 'Software'
            },
            {
                name: 'Will',
                src: require('../../assets/teamPictures/Will.jpg'),
                description: 'Electrical/Software'
            },
            {
                name: 'Kevin',
                src: require('../../assets/teamPictures/Kevin.jpg'),
                description: 'Electrical'
            },
            {
                name: 'Evan',
                src: require('../../assets/teamPictures/Evan.jpg'),
                description: 'Electrical Team'
            },
            {
                name: 'Yashvin',
                src: require('../../assets/teamPictures/Yashvin.jpg'),
                description: 'Electrical Team'
            },
            {
                name: 'Aidan',
                src: require('../../assets/teamPictures/Aidan.jpg'),
                description: 'Electrical Team'
            },
            {
                name: 'Graison',
                src: require('../../assets/teamPictures/nopic.png'),
                description: 'Electrical Team'
            }
        ];

        this.teamLeads = this.teamLeads.map(member => {
            return <div style={{ textAlign: 'center' }}>
                <Member name={member.name} src={member.src} description={member.description} />
            </div>
        });

        this.teamMembers = this.teamMembers.map(member => {
            return <div style={{ textAlign: 'center' }}>
                <Member name={member.name} src={member.src} description={member.description} />
            </div>
        });
    }


    render = () => {
        return (
            <div id='aboutPage' style={{ marginTop: '80px' }}>
                <TopNav />
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
            </div>
        );
    }
}