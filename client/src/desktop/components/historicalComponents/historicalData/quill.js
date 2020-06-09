import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default (props) => {
    const theme = 'snow';
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    };
    const placeholder = "Write with velocity...";
    const formats = ['bold', 'italic', 'underline', 'list'];
    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

    const addComment = () => {
        props.pushComment(quill.root.innerHTML)
        quill.setContents([
            { insert: '\n' }
        ]);
    }

    return (
        <div style={{ width: '100%', height: '100px', marginTop: '10px', marginBottom: '89px' }}>
            <div ref={quillRef} />
            <Button style={{ width: '100%', height: '36px', background: '#C22E2D', borderColor: '#C22E2D', marginTop: '10px' }} onClick={addComment}><b>Submit</b></Button>
        </div>
    );
};