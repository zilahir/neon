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

function useMarketingText() {
  return useQuery("marketingTexts", async () => {
    const { marketingtexts } = await request(
      apiRoot,
      gql`
        query {
          marketingtexts {
            marketingtext
          }
        }
      `
    )
    return marketingtexts
  })
}

const Configurator = () => {
  const { previewText, setPreviewText } = useContext(rootContext)
  const { data: marketingTexts } = useMarketingText();

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
          <MarketingText text={marketingTexts[0].marketingtext} />
        )
      }
      <FontSelector />
      <ColorSelector />
      <Sizes />
      {
        marketingTexts && marketingTexts.length > 0 && (
          <MarketingText text={marketingTexts[1].marketingtext} />
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