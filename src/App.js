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
import { setLanguage } from './utils/i18n';

const INITIAL_PRICE = 36000
const S_CHAR_PRICE = 9000
const M_CHAR_PRICE = 11000
const L_CHAR_PRICE = 13000
const XL_CHAR_PRICE = 16000

const INIT_CHAR_PRICE = {
  simple: {
  },
  double: {
  }
}

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
  const [previewText, setPreviewText] = useState('')
  const [activeColor, setActiveColor] = useState('#000000')
  const [backBoard, setBackBoard] = useState(boardOptions[0])
  const [charPrices, setChartPrices] = useState(INIT_CHAR_PRICE)

  useEffect(() => {
    if (charPrices_) {
      let charPricesTemp = INIT_CHAR_PRICE
      const simple = charPrices_.filter(charPrice => charPrice.fontType === 'simple')
      const double = charPrices_.filter(charPrice => charPrice.fontType === 'double')
      for (const key of simple) {
        charPricesTemp.simple[key.size] = key.price
      }
  
      for (const key of double) {
        charPricesTemp.double[key.size] = key.price
      }
      setChartPrices(charPricesTemp)
      setPreviewText('hello')

    }
  }, [charPrices_])


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

  useEffect(() => {
    const searchString = window.location.search
    console.log(searchString)
    const languageRegexp = new RegExp(/.*=(.*)/)
    const languageMatch = searchString.match(languageRegexp)
    if (Array.isArray(languageMatch)) {
      const language = languageMatch[1]
      if (language === 'en') {
        setLanguage('en')
        console.log('current language is en')
      }
    } else {
      console.log('current language is hu')
      setLanguage('hu')
    }
  }, [window.location])

  useEffect(() => {
    const textLength = previewText.length
    const selectedFontType = activeFont.fontType
    if (Array.isArray(sizes) && sizes.length > 0) {
      const calculatedPrices = Object.keys(charPrices[selectedFontType]).map(priceType => ({
        price: sizes.find(({ size }) => size === priceType).price + (textLength * charPrices[selectedFontType][priceType] + backBoard.price),
        size: priceType
      }))
      setPrice(calculatedPrices)
    }
  }, [activeFont, currentSize, previewText, sizes, backBoard, charPrices])
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