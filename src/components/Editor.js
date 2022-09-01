import React, { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor () {

    const [content, setContent] = useState("");

    return (
        <div className="ContainerCenter">
            <div className="Editor">
                <h2>Eriks editor</h2>
                <CKEditor
                    editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"
                // onReady={editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log('Editor is ready to use!', editor);
                // }}
                onChange={(event, editor) => {
                    const data = editor.getData();
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
        </div>
    );
}

export default Editor;