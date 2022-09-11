import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import docModel from '../models/docModel';


function Toolbar(props) {
    const [content, setContent] = useState("");
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
            console.log(docs);
        })();
    }, [currentDoc]);

    async function findDoc() {
        const _id = document.getElementById("select-id-toolbar").value;
        const result = await docModel.findDoc(_id);
        props.setCurrentDoc(result);
    }


    return (
        <div>
            <div className="toolbar">
                <IconContext.Provider value={{ color: col }}>
                    <FaSave size={30}
                        className="toolIcon"
                        onMouseEnter={() => {
                            // setCol("white");
                        }}
                        onMouseLeave={() => {
                            setCol(originalCol);
                        }}
                        onClick={() => {
                            console.log(content);
                            setFlashMessage("Text printed in console!");
                            clearTimeout(timeout);
                            timeout = setTimeout((resetFlashMessage), 1000);
                        }}
                    />

                    {/* <input
                        onChange={
                            findDoc
                        }
                    >

                    </input> */}


                    <select id= "select-id-toolbar" onChange={ findDoc}>
                        <option value="-99" key="0">Choose a document</option>
                        {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                    </select>



                    {/* <FaFileDownload size={27}
                        className="toolIcon"
                        onMouseEnter={() => {
                            // setCol("white");
                        }}
                        onMouseLeave={() => {
                            setCol(originalCol);
                        }}
                        onClick={() => {
                            // console.log(content);
                            // setFlashMessage("Text printed in console!");
                            // clearTimeout(timeout);
                            // timeout = setTimeout((resetFlashMessage), 1000);
                        }}
                    /> */}
                </IconContext.Provider>
            </div>
            <p className='flash-message'> {flashMessage} </p>
        </div>
    )
}

export default Toolbar;