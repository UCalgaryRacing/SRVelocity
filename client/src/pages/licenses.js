import React from 'react';
import BottomNav from '../components/NavigationComponents/bottomNav';
import TopNav from '../components/NavigationComponents/topNav';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import './_styling/licenses.css';

export default class LicensesPage extends React.Component {
    render = () => {
        return (
            <div id='licenses'>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <p id='largeFont'><b>Licenses</b></p>
                            </Col>
                        </Row>

                        <p id='headerFont'><b>aws-sdk-js</b></p>
                        <p id='textFont'>Copyright © 2012 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.</p>
                        <a id='linkFont' href='https://github.com/aws/aws-sdk-js/blob/master/LICENSE.txt' target='_blank' rel='noopener noreferrer'>Apache 2.0 License</a><p></p><br />

                        <p id='headerFont'><b>bcryptjs</b></p>
                        <p id='textFont'>Copyright © 2012 Nevins Bartolomeo nevins.bartolmeo@gmail.com</p>
                        <p id='textFont'>Copyright © 2012 Shane Girish shaneGirish@gmail.com</p>
                        <p id='textFont'>Copyright © 2014 Daniel Wirtz dcode@dcode.io</p>
                        <a id='linkFont' href='https://github.com/dcodeIO/bcrypt.js/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>bootstrap</b></p>
                        <p id='textFont'>Copyright © 2011 - 2019 Twitter, Inc.</p>
                        <p id='textFont'>Copyright © 2011 - 2019 The Bootstrap Authors</p>
                        <a id='linkFont' href='https://github.com/twbs/bootstrap/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>colormap</b></p>
                        <p id='textFont'>Copyright © 2012 ICRL</p>
                        <a id='linkFont' href='https://github.com/bpostlethwaite/colormap/blob/master/license.md' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>cookie-parser</b></p>
                        <p id='textFont'>Copyright © 2014 TJ Holowaychuk tj@vision-media.ca</p>
                        <p id='textFont'>Copyright © 2015 Douglas Christopher Wilson doug@somethingdoug.ca</p>
                        <a id='linkFont' href='https://github.com/expressjs/cookie-parser/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>cors</b></p>
                        <p id='textFont'>Copyright © 2015 - 2018 koajs and other contributers</p>
                        <a id='linkFont' href='https://github.com/koajs/cors/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>crypto-js</b></p>
                        <p id='textFont'>Copyright © 2009-2013 Jeff Mott </p>
                        <p id='textFont'>Copyright © 2013-2016 Evan Vosberg</p>
                        <a id='linkFont' href='https://github.com/brix/crypto-js/blob/develop/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>express</b></p>
                        <p id='textFont'>Copyright © 2009 - 2014 TJ Holowaychuk tj@vision-media.ca</p>
                        <p id='textFont'>Copyright © 2013 - 2014 Roman Shtylman shtylman+expressjs@gmail.com</p>
                        <p id='textFont'>Copyright © 2014 - 2015 Douglas Christopher Wilson doug@somethingdoug.ca</p>
                        <a id='linkFont' href='https://github.com/expressjs/session/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>express-session</b></p>
                        <p id='textFont'>Copyright © 2010 Sencha Inc.</p>
                        <p id='textFont'>Copyright © 2011 TJ Holowaychuk tj@vision-media.ca</p>
                        <p id='textFont'>Copyright © 2014 - 2015 Douglas Christopher Wilson doug@somethingdoug.ca</p>
                        <a id='linkFont' href='https://github.com/expressjs/session/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>firebase</b></p>
                        <p id='textFont'>Copyright © Alphabet Inc.</p>
                        <a id='linkFont' href='https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>Apache 2.0 License</a><p></p><br />

                        <p id='headerFont'><b>helmet</b></p>
                        <p id='textFont'>Copyright © 2012 - 2020 Evan Hahn, Adam Baldwin</p>
                        <a id='linkFont' href='https://github.com/helmetjs/helmet/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>joi</b></p>
                        <p id='textFont'>Copyright © 2012 - 2020, Sideway Inc, and project contributers</p>
                        <p id='textFont'>Copyright © 2012 - 2014 Walmart. All rights reserved.</p>
                        <a id='linkFont' href='https://github.com/hapijs/joi/blob/master/LICENSE.md' target='_blank' rel='noopener noreferrer'>BSD-3-Clause</a><p></p><br />

                        <p id='headerFont'><b>lusca</b></p>
                        <p id='textFont'>Copyright © 2017 PayPal</p>
                        <a id='linkFont' href='https://github.com/krakenjs/lusca/blob/master/LICENSE.txt' target='_blank' rel='noopener noreferrer'>Apache License</a><p></p><br />

                        <p id='headerFont'><b>material-ui</b></p>
                        <p id='textFont'>Copyright © 2014 Call-Em-All</p>
                        <a id='linkFont' href='https://github.com/mui-org/material-ui/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />
                        
                        <p id='headerFont'><b>nodemon</b></p>
                        <p id='textFont'>Copyright © 2010 - present, Remy Sharp, https://remysharp.com remy@remysharp.com</p>
                        <a id='linkFont' href='https://github.com/remy/nodemon/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>node-jsonwebtoken</b></p>
                        <p id='textFont'>Copyright © 2015 Auth0, Inc. support@auth0.com (http://auto0.com)</p>
                        <a id='linkFont' href='https://github.com/auth0/node-jsonwebtoken/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>node-postgres</b></p>
                        <p id='textFont'>Copyright © 2012 - 2020 Brian Carlson</p>
                        <a id='linkFont' href='https://github.com/brianc/node-postgres/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>nginx</b></p>
                        <p id='textFont'>Copyright © 2002 - 2020 Igor Syseov.</p>
                        <p id='textFont'>Copyright © 2011 - 2020 Nginx, Inc.</p>
                        <a id='linkFont' href='http://nginx.org/LICENSE' target='_blank' rel='noopener noreferrer'>License</a><p></p><br />
                       
                        <p id='headerFont'><b>path</b></p>
                        <p id='textFont'>Copyright © Joyent, Inc. and other Node contributors</p>
                        <a id='linkFont' href='https://github.com/jinder/path/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>pg-promise</b></p>
                        <p id='textFont'>Copyright © 2015 - 2018 Vitaly Tomilov</p>
                        <a id='linkFont' href='https://github.com/vitaly-t/pg-promise/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react</b></p>
                        <p id='textFont'>Copyright © Facebook, Inc. and its affiliates.</p>
                        <a id='linkFont' href='https://github.com/facebook/react/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-bootstrap</b></p>
                        <p id='textFont'>Copyright © 2014 - Present Stephen J. Collings, Matthew Honnibal, Pieter Vanderwerff</p>
                        <a id='linkFont' href='https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-device-detect</b></p>
                        <p id='textFont'>Copyright © 2017 duskload</p>
                        <a id='linkFont' href='https://github.com/duskload/react-device-detect/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-dom</b></p>
                        <p id='textFont'>Copyright © 2017 Tylor Steinberger</p>
                        <a id='linkFont' href='https://github.com/motorcycle/react-dom/blob/master/LICENSE.md' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-ga</b></p>
                        <p id='textFont'>Copyright © Github Contributers</p>
                        <a id='linkFont' href='https://github.com/react-ga/react-ga/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>Apache 2.0 License</a><p></p><br />

                        <p id='headerFont'><b>react-social-icons</b></p>
                        <p id='textFont'>Copyright © 2016 Vitaly Aminev</p>
                        <p id='textFont'>Copyright © 2015 Jake Trent</p>
                        <a id='linkFont' href='https://github.com/jaketrent/react-social-icons/blob/master/LICENSE.md' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-router</b></p>
                        <p id='textFont'>Copyright © 2016 - 2018 React Training</p>
                        <a id='linkFont' href='https://github.com/ReactTraining/react-router/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>react-scripts</b></p>
                        <p id='textFont'>Copyright © 2013-present, Facebook, Inc.</p>
                        <a id='linkFont' href='https://github.com/facebook/create-react-app/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />
                        
                        <p id='headerFont'><b>react-sidenav</b></p>
                        <p id='textFont'>Copyright © 2015 Warren Mira</p>
                        <a id='linkFont' href='https://github.com/wmira/react-sidenav/blob/master/LICENSE.md' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>redis</b></p>
                        <p id='textFont'>Copyright © 2016 - present Node Redis contributors</p>
                        <a id='linkFont' href='https://github.com/NodeRedis/node-redis/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />
                        
                        <p id='headerFont'><b>savitzky-golay</b></p>
                        <p id='textFont'>Copyright © 2015 ml.js</p>
                        <a id='linkFont' href='https://github.com/mljs/savitzky-golay/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>socket.io</b></p>
                        <p id='textFont'>Copyright © 2014 - 2018 Automatic dev@cloudup.com</p>
                        <a id='linkFont' href='https://github.com/socketio/socket.io/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>socket.io-client</b></p>
                        <p id='textFont'>Copyright © 2014 Guillermo Rauch</p>
                        <a id='linkFont' href='https://github.com/socketio/socket.io-client/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>uuid-apikey</b></p>
                        <p id='textFont'>Copyright © 2017, 2018, 2019 Jay Reardon</p>
                        <a id='linkFont' href='https://github.com/chronosis/uuid-apikey/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />
                    </Container>
                </Jumbotron>
                <TopNav/>
                <BottomNav/>
            </div>
        );
    }
}