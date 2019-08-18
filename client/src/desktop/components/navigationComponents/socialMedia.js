import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../../styling/socialMedia.css';

export default class SocialMedia extends React.Component {
    render = () => {
        return (
            <div id='socialMedia'>
                <SocialIcon id='facebook' url='https://www.facebook.com/schulichracing/' target='_blank'/>
                <SocialIcon id='instagram' url='https://www.instagram.com/schulich_fsae/' target='_blank' />
                <SocialIcon id='linkedin' url='https://www.linkedin.com/company/schulich-racing/' target='_blank' />
            </div>
        );
    }
}