
import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from '../../store';

const SidePanel = styled.div`
  margin-left: 0.2rem;
  padding: 0.5rem;
  background-color: #567;  
`;
const SidePanelHeading = styled.h4`
  color: white;
  font-family: Helvetica;
`;

const SidePanelControls = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledInputLabel = styled.label`
  margin-top: 0.2rem;
  padding: 0.1rem;
  color: white;
  font-size: 12px;
`;
const StyledInput = styled.input`
  margin-top: 0.2rem;
  border: 0;
  padding: 0.5rem;
  background-color: #9ab;
  color: white;
  font-size: 16px;
`;
const GenerateButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: 0;
  padding: 0.5rem;
  margin-top: 1rem;
  color: white;
  background-color: #bcb;
  cursor: pointer;
`;

export default function MapGeneratorPanel() {

  const setActiveCellMapParameters = useStore(state => state.cellMap.setActiveCellMapParameters);
  
  const [state, setState] = useState({
    fields:{
      width: 5,
      height: 5,
      room_min_size: 5,
      room_max_size: 5,
      max_rooms: 1
    }
  });

  setActiveCellMapParameters({
    width: state.fields.width,
    height: state.fields.height,
    roomSizeRange: [state.fields.room_min_size,state.fields.room_max_size],
    maxRooms: state.fields.max_rooms
  })

  return null // ! Bypass the panel for now
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
        
        <GenerateButton onClick={()=>{
          setActiveCellMapParameters({
            width: state.fields.width,
            height: state.fields.height,
            roomSizeRange: [state.fields.room_min_size,state.fields.room_max_size],
            maxRooms: state.fields.max_rooms
          })
          
        }}>Generate</GenerateButton>
        
      </SidePanelControls>
    </SidePanel>
  )

}

