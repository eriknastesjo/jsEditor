import React, { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parse from 'html-react-parser';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



function Editor(props) {


    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    // const [editor, setEditor] = useState(null);
    let updateCurrentDocOnChange = true;

    // =====================================

    props.socket.on("content", function (data) {
        // console.log(data);
        // setContent(data);

        setEditorContent(data, false);
    });

    function changeContent(html) {
        if (updateCurrentDocOnChange) {
            // const copy = Object.assign({}, currentDoc);

            // copy.html = html;

            // setCurrentDoc(copy);
            setContent(html);
            props.setCurrentContent(html);
        }

        updateCurrentDocOnChange = true;
    }

    function setEditorContent(content, triggerChange) {
        // let editor = document.querySelector("quill");
        // let editor = document.getElementsByClassName('quilly')[0];
        let editor = document.querySelector("trix-editor");

        console.log(editor);

        updateCurrentDocOnChange = triggerChange;
        editor.value = "";
        // element.editor.setSelectedRange([0, 0]);
        updateCurrentDocOnChange = triggerChange;
        // element.editor.insertHTML(content);
    }

    // =====================================

    function changeName(event) {
        if (event.target !== undefined) {

            let currDoc = { ...props.currentDoc };
            currDoc.name = event.target.value;

            props.setCurrentDoc(currDoc);
        }
    }

    // function changeContent(event, editor) {
    //     // console.log(event);

    //     // **
    //     // const editorChildren = document.getElementsByClassName('ql-editor')[0].childNodes;
    //     // // console.log(editorChildren);
    //     // let htmlCollection = "";
    //     // for (let i = 0; i < editorChildren.length; i++) {
    //     //     console.log(editorChildren[i].outerHTML);
    //     //     htmlCollection += editorChildren[i];
    //     // }
    //     // console.log(htmlCollection);
    //     // setContent(newContent);

    //     // **
    //     // OBS: med denna metod (som blir nödvändig med onKeyUp så fås bara p taggen ut)
    //     // var p = document.querySelector(".ql-editor p");
    //     // console.log(p);
    //     // setContent(p);
    //     // props.setCurrentContent(p);

    //     // **
    //     setContent(event);
    //     props.setCurrentContent(event);
    //     console.log(event);

    //     // **
    //     // setContent(data);
    //     // props.setCurrentContent(data);
    //     // console.log("content changed");
    // }

    useEffect(() => {
        props.socket.emit("content", content);
    }, [content]);


    useEffect(() => {
        (async () => {
            setName(props.currentDoc.name);
            setContent(props.currentDoc.content);
            // setEditor(<CKEditor
            //     editor={ClassicEditor}
            //     data={props.currentDoc.content}
            //     onReady={editor => {
            //         console.log(editor);
            //     }}
            //     onChange={changeContent}
            // // onBlur={(event, editor) => {
            // //     console.log('Blur.', editor);
            // // }}
            // // onFocus={(event, editor) => {
            // //     console.log('Focus.', editor);
            // // }}
            // />);
        })();
    }, [props.currentDoc]);

    // useEffect(() => {
    //     console.log("POOOP");
    // }, [content]);

    return (
        <div>
            <div className="edit-prev-container">
                <div className="editor">
                    <input type="text" className="name" name="name" value={name} onChange={changeName} />
                    <ReactQuill theme="snow" value={content} onChange={changeContent} class="quilly" />
                    {/* {editor} */}
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
