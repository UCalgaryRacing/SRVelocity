import fetch from 'node-fetch';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';
import { GATEWAYSERVERIP } from '../../../../dataServerEnv';
import Comment from './Comment';
import EditModal from './EditModal';
import QuillCanvas from './QuillCanvas';
import classes from './styles/session.module.css';
import AddRunModal from './AddRunModal';

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

function DeleteConfirm({ onSubmit, onCancel }) {
  return (
    <div className={classes.deleteContainer}>
      <div className={classes.deleteMsg}>
        <b>Are you sure you want to delete this session?</b>
      </div>
      <div className={classes.deleteContainer}>
        <Button
          className={classes.deleteBtn}
          style={{ marginTop: '90px' }}
          onClick={onSubmit}
        >
          <b>Yes</b>
        </Button>
        <Button
          className={classes.deleteBtn}
          style={{ marginTop: '10px' }}
          onClick={onCancel}
        >
          <b>No</b>
        </Button>
      </div>
    </div>
  );
}

export default function Session({
  id,
  name,
  date,
  subteam,
  index,
  onEdit,
  onDelete,
}) {
  const [runs, setRuns] = useState([]);
  const [comments, setComments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddRunModal, setShowAddRunModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let sessionComments = await getComments();
        let sessionCsvs = await getRuns();

        ReactDOM.unstable_batchedUpdates(() => {
          setComments(sessionComments);
          setRuns(sessionCsvs);
        });
      } catch (error) {
        //TODO: find a more graceful way to handle errors
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getRuns = async () => {
    try {
      let res = await fetch(GATEWAYSERVERIP + `/session/getRuns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: id }),
      });

      res = await res.json();
      let ids = res.map((csv) => csv.id);
      return ids;
    } catch (error) {
      throw error;
    }
  };

  const addRun = async (csvId) => {
    let postParams = {
      csvId: csvId,
      sessionId: id,
    };
    try {
      let res = await fetch(GATEWAYSERVERIP + '/session/addRun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postParams),
      });
      if (res.ok) {
        let newRuns = await getRuns();
        ReactDOM.unstable_batchedUpdates(() => {
          setShowAddRunModal(false);
          setRuns(newRuns);
        });
      } else {
        setShowAddRunModal(false);
        console.log('Something went wrong!');
      }
    } catch (error) {
      //TODO: Find a better way to handle errors
      setShowAddRunModal(false);
      console.log(error);
    }
  };

  const removeRun = async (csvId) => {
    let postParams = {
      csvId: csvId,
      sessionId: id,
    };
    try {
      let res = await fetch(GATEWAYSERVERIP + '/session/removeRun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postParams),
      });
      if (res.ok) {
        let newRuns = await getRuns();
        ReactDOM.unstable_batchedUpdates(() => {
          //TODO: would be nice to show sucess on modal
          setRuns(newRuns);
          setShowAddRunModal(false);
        });
      } else {
        setShowAddRunModal(false);
        console.log('Something went wrong!');
      }
    } catch (error) {
      //TODO: Find a better way to handle errors
      setShowAddRunModal(false);
      console.log(error);
    }
  };

  const onHideAddRunModal = () => {
    setShowAddRunModal(false);
  };

  const getSubteamNames = (subteams) => {
    const teamNums = subteams.split(',');
    let teams = '';
    if (!subteams) return 'No subteams assigned';
    teamNums.forEach((num, index) => {
      teams += `${index !== 0 ? ', ' : ''}${subteam_enum(parseInt(num))}`;
    });

    return teams;
  };

  const getComments = async () => {
    try {
      let res = await fetch(GATEWAYSERVERIP + `/session/getComments/${id}`, {
        method: 'GET',
      });

      res = await res.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const pushComment = async (content) => {
    try {
      let comment = {
        sessionId: id,
        content: content,
        commenter: sessionStorage.getItem('Name'),
        commenterID: sessionStorage.getItem('ID'),
      };

      let res = await fetch(GATEWAYSERVERIP + '/session/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      res = await res.json();

      let newComments = [...comments];
      newComments.push(res);
      setComments(newComments);
    } catch (error) {
      //TODO: Have a better way to handle errors
      console.log(error);
    }
  };

  const onDeleteComment = async (commentId) => {
    let postParams = {
      commentId: commentId,
      sessionId: id,
    };

    try {
      let res = await fetch(GATEWAYSERVERIP + '/session/removeComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postParams),
      });

      //TODO: Have a better way to handle errors
      // maybe do fetch loading and error message?
      if (res.ok) {
        let commentsAfter = await getComments();
        if (commentsAfter) {
          setComments(commentsAfter);
        }
      } else {
        //TODO: Find a better way to handle errors
        console.log('Something went wrong!');
      }
    } catch (error) {
      //TODO: Find a better way to handle errors
      console.log(error);
    }
  };

  const renderComments = () => {
    return comments.map((comment, index) => {
      const date = new Date(parseInt(comment.date));
      return (
        <Comment
          id={comment.id}
          content={comment.content}
          commenter={comment.commenter}
          commenterID={comment.commenterID}
          date={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
          onDelete={onDeleteComment}
          key={index}
        />
      );
    });
  };

  const onHideModal = () => {
    setShowEditModal(false);
  };

  const editSession = async (newName, newSubteam) => {
    let postParams = {
      sessionId: id,
      name: newName,
      subteam: newSubteam,
    };
    try {
      let res = await fetch(
        GATEWAYSERVERIP + '/session/updateSessionMetadata',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postParams),
        }
      );

      //TODO: Have a better way to handle errors
      // maybe do fetch loading and error message in modal?
      if (res.ok) {
        onEdit();
        setShowEditModal(false);
      } else {
        console.log('Something went wrong!');
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHideDelete = () => {
    setShowConfirmDelete(false);
  };

  const onDeleteSession = () => {
    onDelete(id);
    onHideDelete();
  };

  return (
    <>
      <Accordion className={classes.mainContainer}>
        <Card className={classes.csvBox}>
          <Card.Header className={classes.cardBody}>
            <div className={classes.container}>
              {showConfirmDelete ? (
                <DeleteConfirm
                  onCancel={onHideDelete}
                  onSubmit={onDeleteSession}
                />
              ) : (
                <>
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
                      <div className={classes.text}>
                        {getSubteamNames(subteam)}
                      </div>
                    </div>
                  </div>

                  <div className={classes.btnContainer}>
                    <Button
                      className={classes.histBtn}
                      onClick={() => setShowConfirmDelete(true)}
                    >
                      <img
                        width="20px"
                        className={classes.btnIcon}
                        src={require('../../../../assets/delete-x.svg')}
                      />
                    </Button>
                    <Button
                      className={classes.histBtn}
                      onClick={() => setShowEditModal(true)}
                    >
                      <img
                        width="20px"
                        className={classes.btnIcon}
                        src={require('../../../../assets/edit.svg')}
                      />
                    </Button>
                    <CommentsToggle eventKey="0">
                      <img
                        width="20px"
                        className={classes.btnIcon}
                        src={require('../../../../assets/comment.svg')}
                      />
                    </CommentsToggle>
                    <Button
                      className={classes.histBtn}
                      onClick={() => setShowAddRunModal(true)}
                    >
                      <img
                        width="20px"
                        className={classes.btnIcon}
                        src={require('../../../../assets/plus.svg')}
                      />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <div className={classes.title}>Comments</div>
                {comments.length === 0 ? (
                  <div>Nothing Yet!</div>
                ) : (
                  renderComments()
                )}
              </div>
              <QuillCanvas pushComment={pushComment} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <EditModal
        show={showEditModal}
        currName={name}
        currSubteams={subteam}
        onHide={onHideModal}
        onSubmit={editSession}
      />
      <AddRunModal
        show={showAddRunModal}
        onHide={onHideAddRunModal}
        onSubmit={addRun}
        runs={runs}
      />
    </>
  );
}
