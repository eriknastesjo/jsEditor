// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Editor from './components/editor';
import Toolbar from './components/toolbar';
import StartMenu from './components/startMenu';

import { io } from "socket.io-client";



function App() {

  const [currentDoc, setCurrentDoc] = useState(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:1337/"));
    if (socket) {
      return () => {
        // todo: ta reda på vad disconnet gör??
        socket.disconnect();
      }
    }
  }, []);

  if (socket && currentDoc) {
    console.log("ROOM");
    socket.emit("create", currentDoc["_id"]);
  }

  // if (socket) {
  //   socket.on("content", function (data) {
  //     console.log(data);
  //   });
  // }


  return (
    <div className="App">


      {/* <Toolbar /> */}
      {/* <Editor /> */}


      {
        currentDoc == null ?
          <StartMenu
            currentDoc={currentDoc}
            setCurrentDoc={setCurrentDoc}
            socket={socket}
          />
          :
          <div>
            <Toolbar
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

export default App;
