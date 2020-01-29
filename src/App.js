import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css';
import styled from 'styled-components';
import useStore from './store';
import GameScene from './components/three/scenes/GameScene.js'
import HUD from './components/ui/HUD'
import CameraControls from './components/ui/CameraControls'
import MapGeneratorPanel from './components/ui/MapGeneratorPanel'

import {Howl, Howler} from 'howler'

// const music = new Howl({
//   src: ['/assets/sounds/sound_music_loop.wav'],
//   volume: 0.2,
//   loop: true
// });

function App() {
  
  // music.play()

  return <Home/>
    // ! Does not work with Electron for some reason...
    // <Router>
    //   <div>
    //     <Route exact path="/" component={Home} />        
    //   </div>
    // </Router>
  
}


export default App

function Home() {

  const { 
    muted
  } = useStore()
  
  const game = useStore(state => state.game);
  const assets = useStore(state => state.assets);
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels); 

  // music.play()
  // muted ? music.volume(0) : music.volume(0.5)

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
