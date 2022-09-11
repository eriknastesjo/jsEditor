import config from '../config/config.json'

const docModel = {
    createDoc: async function createDoc() {

        const newDoc = {
            name: "New document",
            content: ""
        };

        const response = await fetch(`${config.base_url}/`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        return result.data.result;

    },
    getAllDocs: async function getAllDocs() {

        const response = await fetch(`${config.base_url}/`);
        const result = await response.json();

        return result.data.result;

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