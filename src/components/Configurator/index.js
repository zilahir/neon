import React, { useContext, useState } from 'react'

import styles from './Configurator.module.scss'
import rootContext from '../../context/rootContext'
import ColorSelector from './components/ColorSelector'
import FontSelector from './components/FontSelector'
import Sizes from './components/Sizes'

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
      <ColorSelector />
      <FontSelector />
      <Sizes />
    </div>
  )
}

export default Configurator