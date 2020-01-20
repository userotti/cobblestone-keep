import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import useStore from './store';
import GameScene from './components/three/scenes/GameScene.js'
import HUD from './components/ui/HUD'
import CameraControls from './components/ui/CameraControls'
import MapGeneratorPanel from './components/ui/MapGeneratorPanel'




function App() {
  

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />        
      </div>
    </Router>
  )
}


export default App

function Home() {


  
  const game = useStore(state => state.game);
  const assets = useStore(state => state.assets);
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  
  return <div className="game-holder">
    <h1>MoonSweeper</h1>
    <HUD/>
    <SceneContainer width={canvasContainerSizeInPixels[0]} height={canvasContainerSizeInPixels[1]}>
      <GameScene assets={assets}/>
    </SceneContainer>
    <CameraControls/>
    <MapGeneratorPanel/>
    <br/>
    <a href="https://games.truevalhalla.com/dungeonsweep/index.html">DungeonSweep Link</a>
  </div>
}


const SceneContainer = styled.div`
  position: relative;
  width: ${(props)=>props.width}px;
  height: ${(props)=>props.height}px;
  background-color: black;
  margin: 0rem;
`
