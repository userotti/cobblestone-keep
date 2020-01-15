import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import useStore from './store';
import GameScene from './components/three/scenes/GameScene.js';
import NewScene from './components/three/scenes/NewScene.js';
import CameraControls from './components/ui/CameraControls';
import MapGeneratorPanel from './components/ui/MapGeneratorPanel';

function App() {

  
  return (
    <Router>
      <div>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/sprites" component={Sprites} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        
      </div>
    </Router>
  );
}


export default App;




function Home() {

  const assets = useStore(state => state.assets);
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  

  
  
  return <div>
      <Layout>
        <SceneContainer width={canvasContainerSizeInPixels[0]} height={canvasContainerSizeInPixels[1]}>
          <GameScene assets={assets}/>
          <CameraControls/>
        </SceneContainer>
        <MapGeneratorPanel/>
      </Layout>
      
    
  </div>;
}

function Sprites() {

  const assets = useStore(state => state.assets);
  const canvasContainerSizeInPixels = useStore(state => state.canvasContainerSizeInPixels);  

  
  
  return <div>
      <Layout>
        <SceneContainer width={canvasContainerSizeInPixels[0]} height={canvasContainerSizeInPixels[1]}>
          <NewScene assets={assets}/>
          <CameraControls/>
        </SceneContainer>
        <MapGeneratorPanel/>
      </Layout>
      
    
  </div>
}

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem;
`;



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
  margin: 0rem;
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
