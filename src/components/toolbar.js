import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { VscNewFile } from 'react-icons/vsc';
import { AiFillPrinter } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import docModel from '../models/docModel';

import pdf from "./pdf";


export default function Toolbar(props) {
    const [flashMessage, setFlashMessage] = useState("");
    const [col, setCol] = useState("#272727");
    const originalCol = "#272727";
    const [currentDoc, setCurrentDoc] = useState([]);   // is called first
    const [docs, setDocs] = useState([]);   // is called second to make sure currentDoc has updated
    const [dropDownDocs, setDropDownDocs] = useState(null); // todo: Uppdatera loader (<select>) när nya docs skapas och ändrar namn

    // const [showComments, setShowComments] = useState(false);


    let timeout;
    function resetFlashMessage() {
        setFlashMessage("")
    }


    useEffect(() => {
        (async () => {
            const allDocs = await docModel.getAllDocs(props.currentUser, props.currentToken);
            setDocs(allDocs);
        })();
    }, [currentDoc]);

    useEffect(() => {
        setDropDownDocs(
            <select id="select-id-toolbar" onChange={findDoc}>
                <option value="-99" key="0">Choose a document</option>
                {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

            </select>)
    }, [docs]);

    async function newDoc() {
        const newDoc = await docModel.createDoc(props.currentUser);
        props.setCurrentDoc(newDoc);
        setCurrentDoc(newDoc); // OBS mest för att uppdatera dropdown!
    };

    async function findDoc() {
        const _id = document.getElementById("select-id-toolbar").value;
        if (_id != -99) {
            props.socket.emit("leave", props.currentDoc["_id"]);
            const result = await docModel.findDoc(_id);
            props.setCurrentDoc(result);
        }
    };

    async function saveDoc() {
        const nameHolder = document.getElementsByClassName('name')[0];
        const contentHolder = document.getElementsByClassName('ql-editor')[0];

        const commentUsers = document.getElementsByClassName('comment-user');
        const commentNums = document.getElementsByClassName('comments-comment-num');
        const comment = document.getElementsByClassName('comments-comment');

        let commentArr = [];
        for (let i = 0; i < comment.length; i++) {
            commentArr[i] = {
                "user": commentUsers[i].innerHTML,
                "commentNum": commentNums[i].value,
                "comment": comment[i].value
            }
        }
        console.log(commentArr);



        const docSave = {
            "_id": props.currentDoc["_id"],
            "name": nameHolder.value,
            "content": contentHolder.innerHTML,
            "comments": commentArr
        }

        // let currDoc = { ...props.currentDoc };
        // currDoc.content = props.currentContent;

        // await docModel.updateDoc(currDoc);

        await docModel.updateDoc(docSave);

        setCurrentDoc(docSave); // OBS mest för att uppdatera dropdown!
        // props.setCurrentDoc(currDoc);
    };


    return (
        <div>
            <div className="toolbar">
                <div className='toolbar-left'>
                    <IconContext.Provider value={{ color: col }}>
                        <VscNewFile size={30}
                            className="toolIcon"
                            onMouseEnter={() => {
                                // setCol("white");
                            }}
                            onMouseLeave={() => {
                                setCol(originalCol);
                            }}
                            onClick={() => {
                                newDoc();
                                setFlashMessage("New document created!");
                                clearTimeout(timeout);
                                timeout = setTimeout((resetFlashMessage), 1000);
                            }}
                        />
                        <FaSave size={30}
                            className="toolIcon"
                            onMouseEnter={() => {
                                // setCol("white");
                            }}
                            onMouseLeave={() => {
                                setCol(originalCol);
                            }}
                            onClick={() => {
                                // console.log(content);
                                saveDoc();
                                setFlashMessage("Content saved!");
                                clearTimeout(timeout);
                                timeout = setTimeout((resetFlashMessage), 1000);
                            }}
                        />
                        <AiFillPrinter size={30}
                            className="toolIcon"
                            onMouseEnter={() => {
                                // setCol("white");
                            }}
                            onMouseLeave={() => {
                                setCol(originalCol);
                            }}
                            onClick={() => {
                                // window.open("data:application/txt," + encodeURIComponent("Testing"), "_self");
                                pdf.download();
                            }}
                        />
                        <FaComment size={30}
                            className="toolIcon"
                            onMouseEnter={() => {
                                // setCol("white");
                            }}
                            onMouseLeave={() => {
                                setCol(originalCol);
                            }}
                            onClick={() => {
                                // console.log(props.showComments);
                                const showComments = props.showComments;
                                // console.log(showComments);
                                if (showComments) {
                                    props.setShowComments(false);
                                    setFlashMessage("Comments are hidden!");
                                    clearTimeout(timeout);
                                    timeout = setTimeout((resetFlashMessage), 1000);
                                } else {
                                    props.setShowComments(true);
                                    setFlashMessage("Comments are shown on bottom of page!");
                                    clearTimeout(timeout);
                                    timeout = setTimeout((resetFlashMessage), 2000);
                                }

                            }}
                        />
                        {dropDownDocs}
                        {/* <PdfLink/> */}



                        {/* <select id= "select-id-toolbar" onChange={ findDoc }>
                            <option value="-99" key="0">Choose a document</option>
                            {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                        </select> */}

                    </IconContext.Provider>
                </div>
                <div className='toolbar-right'>
                    <p className='toolbar-username'>{props.currentUser}</p>
                </div>
            </div>

            <p className='toolbar-flash-message'> {flashMessage} </p>
        </div>
    )
}

