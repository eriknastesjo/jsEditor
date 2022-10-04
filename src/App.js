// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import config from './config/config.json';

import Editor from './components/editor';
import Toolbar from './components/toolbar';
import StartMenu from './components/startMenu';

import { io } from "socket.io-client";



export default function App() {

  const [currentDoc, setCurrentDoc] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState("");

  const [socket, setSocket] = useState(null);

  // CLIENT
  useEffect(() => {
    setSocket(io(config.base_url));
    if (socket) {
      return () => {
        socket.disconnect();
      }
    }
  }, []);

  if (socket && currentDoc) {
    console.log("JOINING ROOM");
    socket.emit("join", currentDoc["_id"]);
  }


  return (
    <div className="App">


      {/* <Toolbar /> */}
      {/* <Editor /> */}

      {
        currentDoc == null ?
          <StartMenu
            currentToken={currentToken}
            setCurrentToken={setCurrentToken}
            currentDoc={currentDoc}
            setCurrentDoc={setCurrentDoc}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            socket={socket}
          />
          :
          <div>
            <Toolbar
              currentToken={currentToken}
              currentUser={currentUser}
              currentDoc={currentDoc}
              setCurrentDoc={setCurrentDoc}
              socket={socket}
              />
            <Editor
              currentDoc={currentDoc}
              setCurrentDoc={setCurrentDoc}
              socket={socket}
            />
          </div>
      }

    </div>
  )
}

