
import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from '../../store';

const SidePanel = styled.div`
  margin-left: 0.2rem;
  padding: 1rem;
  background-color: #35303E; 
  position: fixed; 
  top: 0;
  right: 0;
  width: 200px
`;
const SidePanelHeading = styled.h4`
  color: white;
  font-family: Helvetica;
  margin: 0;
  text-transform: uppercase;
`;

const SidePanelControls = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledInputLabel = styled.label`
  margin-top: 0.2rem;
  padding: 0.1rem;
  color: rgba(255,255,255,0.4);;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;
const StyledInput = styled.input`
  margin-top: 0.2rem;
  border: 0;
  padding: 0.5rem;
  background-color: rgba(0,0,0,0.4);
  color: #306082;
  font-size: 13px;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  margin-top: 0.2rem;
  border: 0;
  padding: 0.5rem;
  background-color: rgba(0,0,0,0.4);
  color: #306082;
  font-size: 16px;
`;

const GenerateButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: 0;
  padding: 0.5rem;
  margin-top: 1rem;
  color: white;
  background-color: #306082;
  cursor: pointer;
  border-radius: 4px;
`;

export default function MapGeneratorPanel() {

  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  const setPlayerPositionToRandomOpenCell = useStore(state => state.player.setPlayerPositionToRandomOpenCell);
  
  const [state, setState] = useState({
    fields:{
      width: 15,
      height: 15,
      room_min_size: 10,
      room_max_size: 10,
      max_rooms: 1,
      type: 'basic'
    }
  });

  // setActiveCellMapParameters({
  //   width: state.fields.width,
  //   height: state.fields.height,
  //   roomSizeRange: [state.fields.room_min_size,state.fields.room_max_size],
  //   maxRooms: state.fields.max_rooms
  // })

  // return null // ! Bypass the panel for now

  return (
    <SidePanel>
      <SidePanelHeading> Generate Map </SidePanelHeading>
      <SidePanelControls onSubmit={(event)=>{
        event.preventDefault();
        console.log("gooi", event);
      }}>
        <StyledInputLabel>width: </StyledInputLabel>
        <StyledInput name="width" id="width" value={state.fields.width} onChange={(event)=>{
          console.log("event: ", event);
          setState({
            fields: {
              ...state.fields,
              width: event.target.value
            }
          })
        }}/>
        
        <StyledInputLabel>height: </StyledInputLabel>
        <StyledInput name="height" id="height" value={state.fields.height} onChange={(event)=>{
          console.log("event: ", event);
          setState({
            fields: {
              ...state.fields,
              height: event.target.value
            }
          })
        }}/>

        <StyledInputLabel>room min size: </StyledInputLabel>
        <StyledInput name="room_min_size" id="room_min_size" value={state.fields.room_min_size} onChange={(event)=>{
          console.log("event: ", event);
          setState({
            fields: {
              ...state.fields,
              room_min_size: event.target.value
            }
          })
        }}/>

        <StyledInputLabel>room max size: </StyledInputLabel>
        <StyledInput name="room_max_size" id="room_max_size" value={state.fields.room_max_size} onChange={(event)=>{
          console.log("event: ", event);
          setState({
            fields: {
              ...state.fields,
              room_max_size: event.target.value
            }
          })
        }}/>

        <StyledInputLabel>max rooms: </StyledInputLabel>
        <StyledInput name="max_rooms" id="max_rooms" value={state.fields.max_rooms} onChange={(event)=>{
          console.log("event: ", event);
          setState({
            fields: {
              ...state.fields,
              max_rooms: event.target.value
            }
          })
        }}/>

        <StyledInputLabel>type: </StyledInputLabel>
        <StyledSelect name="type" id="type" value={state.fields.type} onChange={(event)=>{
          setState({
            fields: {
              ...state.fields,
              type: event.target.value
            }
          })
          
        }}>
          <option value="basic">basic</option>
          <option value="cellular">cellular</option>
        </StyledSelect>  
        
        <GenerateButton onClick={()=>{
          setActiveCellMapParameters({
            width: state.fields.width,
            height: state.fields.height,
            roomSizeRange: [state.fields.room_min_size,state.fields.room_max_size],
            maxRooms: state.fields.max_rooms,
            type: state.fields.type
          })
          setPlayerPositionToRandomOpenCell();
          
        }}>Generate</GenerateButton>
        
      </SidePanelControls>
    </SidePanel>
  )

}

