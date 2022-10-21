import React, { useEffect, useState } from "react";
import inviteModel from "../models/inviteModel";
import { GrSend } from 'react-icons/gr';


export default function Invite(props) {

    const [recipient, setRecipient] = useState("");
    const [flashMessage, setFlashMessage] = useState(null);

    const [viewAllowedusers, setViewAllowedusers] = useState(null);


    let timeout;
    function resetFlashMessage() {
        setFlashMessage(<p className="invite-flash-msg txt-invisible">.</p>)
    }

    useEffect(() => {
        setFlashMessage(<p className="invite-flash-msg txt-invisible">.</p>);
    }, [])

    useEffect(() => {
        setViewAllowedusers(
            <div className="invite-allowed-users-container">
                <h3 className="invite-current-title">Current users</h3>
                <div>{props.allowedUsers.map((user, index) => <p key={index} className="invite-current-user">{user}</p>)}</div>
            </div>
        );
    }, [props.allowedUsers])

    function newFlashMessage(message, color) {
        if (color == "green") {
            setFlashMessage(<p className="invite-flash-msg txt-green">{message}</p>);
        }
        if (color == "blue") {
            setFlashMessage(<p className="invite-flash-msg txt-blue">{message}</p>);
        }
        if (color == "red") {
            setFlashMessage(<p className="invite-flash-msg txt-red">{message}</p>);
        }
        clearTimeout(timeout);
        timeout = setTimeout((resetFlashMessage), 1500);
    }

    function changedInput(event) {
        setRecipient(event.target.value);
    }

    async function submit() {
        if (props.allowedUsers.includes(recipient)) {
            newFlashMessage("User is already in project.", "blue");
            return
        }
        const result = await inviteModel.send(props.currentUser, recipient, props.currentDoc);
        if (result.status == "201") {
            newFlashMessage("Success, user is invited!", "green");
            props.setAllowedUsers([...props.allowedUsers, recipient]);
            return
        }
        newFlashMessage("Error, user was not invited.", "red");
    }


    return (
        <div className='invite-big-container'>

            <div className="invite-container">
                <h3 className="invite-title">Invite new user</h3>
                <p className="invite-instruction">Here you can invite other people to edit the document. Send invite by email below.</p>
                <div className="invite-input-container">
                    <input type="email" name="email" className='invite-input' placeholder="Email address" size="30" onChange={changedInput} />
                    <GrSend size={25} className="toolIcon" onClick={submit} />
                </div>
                {flashMessage}
            </div>

            {viewAllowedusers}

        </div>
    );
}