import React from 'react';
import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';
import classes from './styles/session.module.css';

const subteam_enum = function (num) {
  switch (num) {
    case 1:
      return 'Frame & Body';
      break;
    case 2:
      return 'Suspension';
      break;
    case 3:
      return 'Powertrain';
      break;
    case 4:
      return 'Electrical';
      break;
    case 5:
      return 'Aero';
      break;
  }
};

function CommentsToggle({ children, eventKey }) {
  const toggleComments = useAccordionToggle(eventKey, null);
  return (
    <Button className={classes.histBtn} onClick={toggleComments}>
      {children}
    </Button>
  );
}

export default function Session({ id, name, date, subteam, index }) {
  const getSubteamNames = (subteams) => {
    const teamNums = subteams.split(',');
    let teams = '';
    teamNums.forEach((num, index) => {
      teams += `${index !== 0 ? ', ' : ''}${subteam_enum(parseInt(num))}`;
    });

    return teams;
  };

  return (
    <>
      <Accordion>
        <Card className={classes.csvBox}>
          <Card.Header className={classes.cardBody}>
            <div className={classes.container}>
              <div className={classes.infoContainer}>
                <div className={classes.title}>{name}</div>

                <div className={classes.info}>
                  <div className={classes.label}>Created:</div>
                  <div className={classes.text}>
                    {date.toLocaleDateString() +
                      ' ' +
                      date.toLocaleTimeString()}
                  </div>
                </div>
                <div className={classes.info}>
                  <div className={classes.label}>Subteam:</div>
                  <div className={classes.text}>{getSubteamNames(subteam)}</div>
                </div>
              </div>

              <div className={classes.btnContainer}>
                <Button className={classes.histBtn}>
                  <img
                    width="20px"
                    src={require('../../../../assets/delete-x.svg')}
                  />
                </Button>
                <Button className={classes.histBtn}>
                  <img
                    width="20px"
                    src={require('../../../../assets/edit.svg')}
                  />
                </Button>
                <CommentsToggle eventKey="0">
                  <img
                    width="20px"
                    src={require('../../../../assets/comment.svg')}
                  />
                </CommentsToggle>
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <div className={classes.title}>Comments</div>
                <div>Nothing Yet!</div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
