// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Editor from './components/editor';
import Toolbar from './components/toolbar';
import StartMenu from './components/startMenu';



function App() {

  const [currentDoc, setCurrentDoc] = useState(null);

  return (
    <div className="App">

{/*
      <Toolbar />
      <Editor /> */}


      {
        currentDoc == null ?
          <StartMenu currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} />
          :
          <div>
            <Toolbar currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} />
            <Editor currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} />
          </div>
      }

    </div>
  )
}

export default App;
