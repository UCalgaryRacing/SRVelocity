import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import '../styling/privacy.css';

export default class PrivacyPage extends React.Component {
    render = () => {
        return (
            <div id='privacy'>
                <TopNav/>
                <div id='privacyPolicyPage'>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <p id='largeFont'><b>Privacy Policy</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p id='subHeaderFont'><b>PLEASE READ THIS POLICY CAREFULLY BEFORE USING THIS WEBSITE</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{ fontSize: '17px', textAlign: 'center'}}>Last Updated: August 17, 2019</p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>

                    <Jumbotron>

                        <Row>
                            <p id='headerFont'><b>1. Acceptance of Privacy Policy</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing and/or its related, associated,
                                affiliated, successor and subsidiary entities, (collectively, “<b>Schulich Racing</b>”,
                                “<b>we</b>”, “<b>us</b>” and “<b>our</b>”) are committed to protecting your Personal
                                Information (as defined below). This Privacy Policy (the “<b>Policy</b>”) governs
                                the collection, use and disclosure of your Personal Information in any communication
                                or interaction you may have with us, whether it be in-person, over the telephone,
                                in writing, or electronic. Schulich Racing complies with all of the requirements of
                                Canada’s privacy legislation, the Personal Information Protection and Electronic
                                Documents Act and substantially similar provincial legislation. By submitting
                                your Personal Information, and using Schulich Racing’s services or website (the “<b>Site</b>”),
                                you accept this Policy and consent to its terms and as otherwise described
                                to you at the time of collection of your Personal Information. If
                                you do not agree to the terms of this Policy, please do not use the Site.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>2. Policy amendments</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                This Policy may be modified, revised or updated at Schulich Racing’s discretion, at anytime,
                                without notice to you. Please check back from time to time for
                                such amendments. By continuing to view, browse, or use the Site following any
                                such modification or revision, you agree to be bound by such modification or revision.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>3. What is personal information?</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                “<b>Personal Information</b>” is information about an identifiable individual, including but
                                not limited to, your name, residential address and e-mail address, and your views
                                and personal opinions. Publicly available information, such as business
                                contact information or a public directory listing of your name, address, telephone number
                                or information that is aggregated and not associated with a specific
                                individual, including demographic information and statistics, is not typically
                                considered Personal Information.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>4. What personal information will Schulich Racing collect?</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                We will only request Personal Information from you that is necessary to establish,
                                manage, and maintain our relationship with you. Personal Information is collected
                                by Schulich Racing when you provide it to us, such as when you subscribe for alerts,
                                request event reminders, or contact us through a contact form. We may also collect
                                your IP address when you use the Site and we keep track of your dealings with us,
                                including details of your visits to our Site and the resources that you access,
                                including, but not limited to, traffic data, location data, weblogs and other communication data.
                            </p>
                            <p id='smallFont'>
                                We may also receive Personal Information from our business partners and other third parties,
                                provided that such third parties confirm to us that they have obtained your consent or we have
                                obtained your consent in this regard.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>5. What other information will Schulich Racing collect?</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                We collect certain technical information which is recorded by the standard operation of
                                our Internet servers on an anonymous basis, such as the operating system and type of browser
                                you are using, the sections of the Site you visit, the Site pages visited, and any content
                                you post to or download from the Site (“<b>Technical Information</b>”).
                            </p>
                            <p id='smallFont'>
                                This Technical Information is used on an aggregate basis and in a non-personally identifiable
                                form, including: (i) for Site and system administration purposes; (ii) to improve the Site;
                                (iii) to conduct internal reviews of the number of visitors to theSite; (iv) to help us better
                                understand visitors’ use of our Site; (v) to respond to specific requests from our visitors; and
                                (vi) to protect the security or integrity of our Site when necessary. Schulich Racing’s servers may
                                also automatically record information when you visit our Site, including the URL that directed
                                you to our Site, your IP address, browser type and the date and time of your visit.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>6. Cookies</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                When you view the Site, we generally collect and store some information on your computer.
                                This information will be stored in a “Cookie,” which is a file created on your computer’s
                                hard drive, and will help us in many ways. For example, Cookies allow us to tailor the Site
                                to better match your interests and preferences. With most Internet browsers, you can erase
                                Cookies from your computer hard drive, block the creation of Cookies, or receive a warning
                                before a Cookie is stored, although doing so may affect your use of the Site and your ability
                                to access certain features of the Site. Please refer to your browser instructions or the help
                                section of your browser to learn more about these functions.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>7. Other technologies</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Our Site may use various Web analytics tools such as, but not limited to, pixel tracking,
                                tagging, gif, or other technologies. When you access certain parts of our web pages, a
                                non-identifiable notice of that visit is generated which may be processed by us. These
                                technologies usually work in conjunction with Cookies. If you don’t want your Cookie
                                information to be associated with your visits to these pages, you can set your browser
                                to turn off Cookies. If you turn off Cookies, Web analytics tools and technologies will
                                still detect visits to these pages, but the notices they generate cannot be associated
                                with other non-identifiable Cookie information and are disregarded.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>8. How will Schulich Racing use the information we collect?</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing collects and discloses your Personal Information for the following purposes:
                            </p>
                            <ul style={{ listStyleType: 'disc', fontSize: '17px', textAlign: 'justify' }}>
                                <li>to contact and correspond with you</li>
                                <li>to respond to your communications and requests</li>
                                <li>to meet legal, regulatory, audit, security and financial requirements under federal and provincial regulations</li>
                                <li>to maintain business records for reasonable periods of time</li>
                                <li>to conduct market research and gather demographic and statistical information about our users, for managing our business</li>
                                <li>for advertising our products and services in ways that are specifically targeted to you</li>
                                <li>at your option, to make you aware of Schulich Racing projects that may be of interest to you.</li>
                            </ul>
                            <p id='smallFont'>
                                Also, we may send you information about Schulich Racing, if you consent to receive such information or we have
                                implied consent under applicable law to do so. If so, your Personal Information will also be used to contact
                                you or to send you e-mail materials and other mailings about productions or projects that might be of interest
                                to you. You always have the option to unsubscribe from such mailings, to tell us not to share your Personal
                                Information with third parties, or to exclude you from offers for targeted advertising.
                            </p>
                            <p id='smallFont'>
                                We may be involved in the sale or transfer of some or all of our business or another prospective business transaction.
                                As part of that prospective business transaction, we may disclose your Personal Information to the acquiring organization,
                                inaccordance with applicable law.
                            </p>
                            <p id='smallFont'>
                                Limited disclosure of Personal Information to third party service providers may be required as part
                                of Schulich Racing fulfilling its stated business duties and day-to-day operations. However, information
                                will only be disclosed to such persons if they have entered into an agreement with us to abide by this
                                Policy.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>9. Processing of personal information</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Your Personal Information may be processed and stored outside of the province/territory
                                in which you reside and/or outside of Canada. Under the laws of these other jurisdictions,
                                in certain circumstances foreign courts, law enforcement agencies or regulatory agencies
                                may be entitled to access your Personal Information without notice to you. By submitting
                                your Personal Information, you agree to this transfer, storing, or processing.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>10. Consent</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                By providing us with your Personal Information, you consent to our using your Personal
                                Information for the purpose set forth above. Other than as required by law, your Personal
                                Information will not be used for any other purpose without your consent. You can at any
                                time withdraw your consent to some or all of these uses by contacting our Privacy Officer
                                at the address set forth below.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>11. Security</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Technical, contractual, administrative, and physical security measures and safeguards,
                                such as locked cabinets, restricted access and the use of passwords and firewalls have
                                been adopted to protect your Personal Information against loss or theft, as well as
                                unauthorized access, disclosure, copying, use or modification.
                            </p>
                            <p id='smallFont'>
                                Information collected from our Site is kept in a safe and secure system.  However, no
                                Internet or email transmission is ever fully secure or error free. In particular, email
                                sent to or from the Site may not be secure. Therefore, you should take special care in
                                deciding what information you send to us via email. Please keep this in mind whenever
                                disclosing any Personal Information to us via the Internet.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>12. Links to other sites</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                The Site may contain links to independently owned, controlled and/or managed third party,
                                Web or Internet sites to which the Policy does not apply. If you select such a link, you
                                will leave the Schulich Racing Site. Please note that we do not monitor or control the content
                                that appears on these third-party sites and such content may be constantly changing. If
                                you view these third-party sites, the sites may assign a Cookie. Schulich Racing does not control
                                these Cookies, nor is it responsible for any marketing or other use of your information by these
                                third parties. All Personal Information you provide via those third-party sites will be governed
                                by the privacy policies applicable to those sites and not this Policy.  We encourage you to review
                                all such privacy policies before you provide any Personal Information to third-party sites.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>13. How to correct your personal information</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing wants to ensure that information about you is accurate, complete and current.
                                Please inform Schulich Racing of any change of name, address or other information. In addition,
                                you have the right to access the Personal Information that Schulich Racing has collected, stored,
                                and disclosed about you, subject to any legal restrictions. If there are errors in the
                                information in your files, you may request that it be changed. If we have disclosed inaccurate
                                information about you to a third party, we will be pleased to contact the third party in order
                                to advise them of the error.
                            </p>
                            <p id='smallFont'>
                                In order to access this information, you must put your request in writing to our Privacy Officer,
                                at the contact information set out below.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>14.How to access your personal information</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                If you have any questions, concerns or would like more information about the collection,
                                use or disclosure of your Personal Information by Schulich Racing, or if you simply want to
                                know whether we have any of your Personal Information on file, you may contact our Privacy
                                Officer at the following address:
                            </p>
                            <p id='smallFont'>
                                e-mail: justintijunel@gmail.com<br />
                                mail: 132 Millbank Close SW, T2Y 2E5
                            </p>
                            <p id='smallFont'>
                                If Schulich Racing refuses access to you, it will provide you with the reasons for its refusal upon request.
                                Exceptions may include information that contains references to other individuals, information that cannot
                                be disclosed for legal, security or commercial proprietary reasons, and information that is subject to
                                solicitor-client or litigation privilege.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>15. You acknowledge that you have read and agree to this Privacy Policy</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                YOU ACKNOWLEDGE THAT YOU HAVE READ THIS PRIVACY POLICY, UNDERSTAND IT AND AGREE TO ALL OF THE TERMS AND
                                CONDITIONS IN THIS PRIVACY POLICY. BY CONTINUING TO BROWSE THIS SITE, YOU WILL BE LEGALLY GRANTING YOUR
                                CONSENT TO SCHULICH RACING’S COLLECTION, USE AND DISCLOSURE OF YOUR PERSONAL INFORMATION IN ACCORDANCE WITH
                                THIS PRIVACY POLICY EVEN IF YOU HAVE NOT READ THIS PRIVACY POLICY. IF YOU DO NOT CONSENT, PLEASE DO NOT
                                USE THIS SITE OR OTHERWISE PROVIDE YOUR PERSONAL INFORMATION TO US.
                            </p>
                        </Row>
                    </Jumbotron>
                </div>
                <BottomNav/>
            </div >
        );
    }
}