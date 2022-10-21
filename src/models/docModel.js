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
    addUser: async function addUser(user) {

        const response = await fetch(`${config.base_url}/addUser`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        return result.data.result;

    },
    findDoc: async function findDoc(id) {

        // Utan att använda graphql
        // ==========================

        // const searchId = {
        //     _id: id,
        // };

        // const response = await fetch(`${config.base_url}/find`, {
        //     body: JSON.stringify(searchId),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     method: 'POST'
        // })

        // const result = await response.json();

        // return result.data.result;

        // Använder graphql
        // ==========================

        const response = await fetch(`${config.base_url}/graphql`, {
            body: JSON.stringify({
                query: `{
                    doc (_id: "${id}")
                    {
                        _id
                        name
                        content
                        comments {
                        user
                        commentNum
                        comment
                        }
                        allowed_users
                    }
                }`
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST'
        })

        const result = await response.json();

        return result.data.doc;

    }
    // findComments: async function findComments() {
    //     const response = await fetch(`${config.base_url}/graphql`, {
    //         body: JSON.stringify({
    //             query: `{
    //                 doc (_id: "${id}")
    //                 {
    //                     comments {
    //                     user
    //                     commentNum
    //                     comment
    //                     }
    //                 }
    //             }`
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         method: 'POST'
    //     })

    //     const result = await response.json();


    //     return result.data.doc;
    // }
};


export default docModel;