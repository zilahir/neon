import React, { useState } from 'react'
import { QueryClientProvider } from 'react-query'

import Configurator from './components/Configurator'
import CustomFontsProvider from './components/Configurator/components/FontSelector/utils/fonts'
import Preview from './components/Preview'
import RootContext from './context/rootContext'

import styles from './styles/Global.module.scss'
import { queryClient } from './utils/graphql/apiEndpoints'

const App = () => {
  const [previewText, setPreviewText] = useState('hello')
  const [activeColor, setActiveColor] = useState('#000000')
  const [activeFont, setActiveFont] = useState('Bubble Letter')
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <CustomFontsProvider>
            <RootContext.Provider value={{
              previewText,
              setPreviewText,
              activeColor,
              setActiveColor,
              activeFont,
              setActiveFont
            }}>
              <div className={styles.rootContainer}>
                  <Configurator />
                  <Preview />
              </div>
            </RootContext.Provider>
          </CustomFontsProvider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App