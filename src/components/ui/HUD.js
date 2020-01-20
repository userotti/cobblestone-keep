
import React, { useState } from 'react'
import useStore from '../../store'

export default function HUD() {

  const { 
    health,
    armour,
    damage
  } = useStore()
  
  const [state, setState] = useState({
    fields:{
      width: 5,
      height: 5,
      room_min_size: 5,
      room_max_size: 5,
      max_rooms: 1
    }
  })


  return (
    <div className="hud">
      <span><img src="/assets/hud/heart.png"/><em>{health}</em></span>
      <span><img src="/assets/hud/armour.png"/><em>{armour}</em></span>
      <span><img src="/assets/hud/damage.png"/><em>{damage}</em></span>
    </div>
  )

}

