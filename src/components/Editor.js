import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parse from 'html-react-parser';
import { FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons'


function Editor () {

    const [content, setContent] = useState("");
    const [col, setCol] = useState("#272727");
    const originalCol = "#272727";

    return (
        <div>
            <div className="toolbar">
                <IconContext.Provider value={{ color: col }}>
                    <FaSave size={30}
                        className="toolIcon"
                        onMouseEnter={() => {
                            setCol("white");
                        }}
                        onMouseLeave={() => {
                            setCol(originalCol);
                        }}
                        onClick={() => {
                            console.log(content);
                        }}
                    />
                </IconContext.Provider>
            </div>
            <div className="edit-prev-container">
                <div className="editor">
                    <h1>Eriks editor</h1>
                    <CKEditor
                        editor={ClassicEditor}
                    // data="<p>Hello from CKEditor 5!</p>"
                    // onReady={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                        // <div dangerouslySetInnerHTML={{ data }} />
                        // setContent(dangerouslySetInnerHTML(data));
                        // console.log({ data });
                    }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                    />
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