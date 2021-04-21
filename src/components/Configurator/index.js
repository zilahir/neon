import React, { useContext, useState } from 'react'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'

import styles from './Configurator.module.scss'
import rootContext from '../../context/rootContext'

const colors = [
  '#ff90ff',
  '#a5492a'
]

const Configurator = () => {
  const { previewText, setPreviewText, setActiveColor } = useContext(rootContext)
  return ( 
    <div className={styles.configuratorRootContainer}>
      <input
        type="text"
        placeholder="szöveg"
        onChange={e => setPreviewText(e.target.value)}
        className={styles.textInput}
        value={previewText}
      />
      <div className={styles.colorContainer}>
        {
          colors.map(color => (
            <span key={color} onClick={() => setActiveColor(color)}>
              <WbIncandescentIcon htmlColor={color} />
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default Configurator