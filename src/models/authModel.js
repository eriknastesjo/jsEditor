// import React, { useState, useEffect } from 'react';
import config from '../config/config.json';

// const [jsToken, setJsToken] = useState("");



const authModel = {
    register: async function register(email, password) {

        const newUser = {
            email: email,
            password: password
        }

        const response = await fetch(`${config.base_url}/auth/register`, {
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        // if (result["data"]["status"] == "201") {
        //     const jsToken = await this.login(email, password);  // login method will return error message if not success
        //     return jsToken;
        // }

        return result;
    },
    login: async function login(email, password) {

        const user = {
            email: email,
            password: password
        }

        const response = await fetch(`${config.base_url}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();

        // console.log(result);

        // const message = result["errors"]["message"];

        // console.log(message);

        // const jsToken = result["data"]["token"];

        // if (jsToken !== undefined) {
        //     console.log("NO TOKEN");
        //     return jsToken;
        // }

        return result;
    }
}


export default authModel;