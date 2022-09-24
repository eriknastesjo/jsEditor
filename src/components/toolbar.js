import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { VscNewFile } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import docModel from '../models/docModel';


function Toolbar(props) {
    const [loader, setLoader] = useState("");   // todo: Uppdatera loader (<select>) när nya docs skapas och ändrar namn
    const [flashMessage, setFlashMessage] = useState("");
    const [col, setCol] = useState("#272727");
    const originalCol = "#272727";
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState([]);

    let timeout;
    function resetFlashMessage() {
        setFlashMessage("")
    }


    useEffect(() => {
        (async () => {
            const allDocs = await docModel.getAllDocs();
            setDocs(allDocs);
        })();
    }, [currentDoc]);

    async function newDoc() {
        const newDoc = await docModel.createDoc();
        props.setCurrentDoc(newDoc);
    }

    async function findDoc() {
        const _id = document.getElementById("select-id-toolbar").value;
        if (_id != -99) {
            const result = await docModel.findDoc(_id);
            props.setCurrentDoc(result);
        }
    }

    async function saveDoc() {
        const nameHolder = document.getElementsByClassName('name')[0];
        const contentHolder = document.getElementsByClassName('ql-editor')[0];

        const docSave = {
            "_id": props.currentDoc["_id"],
            "name": nameHolder.value,
            "content": contentHolder.innerHTML
        }

        console.log(docSave);

        // let currDoc = { ...props.currentDoc };
        // currDoc.content = props.currentContent;

        // await docModel.updateDoc(currDoc);

        await docModel.updateDoc(docSave);

        // props.setCurrentDoc(currDoc);
    }


    return (
        <div>
            <div className="toolbar">
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

                    <select id= "select-id-toolbar" onChange={ findDoc }>
                        <option value="-99" key="0">Choose a document</option>
                        {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                    </select>

                </IconContext.Provider>
            </div>
            <p className='flash-message'> {flashMessage} </p>
        </div>
    )
}

export default Toolbar;