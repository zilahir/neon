import React, { useState, useEffect } from 'react'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";

import Configurator from './components/Configurator'
import CustomFontsProvider from './components/Configurator/components/FontSelector/utils/fonts'
import Preview from './components/Preview'
import RootContext from './context/rootContext'

import styles from './styles/Global.module.scss'
import { queryClient } from './utils/graphql/apiEndpoints'

const INITIAL_PRICE = 36000
const S_CHAR_PRICE = 9000
const M_CHAR_PRICE = 11000
const L_CHAR_PRICE = 13000
const XL_CHAR_PRICE = 16000

const charPrices = {
  s: S_CHAR_PRICE,
  m: M_CHAR_PRICE,
  l: L_CHAR_PRICE,
  xl: XL_CHAR_PRICE,
}

function useSizes() {
	return useQuery("sizes", async () => {
		const { sizes } = await request(
			apiRoot,
			gql`
				query {
					sizes {
						size
						price
						description
					}
				}
			`
		);
		return sizes;
	});
}

const App = () => {
  const { status, data: prices, error, isFetching } = useSizes();
  const [previewText, setPreviewText] = useState('hello')
  const [activeColor, setActiveColor] = useState('#000000')
  const [activeFont, setActiveFont] = useState('Bubble Letter')
  const [currentSize, setCurrentSize] = useState({
    size: 's',
    price: INITIAL_PRICE
  })
  const [price, setPrice] = useState(Object.keys(charPrices).map(defaultPrice => ({
    price: 0,
    size: defaultPrice
  })))

  useEffect(() => {
    setPrice(Object.keys(charPrices).map(defaultPrice => ({
      price: Array.isArray(prices) ? prices.find(price => price.size === defaultPrice).price : 0,
      size: defaultPrice
    })))
  }, [prices])


  useEffect(() => {
    let totalPrice = currentSize.price
    const textLength = previewText.length
    if (Array.isArray(prices) && prices.length > 0) {
      const calculatedPrices = Object.keys(charPrices).map(priceType => ({
        price: prices.find(price => price.size === priceType).price + textLength * charPrices[priceType],
        size: priceType
      }))
      setPrice(calculatedPrices)
    }

  }, [activeFont, currentSize, previewText])
  return (
    <React.Fragment>
        <CustomFontsProvider>
            <RootContext.Provider value={{
              previewText,
              setPreviewText,
              activeColor,
              setActiveColor,
              activeFont,
              setActiveFont,
              currentSize,
              setCurrentSize,
              price,
              setPrice
            }}>
              <div className={styles.rootContainer}>
                  <Configurator />
                  <Preview />
              </div>
            </RootContext.Provider>
          </CustomFontsProvider>
    </React.Fragment>
  )
}

export default App