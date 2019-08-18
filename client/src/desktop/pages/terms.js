import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import '../styling/terms.css';

export default class TermsPage extends React.Component {
    render = () => {
        return (
            <div id='terms'>
                <TopNav />
                <div id='termsOfServicePage'>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <div className='col'>
                                    <p id='largeFont'><b>Terms Of Use</b></p>
                                </div>
                            </Row>
                            <Row>
                                <Col>
                                    <p id='subHeaderFont'><b>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE</b></p>
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
                            <p id='headerFont'><b>1. Acceptance of Terms of Use</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing and its related, associated, affiliated, successor and subsidiary entities (collectively
                                referred to as “<b>Schulich Racing</b>”, “<b>we</b>”, “<b>us</b>” and “<b>our</b>”) are pleased to provide this website (the “<b>Site</b>”) for
                                your personal, non-commercial use. By accessing, viewing or using the content, material or services available
                                through the Site, you agree to the terms and conditions provided below, as well as
                                Schulich Racing’s <a href='/privacy' id='privacy'>Privacy Policy</a> which is incorporated by this reference (collectively,
                                “<b>Terms and Conditions</b>”).
                            </p>
                            <p id='smallFont'>
                                If you do not agree to the <b>Terms and Conditions</b>, please do not use this Site. In the event
                                that any Schulich Racing website contains terms and conditions for the use of that site which conflict
                                with or are inconsistent with the Terms and Conditions, those terms and conditions will prevail and govern
                                to the extent of the conflict or inconsistency in connection with the use of that site.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>2. Changes to these Terms of Use</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing reserves the right to update, revise or modify these Terms and Conditions at any
                                time, without prior notice, by updating this posting. Any such updates, revisions or modifications
                                will become automatically effective at the time of posting. Your use of this Site following any such
                                update, revision, or modification constitutes your agreement to follow and be bound by such revision,
                                update or modification. We recommend you review these Terms and Conditions each time you use this Site.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>3. Ownership of Intellectual Property</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                The Site is owned and operated by Schulich Racing. Unless otherwise indicated, the contents
                                including without limitation, all logos, trademarks, service marks, trade-dress, texts, graphics,
                                images, and the collection, organization, arrangement and assembly of the contents of this Site
                                (collectively, the “<b>Content</b>”) are the property of Schulich Racing and are protected, without
                                limitation, pursuant to Canadian, U.S. and foreign intellectual property laws, including copyright,
                                trademark and other laws and regulations. You do not acquire any ownership rights to any Content
                                through your access to, or use of, the Site. Except as set out in the limited license next below,
                                no Content from this Site, either in  whole or in part, may be copied, reproduced, republished,
                                uploaded, posted, transmitted, archived, modified, sold or distributed in any way, without
                                Schulich Racing’s prior written consent. Modification of the Content or use of the Content for any other
                                purpose is a violation of Schulich Racing’s copyright, trademark and trade secret rights and others’
                                proprietary rights. The use of any Content on any other website, platform or networked computer
                                environment for any purpose is strictly prohibited.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>4. Limited License</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Subject to the terms and conditions in these Terms of Use, you may download one copy of the
                                Content on any single computer for your personal non-commercial use only, provided you keep
                                intact all copyright and other proprietary notices.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>5. Software</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                If you download software from the Site, the software, including any files, images incorporated
                                in or generated by the software, and data accompanying the Software (together, the “<b>Software</b>”),
                                are non-exclusively licensed to you by Schulich Racing solely for the non-commercial purpose of using
                                the Site. Schulich Racing does not transfer title in and to the Software to you. As between you and
                                Schulich Racing, we retain full and complete right, title, and interest in and to the Software and
                                all intellectual property rights in the Software. You may not redistribute, transmit, reproduce,
                                publish, license, rewrite, modify, create derivative works from, transfer, sell, decompile,
                                reverse-engineer or disassemble the Software or any component of the Site. Except as expressly
                                provided here, no license, or other right is granted by Schulich Racing, either directly or by
                                implication, estoppel or otherwise under these Terms and Conditions regarding any Content,
                                the Software, or any other intellectual property.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>6. Acceptable Site Use</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Users may not use the Site to transmit, distribute, store or destroy the Content or any
                                material: (a) in violation of any applicable law or regulation; (b) in a way that will infringe
                                the copyright, trademark, trade secret, or other intellectual property rights of others or
                                violate the privacy, publicity, or other personal rights of others; or (c) that is defamatory,
                                obscene, threatening, scandalous, inflammatory, profane, abusive or hateful. Users may use the
                                Site only for lawful purposes and incompliance with the Terms and Conditions.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>7. User Generated Content</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing may allow users to post content to the Site by making a comment on an article,
                                blog post, reviews, tagging or mentioning the Site or Schulich Racing on social media services,
                                or through other means by which text, files, images, photos, video, sounds, musical works,
                                works of authorship, or any other materials are posted to the Site (“<b>User Content</b>”). You are
                                solely responsible for any User Content you post or transmit through the Site and without
                                limiting the generality of that statement or limiting anything else contained in these Terms of
                                Use, you are agreeing to not post User Content that (i) discloses personally identifiable
                                information, (ii) is unlawful, threatening, obscene, vulgar, pornographic, profane  or indecent,
                                including any communication that constitutes (or encourages conduct that would constitute) a
                                criminal offense, gives rise to civil liability or otherwise violates any local, state, national
                                or international law, (iii) violates the copyright, trademark or other intellectual property rights
                                of any other person, (iv) improperly assumes or claims the identity, characteristics or
                                qualifications of another person, (v) is for purposes of spamming, (vi) contains any virus or
                                other harmful component, (vii) is libelous, defamatory, or an invasion of privacy or publicity rights
                                or any other third party rights, or (viii) includes pricing or promotional information.
                            </p>
                            <p id='smallFont'>
                                Despite these prohibitions, User Content provided by others may contain inaccurate, misleading,
                                inappropriate, unlawful material. Schulich Racing assumes no responsibility or liability for User
                                Generated Content. If you become aware of misuse of the Site through User Generated Content, please
                                contact Schulich Racing to report the material.
                            </p>
                            <p id='smallFont'>
                                The sender of any communications or User Generated Content to this Site or otherwise to us shall
                                be responsible for the content and information contained in such communications, including its
                                truthfulness and accuracy.
                            </p>
                            <p id='smallFont'>
                                Schulich Racing reserves the right, in its sole discretion, to reject, refuse to post or remove any
                                User Generated Content. However, Schulich Racing is not obligated to monitor or edit User Generated
                                Content. If at any time Schulich Racing chooses, in its sole discretion, to monitor or edit User Generated
                                Content, Schulich Racing none the less assumes no responsibility for anything submitted, no obligation to
                                modify or remove any inappropriate materials or information and no responsibility for the conduct of
                                any user. Schulich Racing does not endorse and has no control over what users post or submit to the Site
                                as User Generated Content. Schulich Racing makes no warranties, express or implied, as to the accuracy and
                                reliability of any material or information on the Site or posted as User Generated Content. You agree that
                                Schulich Racing accepts no liability whatsoever if it refuses to post your User Generated Content or removes it
                                from the Site.
                            </p>
                            <p id='smallFont'>
                                Schulich Racing does not claim any ownership rights in any User Generated Content. After posting User Generated
                                Content, you continue to retain any ownership rights you may have. However, by displaying, publishing or
                                posting your User Generated Content, you grant to Schulich Racing a limited license to use, modify, publicly
                                perform, publicly display, reproduce, and distribute your User Generated Content on or through the Site.
                                Schulich Racing will treat any User Generated Content as non-confidential and public. It is recommended that
                                you do not submit confidential or private information as User Generated Content. You also agree to permit
                                any other user of this Site to access, view, store or reproduce your User Generated Content for that other
                                user's personal use or otherwise in connection with use of the Site.
                            </p>
                            <p id='smallFont'>
                                The licenses you grant are non-exclusive (meaning you are free to license your User Generated Content to anyone
                                else in addition to Schulich Racing), fully-paid and royalty-free (meaning that Schulich Racing is not required to pay
                                you for the use of the User Generated Content), sub-licensable, and worldwide (because the Internet and this
                                Site are or may possibly be accessible from anywhere).
                            </p>
                            <p id='smallFont'>
                                You represent and warrant that: (i) you own the User Generated Content you post, or otherwise have the right(s)
                                to grant the license set forth herein, and (ii) the posting of your User Generated Content does not violate the
                                privacy rights, publicity rights, copyrights, contractual rights, or any other rights of any person.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>8. E-Commerce Transactions</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                The purchase of any products on the Site ("<b>Products</b>") may be made through the payment
                                processing services and applications available on this Site from time to time
                                (“<b>Payment Processing Services</b>”). To make a purchase on the Site, you maybe required
                                to complete an order form or other payment processing form. By completing this form, you
                                acknowledge that you are at least eighteen (18) years of age, and agree to pay Schulich Racing
                                for any Products that you order through the Site. You agree to review and comply with the user
                                agreements, terms and conditions, privacy policies, and other terms of the Payment Processing
                                Services you use through this Site when purchasing Products, as well as
                                Schulich Racing’s <a href='/privacy' id='privacy'>Privacy Policy</a>, all as may be amended from time to time.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>9. Security</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Users are prohibited from violating or attempting to violate the security of the Site,
                                including, without limitation: (a) accessing data not intended for such user or logging
                                into a server or account which the user is not authorised to access; (b) attempting to probe,
                                scan or test the vulnerability of a system or network or to breach security or authentication
                                measures without proper authorisation; (c) attempting to interfere with service to any user,
                                host or network, including, without limitation, via means of submitting a virus to the Site,
                                overloading, “spamming,” or “crashing”; or (d) engaging in "screen scraping" or "database scraping”
                                or similar practices. Violations of any system or network security may result in civil or criminal
                                liability. Schulich Racing will investigate occurrences which may involve such violations and may
                                involve and co-operate with law enforcement authorities in prosecuting users who are involved
                                in such violations.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>10. Privacy Policy</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                All personal information collected, used or disclosed in connection with the Site shall be
                            dealt with in accordance with our <a href='/privacy' id='privacy'>Privacy Policy</a>.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>11. Linking to or from this Site</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                This Site may provide links to third party websites for your convenience only. The inclusion
                                of these links does not imply that Schulich Racing monitors or endorses these websites. Schulich Racing
                                does not accept any responsibility for such websites or their content. We encourage you to
                                review the terms of use of each website visited before using those websites.
                            </p>
                            <p id='smallFont'>
                                Without our prior written consent, you agree not to: (i) create or maintain any link from another
                                website to any page on this Site; or (ii) run or display this Site or any Content in frames or through
                                similar means on another website; or (iii) or use any meta tags or any other "hidden text" using
                                Schulich Racing’s name or trademarks.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>12. Non-Solicitation Policy</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                In your communications with us or postings on the Site, please keep in mind that we
                                do not seek any unsolicited ideas or materials for products or services, or even suggested
                            improvements to products or services (collectively, “<b>Unsolicited Idea sand Materials</b>”).
                                                We shall be free to use or copy all or a portion of any Unsolicited Ideas and Materials you
                                                post on the Site or send to us, including any ideas, inventions, concepts, techniques or
                                                know-how disclosed, for any purposes. Such purposes may include disclosure to third parties
                                                and/or developing, creating and/or marketing goods or services.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>13. Disclaimer</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing MAKES NO REPRESENTATIONS OR WARRANTIES WITH RESPECT TO THIS SITE OR ITS CONTENTS,
                                WHICH ARE FOR INFORMATIONAL PURPOSES ONLY AND ARE PROVIDED FOR USE ON AN “AS IS, WHERE IS” BASIS
                                AND “AS AVAILABLE.” TO THE GREATEST EXTENT PERMITTED BY LAW, Schulich Racing DISCLAIMS
                                ALL REPRESENTATIONS, WARRANTIES, AND CONDITIONS, EXPRESS OR IMPLIED, OR ARISING BY STATUTE, USAGE,
                                CUSTOM OR OTHERWISE, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
                                FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO THIS SITE AND ANY WEBSITE WITH WHICH IT IS LINKED.
                                Schulich Racing DOES NOT WARRANT THE FUNCTIONS, INFORMATION OR LINKS CONTAINED ON THIS SITE NOR DOES IT
                                WARRANT THAT THE SITE’S CONTENTS WILL MEET YOUR REQUIREMENTS. Schulich Racing DOES NOT WARRANT THAT
                                THIS SITE OR ITS CONTENTS ARE FIT FOR ANY PARTICULAR PURPOSE OR THAT THE OPERATION OF THIS SITE
                                OR ITS CONTENTS WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THIS SITE
                                OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES, WORMS, TROJAN HORSES, OR OTHER HARMFUL
                                COMPONENTS. Schulich Racing DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS
                                OF THE USE OF THE MATERIALS ON THIS SITE IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY OR OTHERWISE.
                                YOU (AND NOT Schulich Racing) ASSUME THE ENTIRE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
                            </p>
                            <p id='smallFont'>
                                Schulich Racing SHALL HAVE THE RIGHT FOR ANY REASON, IN ITS SOLE DISCRETION, TO TERMINATE, CHANGE, SUSPEND
                                OR DISCONTINUE, TEMPORARILY OR PERMANENTLY, ANY ASPECT OF THE SITE, INCLUDING BUT NOT LIMITED TO CONTENT
                                AND USER GENERATED CONTENT, FEATURES AND HOURS OF AVAILABILITY, WITHOUT FURTHER NOTICE TO YOU.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>14. Limitation of Liability</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                YOU USE THIS SITE AND ITS CONTENT, INCLUDING ANY USER GENERATED CONTENT, AT YOUR OWN RISK.
                                UNDER NO CIRCUMSTANCES SHALL Schulich Racing BE LIABLE FOR ANY SPECIAL, INCIDENTAL, CONSEQUENTIAL,
                                COMPENSATORY, DIRECT OR INDIRECT DAMAGES, LOSS OF DATA, INCOME OR PROFIT OR DAMAGE TO PROPERTY
                                THAT RESULT FROM YOUR USE OF, OR YOUR INABILITY TO USE, THE SITE OR THE CONTENTS ON THE SITE
                                OR ANY USER GENERATED CONTENT, EVEN IF Schulich Racing OR AN Schulich Racing AUTHORISED REPRESENTATIVE
                                HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL Schulich Racing’S TOTAL LIABILITY
                                TO YOU FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION WHETHER INCONTRACT, OR NOT (INCLUDING, BUT NOT
                                LIMITED TO, NEGLIGENCE OR OTHERWISE) EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THIS SITE.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>15. Indemnity of User</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                You agree to defend, indemnify and hold harmless Schulich Racing, and each of its officers,
                                directors, employees, parents, shareholders, licensees, assigns and agents, from and against
                                any claims, actions or demands, including without limitation reasonable legal and accounting
                                fees, alleging or resulting from your use of the Content contained on the Site, in connection
                                with any User Generated Content you post or use, or your breach of the terms of these Terms
                                and Conditions. Schulich Racing shall provide notice to you promptly of any such claim, suit, or
                                proceeding and may assist you, in its sole discretion, at your expense, in defending any such
                                aim, suitor proceeding.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>16. Jurisdiction</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                By accessing the Site, you agree that the laws of the Province of Alberta and the laws
                                of Canada applicable therein will apply to all matters relating to your use of this Site,
                                without regard to rules relating to conflict of laws. Schulich Racing makes no claims that
                                the Contents may be lawfully viewed or downloaded outside of Canada.
                            </p>
                            <p id='smallFont'>
                                Access to the Contents may not be legal by certain persons or in certain countries.
                                If you access the Site from outside of Canada, you do so at your own risk and are responsible
                                for compliance with the laws of your jurisdiction. Any action relating to these Terms and
                                Conditions must be brought in Calgary, Alberta, Canada and you irrevocably consent to the
                                exclusive jurisdiction of the courts of Alberta, Canada.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>17. Relationships</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Your access to the Site and these Terms and Conditions do not create a legal relationship
                                between us or our respective officers, agents, or employees as partners, joint ventures,
                                fiduciaries, employer-employee, or agents of the other.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>18. Severability</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                If any provision of these Terms and Conditions shall be unlawful, void or for any
                                reason unenforceable, then that provision shall be deemed severable from these Terms
                                and Conditions and shall not affect the validity and enforceability of any remaining
                                provisions. These Terms and Conditions constitute the entire agreement between you
                                and Schulich Racing relating to the subject matter herein.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>19. Violations of Terms and Conditions</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                Schulich Racing reserves the right to seek all remedies available at law and in equity
                                for violations of these Terms and Conditions, including the right to block access
                                from a particular Internet address to our Site.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>20. Language</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                The parties have expressly required that these Terms of Use and all documents relating
                                thereto drawn up in the English language. Les parties ont demandé que cette convention
                                ainsi que tous les documents qui s’y rattachent soient rédigés en anglais.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>21. Termination</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                In our sole discretion, we may elect to cancel or terminate your ability to use the
                                Site, or any parts thereof, at any time without notice to you.
                            </p>
                        </Row>

                        <Row>
                            <p id='headerFont'><b>22. Entire Agreement</b></p>
                        </Row>
                        <Row>
                            <p id='smallFont'>
                                These Terms and Conditions, together with those incorporated or referred to herein,
                                constitute the entire agreement between us relating to the subject matter here of,
                                and supersede any prior understandings or agreements (whether electronic, oral or
                                written) regarding the subject matter, and may not be amended or modified except by
                                Schulich Racing as set forth above.
                            </p>
                        </Row>

                    </Jumbotron>
                    <BottomNav />
                </div>
            </div>
        );
    }
}