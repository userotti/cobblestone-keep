
import React from 'react'
import useStore from '../../store'

export default function HUD() {

  const { 
    health,
    armour,
    damage
  } = useStore(state => state.game);
  
  return (
    <div className="hud">
      <span><img src="/assets/hud/heart.png" alt="health"/><em>{health}</em></span>
      <span><img src="/assets/hud/armour.png" alt="armour"/><em>{armour}</em></span>
      <span><img src="/assets/hud/damage.png" alt="damage"/><em>{damage}</em></span>
    </div>
  )

}

