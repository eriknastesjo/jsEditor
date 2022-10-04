import config from '../config/config.json';

const docModel = {
    createDoc: async function createDoc(user) {

        const newDoc = {
            allowed_users: [user],
            name: "New document",
            content: ""
        };

        const response = await fetch(`${config.base_url}/insert`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        return result.data.result;

    },
    getAllDocs: async function getAllDocs(user, token) {

        if (token !== "") {     // todo: ändra till att kolla om result innehåller data och annars skicka felmeddelandet som i authmodel
            const reqUser = {
                user: user
            };

            const response = await fetch(`${config.base_url}/findUsersDocs`, {
                body: JSON.stringify(reqUser),
                headers: {
                    "x-access-token": token,
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
            const result = await response.json();

            return result.data.result;
        }



        // const response = await fetch(`${config.base_url}/`, {
        //     headers: {
        //         "x-access-token": token
        //     }
        // });
        // const result = await response.json();



    },
    updateDoc: async function updateDoc(doc) {

        const response = await fetch(`${config.base_url}/update`, {
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        return result.data.result;

    },
    findDoc: async function findDoc(id) {

        const searchId = {
            _id: id,
        };

        const response = await fetch(`${config.base_url}/find`, {
            body: JSON.stringify(searchId),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        return result.data.result;

    },
};


export default docModel;