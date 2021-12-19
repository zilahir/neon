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
import { useQuery } from 'react-query'
import { request, gql } from "graphql-request";
import { apiRoot } from '../../utils/graphql/apiEndpoints'
import MarketingText from '../common/MarketingText'
import { getLanguage } from '../../utils/i18n'

function useMarketingText() {
  return useQuery("marketingTexts", async () => {
    const { marketingtexts } = await request(
      apiRoot,
      gql`
        query {
          marketingtexts {
            marketingtext
            languageKey
            key
          }
        }
      `
    )
    console.log('marketingTexts', marketingtexts)
    return marketingtexts
  })
}

const Configurator = () => {
  const { previewText, setPreviewText } = useContext(rootContext)
  const { data: marketingTexts } = useMarketingText();
  const [isOpen, toggleOpen] = useState({
    color: false,
    font: false,
  })


function handleOpen(type) {
  const newValue = isOpen[type]
  let rest = Object.entries(isOpen).map(([key]) => ({
    [key]: false
  }))
  rest = Object.assign({}, ...rest)
  toggleOpen(() => ({
    ...rest,
    [type]: !newValue,
  }))
}

function getMarketingText(key) {
  return marketingTexts.find(text => text.key === key && text.languageKey === getLanguage())
}

  return ( 
    <div className={styles.configuratorRootContainer}>
      <textarea
        type="text"
        placeholder="szöveg"
        onChange={e => setPreviewText(e.target.value)}
        className={styles.textInput}
        value={previewText}
      />
      {
        marketingTexts && marketingTexts.length > 0 && (
          <MarketingText text={getMarketingText('CONTACT').marketingtext} />
        )
      }
      <FontSelector isOpen={isOpen.font} toggleOpen={() => handleOpen('font')} />
      <ColorSelector isOpen={isOpen.color} toggleOpen={() => handleOpen('color')}/>
      <Sizes />
      {
        marketingTexts && marketingTexts.length > 0 && (
          <MarketingText text={getMarketingText('HEIGHT').marketingtext} />
        )
      }
      <BoardSelector />
      <WaterProof />
      <Dimmer />
      <FinalPrice /> 
    </div>
  )
}

export default Configurator