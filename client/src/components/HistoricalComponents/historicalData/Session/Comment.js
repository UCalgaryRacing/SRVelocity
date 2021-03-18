import React from 'react';
import classes from './styles/comment.module.css';

export default function Comment({
  id,
  content,
  commenter,
  commenterID,
  date,
  onDelete,
}) {
  return (
    <div className={classes.container}>
      <div className={classes.commenter}>{commenter}</div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div className={classes.bottomContainer}>
        <div className={classes.date}>{date}</div>
        {commenterID === sessionStorage.getItem('ID') ? (
          <div className={classes.delete} onClick={() => onDelete(id)}>
            DELETE
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
