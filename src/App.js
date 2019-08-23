import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import useStore from './store';
import GameScene from './components/three/scenes/GameScene.js';
import CameraControls from './components/ui/camera-controls';

const BLOCK_SIZE = 1;
const MAP_SIZE = 4;


function App() {

  
  // return <GameScene assets={assets} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}/>
  return (
    <Router>
      <div>
        
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        
      </div>
    </Router>
  );
}



export default App;




function Home() {

  const [assets, setAssets] = useState({
    'grey_brick_wall_three_gltf': {
      url: '/assets/walls_on_ground.gltf',
    },
    'brown_floor_three_gltf': {
      url: '/assets/tiled_floor.gltf',
    },
    'minecraft_atlas': {
      url: '/assets/atlas.png',
    },

    'texture_wall_sides': {
      url: '/assets/walls/bricks_shaded.png',
    },
    'texture_wall_top': {
      url: '/assets/walls/bricks-top2.png',
    },
    'texture_floor_stones': {
      url: '/assets/walls/floor-stones.png',
    },
  });

  
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  
  console.log("canvasContainerSizeInPixels:", canvasContainerSizeInPixels);

  return <div>
      
      <SceneContainer width={canvasContainerSizeInPixels[0]} height={canvasContainerSizeInPixels[1]}>
        <GameScene assets={assets} BLOCK_SIZE={BLOCK_SIZE} MAP_SIZE={MAP_SIZE}/>
        <CameraControls/>
        
      </SceneContainer>
    
  </div>;
}

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: 2px solid palevioletred;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  margin: 0 1em;
  padding: 1em 1em;
  cursor: pointer;
`

const SceneContainer = styled.div`
  position: relative;
  width: ${(props)=>props.width}px;
  height: ${(props)=>props.height}px;
  background-color: black;
  margin: 1rem;
`


function About() {
  return <h2>About</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}