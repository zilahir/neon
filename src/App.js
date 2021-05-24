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
import { apiRoot, queryClient } from './utils/graphql/apiEndpoints'
import { boardOptions } from './components/BoardSelector'

const INITIAL_PRICE = 36000
const S_CHAR_PRICE = 9000
const M_CHAR_PRICE = 11000
const L_CHAR_PRICE = 13000
const XL_CHAR_PRICE = 16000

function useCharPrices() {
  return useQuery("charPrices", async () => {
    const { charprices } = await request(
      apiRoot,
      gql`
      query {
        charprices {
          size,
          fontType
          price
          }
        }
      `
    )

    return charprices
  })
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
  const { status, data: sizes, error, isFetching } = useSizes();
  const { data: charPrices_ } = useCharPrices()
  const [previewText, setPreviewText] = useState('hello')
  const [activeColor, setActiveColor] = useState('#000000')
  const [backBoard, setBackBoard] = useState(boardOptions[0].price)

  let charPrices = {
    simple: {
    },
    double: {
    }
  }

  if (charPrices_) {
    const simple = charPrices_.filter(charPrice => charPrice.fontType === 'simple')
    const double = charPrices_.filter(charPrice => charPrice.fontType === 'double')
    for (const key of simple) {
      charPrices.simple[key.size] = key.price
    }

    for (const key of double) {
      charPrices.double[key.size] = key.price
    }
  }

  const [activeFont, setActiveFont] = useState({
    name: 'Allan',
    fontType: 'simple'
  })
  const [currentSize, setCurrentSize] = useState({
    size: 's',
    price: INITIAL_PRICE
  })

  const [price, setPrice] = useState(Object.keys(charPrices['simple']).map(defaultPrice => ({
    price: 0,
    size: defaultPrice
  })))



  useEffect(() => {
    let totalPrice = currentSize.price
    const textLength = previewText.length
    const selectedFontType = activeFont.fontType
    if (Array.isArray(sizes) && sizes.length > 0) {
      const calculatedPrices = Object.keys(charPrices[selectedFontType]).map(priceType => ({
        price: sizes.find(({ size }) => size === priceType).price + (textLength * charPrices[selectedFontType][priceType] + backBoard),
        size: priceType
      }))

      setPrice(calculatedPrices)
    }

  }, [activeFont, currentSize, previewText, sizes, backBoard])
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
              setPrice,
              setBackBoard,
              backBoard,
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