import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import docModel from '../models/docModel';


function StartMenu(props) {

    const [docs, setDocs] = useState([]);


    useEffect(() => {
        (async () => {
            const allDocs = await docModel.getAllDocs();
            setDocs(allDocs);
        })();
    }, []);

    async function findDoc() {
        const _id = document.getElementById("select-id-startmenu").value;
        const result = await docModel.findDoc(_id);
        props.setCurrentDoc(result);
    }

    async function newDoc () {
        const newDoc = await docModel.createDoc();
        props.setCurrentDoc(newDoc);
    }


    return (
        <div>
            <div className="start-menu">
                <h1 className='welcome'>Welcome to Eriks Editor</h1>
                <span>Create </span>
                <button type="button" onClick={ newDoc }>New Document</button>

                <span> or load </span>

                <select
                    id="select-id-startmenu"
                    onChange={
                        findDoc
                    }
                >
                    <option value="-99" key="0">Choose a document</option>
                    {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                </select>
            </div>
        </div>
    )
}

export default StartMenu;