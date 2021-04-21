import React, { useState } from 'react'

import Configurator from './components/Configurator'
import Preview from './components/Preview'
import RootContext from './context/rootContext'

import styles from './styles/Global.module.scss'

const App = () => {
  const [previewText, setPreviewText] = useState('')
  const [activeColor, setActiveColor] = useState('#000000')
  return (
    <RootContext.Provider value={{
      previewText,
      setPreviewText,
      activeColor,
      setActiveColor
    }}>
    <div className={styles.rootContainer}>
      <Configurator />
      <Preview />
    </div>
  </RootContext.Provider>
  )
}

export default App