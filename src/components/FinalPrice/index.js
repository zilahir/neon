import React, { useContext } from 'react'
import html2canvas from 'html2canvas'

import { addCustomNeonToBasktet } from '../../utils/axios'
import RootContext from '../../context/rootContext'
import styles from './Price.module.scss'
import { t, getLanguage } from '../../utils/i18n'
import { currencySign } from '../../utils/i18n/currencies'

const ELEMENT_BLACKLIST = ['test-image', 'shadow-toggle', 'image-selector']

const FinalPrice = () => {
  const {
    price,
    currentSize,
    previewText,
    activeColor,
    activeFont,
    backBoard,
    currency,
    setBase64Image
   } = useContext(RootContext)

   async function generateImage() {
    return new Promise((resolve, reject) => {
      const previewContainer = document.querySelector('#neon-preview')
      html2canvas(previewContainer, {
        logging: true,
        useCORS: true,
        ignoreElements: element => {
          if (ELEMENT_BLACKLIST.some(blacklist => blacklist === element.id)) {
            return true
          }
        }
      }).then(function(canvas) {
        document.body.appendChild(canvas);
        const image = canvas.toDataURL("image/jpeg");
        setBase64Image(image)
        resolve({
          image
        })
      });
    })
  }

  async function placeToBasket() {
    const { image } = await generateImage()
     addCustomNeonToBasktet({
      previewText,
      price: price.find(p => p.size === currentSize.size),
      currentSize,
      activeColor,
      activeFont,
      backBoard: backBoard.value,
      productImage: image,
    }).then(() => {
      const currentLanguage = getLanguage()
      if (currentLanguage === 'hu') {
        window.location = 'https://dekorklub.hu/kosar'
      } else {
        window.location = 'https://dekorklub.hu/cart/?lang=en'
      }
    })
  }

  const currencyKey = Object.keys(currency)[0]

	const currentLanguage = getLanguage()

  function formatSum(sum) {
		let formattedSum
		if (currentLanguage === 'hu') {
			formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toLocaleString()} ${currencySign[currencyKey]}`
		} else if (currentLanguage === 'en') {
			formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toFixed()} ${currencySign[currencyKey]}`
		}

		return formattedSum
	}

  return (
    price.length > 0 && (
      <>
        <div className={styles.priceContainer}>
          <p>
            {t('meta.total')}
          </p>
          <p>
            {
              formatSum(price.find(p => p.size === currentSize.size).price)
            }
          </p>
        </div>
        <div className={styles.placeToBasketBtnContainer}>
          <button onClick={() => placeToBasket()} type="button">
            {t('meta.add-to-cart')}
          </button>
        </div>
      </>
    )
  )
}

export default FinalPrice