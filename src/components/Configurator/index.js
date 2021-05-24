import React, { useContext, useState } from 'react'

import styles from './Configurator.module.scss'
import rootContext from '../../context/rootContext'
import ColorSelector from './components/ColorSelector'
import FontSelector from './components/FontSelector'
import Sizes from './components/Sizes'
import BoardSelector from '../BoardSelector'
import WaterProof from '../WaterProof'
import Dimmer from '../Dimmer'
import FinalPrice from '../FinalPrice'

const Configurator = () => {
  const { previewText, setPreviewText } = useContext(rootContext)
  return ( 
    <div className={styles.configuratorRootContainer}>
      <input
        type="text"
        placeholder="szöveg"
        onChange={e => setPreviewText(e.target.value)}
        className={styles.textInput}
        value={previewText}
      />
      <FontSelector />
      <ColorSelector />
      <Sizes />
      <BoardSelector />
      <WaterProof />
      <Dimmer />
      <FinalPrice /> 
    </div>
  )
}

export default Configurator