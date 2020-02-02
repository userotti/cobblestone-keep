import React, {Fragment} from 'react'
import styled from 'styled-components'
import useStore from '../../store'

const ModeManager = function(){

  const modeManager = useStore(state => state.modeManager);
  const nextTurn = useStore(state => state.player.nextTurn);
  
  
  return (
    <Fragment>
      {modeManager.activeMode ? <CurrentMode onClick={()=>{
        nextTurn(modeManager.activeMode);
      }}>{modeManager.activeMode.label}</CurrentMode> : null}
      {modeManager.visible && <ModeMenu onClick={(e)=>{
        e.stopPropagation();
        console.log("ModeMenu: onClick");
      }}>{
          modeManager.availableModeMenuItems.map((menuItem, index)=>{
            return <ModeMenuItem onClick={(e)=>{
              e.stopPropagation();
              console.log("ModeMenuItem: onClick");
              modeManager.setMenuVisiblity(false);
              modeManager.setActiveMode(menuItem);
              
            }} key={index}>{menuItem.label}</ModeMenuItem>
          })
        }
      </ModeMenu>}  
    </Fragment>
  )
}

const ModeMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CurrentMode = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: #fff;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;

  cursor: pointer;
`

const ModeMenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: black;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  width: 150px;
  padding: 20px;
  color: white;
  cursor: pointer;
`

export default ModeManager;