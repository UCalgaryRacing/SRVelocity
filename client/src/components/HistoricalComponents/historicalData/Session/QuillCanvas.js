import React from 'react';
import { Button } from 'react-bootstrap';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import classes from './styles/quillCanvas.module.css';

export default function QuillCanvas({ pushComment }) {
  const theme = 'snow';
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };
  const placeholder = 'Write with velocity...';
  const formats = ['bold', 'italic', 'underline', 'list'];
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  const addComment = () => {
    pushComment(quill.root.innerHTML);
    quill.setContents([{ insert: '\n' }]);
  };
  return (
    <div className={classes.container}>
      <div ref={quillRef} />
      <Button className={classes.submitBtn} onClick={addComment}>
        <b>Submit</b>
      </Button>
    </div>
  );
}
