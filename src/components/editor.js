import React, { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { TrixEditor } from "react-trix";

// import Parse from 'html-react-parser';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Comments from './comments';




export default function Editor(props) {

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    // const [comments, setComments] = useState("");
    // const [editor, setEditor] = useState(null);
    let updateCurrentDocOnChange = true;


    // SKICKA VIA SOCKET TILL SERVER
    // =========================================

    // useEffect(() => {
    //     const data = {
    //         _id: props.currentDoc._id,
    //         name: name
    //     }
    //     // console.log(currDoc);
    //     props.socket.emit("name", data);

    //     // props.socket.emit("content", content);
    // }, [name]);

    useEffect(() => {
        const data = {
            _id: props.currentDoc._id,
            content: content
        }
        // console.log(currDoc);
        props.socket.emit("content", data);

        // props.socket.emit("content", content);
    }, [content]);


    // TA EMOT VIA SOCKETS FRÅN SERVER
    // =========================================

    // props.socket.on("name", function (data) {
    //     setEditorName(data.name, false);
    // });

    props.socket.on("content", function (data) {
        setEditorContent(data.content, false);
    });



    // ONCHANGE FUNKTIONER
    // =========================================

    function changeName(event) {
        if (event.target !== undefined && updateCurrentDocOnChange) {
            setName(event.target.value);
        }
        updateCurrentDocOnChange = true;
    }

    function changeContent(html) {
        if (updateCurrentDocOnChange) {
            setContent(html);
        }

        updateCurrentDocOnChange = true;
    }


    // FUNKTIONER SOM MÖJLIGGÖR ÄNDRING UTAN ATT ÄNDRA STATES
    // =========================================

    // function setEditorName(name, triggerChange) {
    //     let editName = document.getElementsByClassName('name')[0];

    //     updateCurrentDocOnChange = triggerChange;
    //     editName.value = name;
    //     updateCurrentDocOnChange = triggerChange;
    // }

    function setEditorContent(html, triggerChange) {
        let editor = document.getElementsByClassName('ql-editor')[0];

        updateCurrentDocOnChange = triggerChange;
        editor.innerHTML = html;
        updateCurrentDocOnChange = triggerChange;
    }


    // NÄR STATE CURRENTDOC ÄNDRAS (LADDAS FRÅN TOOLBAR) SÅ SÄTTS STATES NAME OCH CONTENT
    // =========================================

    useEffect(() => {
        // setEditorName(props.currentDoc.name);
        // setEditorContent(props.currentDoc.content);

        setName(props.currentDoc.name);
        setContent(props.currentDoc.content);

        // setComments(Comments);

        // setComments(
        //     <div>
        //         <h1 className='comments-title'>Comments</h1>
        //         <div className='comments-add-button'>
        //             <p>Add</p>
        //             <AiOutlinePlusCircle size={30}
        //                 className="comments-add"
        //                 onClick={() => {
        //                     console.log("clicked")
        //                 }}
        //             />
        //         </div>
        //         <div className='comment'>
        //             <div className='comments-user-container'>
        //                 <TiDeleteOutline size={20}
        //                     className="comments-delete"
        //                     onClick={() => {
        //                         console.log("clicked")
        //                     }}
        //                     />
        //                 <p className='comment-user'>erik@erik.com</p>
        //             </div>
        //             <div className='comment-fields'>
        //                 <input type="text" name="name" className='comments-comment-num' placeholder="Line number" size="7" />
        //                 <textarea type="text" name="name" placeholder="Comment" className='comments-comment' />
        //             </div>
        //         </div>





        //         <div className='comment'>
        //             <div className='comments-user-container'>
        //                 <TiDeleteOutline size={20}
        //                     className="comments-delete"
        //                     onClick={() => {
        //                         console.log("clicked")
        //                     }}
        //                     />
        //                 <p className='comment-user'>test@test.com</p>
        //             </div>
        //             <div className='comment-fields'>
        //                 <input type="text" name="name" className='comments-comment-num' placeholder="Line number" size="7" />
        //                 <textarea type="text" name="name" placeholder="Comment" className='comments-comment' />
        //             </div>
        //         </div>
        //     </div>
        // )

    }, [props.currentDoc]);


    // RENDER
    // =========================================

    return (
        <div>
            <div className="edit-prev-container">
                <div className="editor">
                    <input type="text" className="name" name="name" value={name} onChange={changeName} />
                    <ReactQuill theme="snow" value={content} onChange={changeContent} className="quilly" />
                    {/* <TrixEditor value={content} /> */}
                    {/* {editor} */}
                </div>
                <div>
                    <Comments
                        currentDoc={props.currentDoc}
                        currentUser={props.currentUser}
                    />
                </div>
            </div>
        </div>
    );
}


