import config from '../config/config.json';
import docModel from './docModel';

const inviteModel = {
    send: async function send(sender, recipient, doc) {

        const email = {
            recipient: recipient,
            subject: `Invitation by ${sender}`,
            text: `Welcome to Erik's Editor,

You have been invited by ${sender} to work on document "${doc.name}".
Register or log into Erik's Editor to begin.

Happy editing!
https://www.student.bth.se/~erna21/editor/
`
        };

        const response = await fetch(`${config.base_url}/mail/send`, {
            body: JSON.stringify(email),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        // Save new allowed_user (the rest stays the same as when loaded document)
        if (result.status == "201") {

            // const newAllowedUsers = [...doc.allowed_users, recipient];
            // const docSave = {
            //     "_id": doc["_id"],
            //     "name": doc.name,
            //     "content": doc.content,
            //     "comments": doc.comments,
            //     "allowed_users": newAllowedUsers
            // }

            const user = {
                _id: doc._id,
                new_user: recipient
            }

            await docModel.addUser(user);
        }

        return result;
    }
}

export default inviteModel;
