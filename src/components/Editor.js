import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parse from 'html-react-parser';
import docModel from '../models/docModel';



function Editor(props) {

    // todo: ersätt med props.currentDoc och props.setCurrentDoc
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [editor, setEditor] = useState(null);

    function changeName(event) {
        if (event.target !== undefined) {
            let currDoc = { ...props.currentDoc };
            currDoc.name = event.target.value;
            docModel.updateDoc(currDoc);
            props.setCurrentDoc(currDoc);
        }
    }

    function changeContent(event, editor) {
        const data = editor.getData();
        setContent(data);
        console.log({
            _id: props.currentDoc._id,
            name: props.currentDoc.name,
            content: props.currentDoc.content
        })

        // console.log({
        //     _id: props.currentDoc._id,
        //     name: name,
        //     content: content
        // })

        // docModel.updateDoc({
        //     _id: props.currentDoc._id,
        //     name: name,
        //     content: content
        // })
    }

    useEffect(() => {
        (async () => {
            setName(props.currentDoc.name);
            setContent(props.currentDoc.content);
            setEditor(<CKEditor
                editor={ClassicEditor}
                data={props.currentDoc.content}
                onReady={editor => {
                    console.log(editor);
                }}
                onChange={changeContent}
            // onBlur={(event, editor) => {
            //     console.log('Blur.', editor);
            // }}
            // onFocus={(event, editor) => {
            //     console.log('Focus.', editor);
            // }}
            />);
        })();
    }, [props.currentDoc]);

    return (
        <div>
            <div className="edit-prev-container">
                <div className="editor">
                    <input type="text" className="name" name="name" value={name} onChange={changeName} />
                    {editor}
                </div>
                <div>
                    <h2>Preview</h2>
                    <div>{Parse(content)}</div>
                </div>
            </div>
        </div>
    );
}

export default Editor;