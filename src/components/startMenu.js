import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import docModel from '../models/docModel';
import authModel from '../models/authModel';


export default function StartMenu(props) {

    const [docs, setDocs] = useState([]);
    // const [jsToken, setJsToken] = useState("");
    const [flashMessage, setFlashMessage] = useState("");
    const [dropDownDocs, setDropDownDocs] = useState();

    let timeout;
    function resetFlashMessage() {
        setFlashMessage("")
    }


    useEffect(() => {
        (async () => {
            const allDocs = await docModel.getAllDocs(props.currentUser, props.currentToken);
            setDocs(allDocs);
        })();
    }, [props.currentToken]);


    useEffect(() => {
        if (props.currentToken !== "") {
            setDropDownDocs(
                <select
                    id="select-id-startmenu"
                    onChange={
                        findDoc
                    }
                >
                    <option value="-99" key="0">Choose a document</option>
                    {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                </select>)
        }
        // setDropDownDocs(
        //     <select
        //         id="select-id-startmenu"
        //         onChange={
        //             findDoc
        //         }
        //     >
        //         <option value="-99" key="0">Choose a document</option>
        //         {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

        //     </select>)
    }, [docs]);





    function newFlashMessage(message) {
        setFlashMessage(message);
        clearTimeout(timeout);
        timeout = setTimeout((resetFlashMessage), 1000);
    }

    async function findDoc() {
        const _id = document.getElementById("select-id-startmenu").value;
        const result = await docModel.findDoc(_id);
        props.setCurrentDoc(result);
    }

    async function newDoc () {
        const newDoc = await docModel.createDoc(props.currentUser);
        props.setCurrentDoc(newDoc);
    }

    async function register() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const result = await authModel.register(email, password);
        if ("data" in result) {
            login(email, password);
        } else if ("errors" in result) {
            newFlashMessage(result.errors.message);
        }
    }

    async function login () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const result = await authModel.login(email, password);
        if ("data" in result) {
            console.log("UPDATING TOKEN");
            // console.log(result.data.token);
            props.setCurrentToken(result.data.token);
            props.setCurrentUser(result.data.email);
        } else if ("errors" in result) {
            newFlashMessage(result.errors.message);
        }
    }


    return (
        <div>
            <div className="start-menu">

                <p className='startmenu-flash-message'> {flashMessage} </p>

                {
                    props.currentToken == "" ?
                        <div>
                            <h1 className='welcome'>Welcome to Erik's Editor</h1>
                            <form>
                                <div className='login-field-container'>
                                    <label htmlFor='email' className='login-field-label'>E-mail:</label>
                                    <input type="email" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                                        id="email" className='login-field' name="email" />
                                    <label htmlFor='email' className='login-field-label'>Password:</label>
                                    <input type="password" id="password" className='login-field' name="password" />
                                </div>
                                {/* <input type="submit" value="Log in" className='login-field-submit' onClick={console.log("logga in")} />
                                <input type="submit" value="Registrera" className='login-field-submit' onClick={console.log("registrera")} /> */}
                                <button type="button" className='login-submit' id='login-login' onClick={ login }>Log in</button>
                                <button type="button" className='login-submit' id='login-register' onClick={ register }>Register</button>
                            </form>
                        </div>
                        :
                <div>
                    <h1 className='welcome'>Hello { props.currentUser }!</h1>
                    <span>Create </span>
                    <button type="button" onClick={ newDoc }>New Document</button>

                    <span> or load </span>
                    {dropDownDocs}
                    {/* <select
                        id="select-id-startmenu"
                        onChange={
                            findDoc
                        }
                    >
                        <option value="-99" key="0">Choose a document</option>
                        {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.name}</option>)}

                    </select> */}
                </div>
                }

            </div>
        </div>
    )
}
