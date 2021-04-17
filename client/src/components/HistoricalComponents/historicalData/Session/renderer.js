import React from 'react';
import Session from './Session';

function renderer(sessions, onEdit, onDelete) {
  return sessions.map((session, i) => {
    let date = new Date(parseInt(session.date));
    return (
      <Session
        id={session.id}
        name={session.name}
        date={date}
        subteam={session.subteam}
        key={i}
        index={i}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  });
}

export default renderer;
