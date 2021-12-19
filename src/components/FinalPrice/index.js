import React, { useContext } from 'react'

import { addCustomNeonToBasktet } from '../../utils/axios'
import RootContext from '../../context/rootContext'
import styles from './Price.module.scss'
import { t, getLanguage } from '../../utils/i18n'

const FinalPrice = () => {
  const {
    price,
    currentSize,
    previewText,
    activeColor,
    activeFont,
    backBoard,
   } = useContext(RootContext)

  function placeToBasket() {
    addCustomNeonToBasktet({
      previewText,
      price: price.find(p => p.size === currentSize.size),
      currentSize,
      activeColor,
      activeFont,
      backBoard: backBoard.value,
    }).then(() => {
      const currentLanguage = getLanguage()
      if (currentLanguage === 'hu') {
        window.location = 'https://dekorklub.hu/kosar'
      } else {
        window.location = 'https://dekorklub.hu/cart/?lang=en'
      }
    })
  }

  const formatSum = sum => sum ? `${Number.parseInt(sum).toLocaleString()} Ft` : '0 Ft'

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