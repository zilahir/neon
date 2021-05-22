import React, { useContext } from 'react'

import { addCustomNeonToBasktet } from '../../utils/axios'
import RootContext from '../../context/rootContext'
import styles from './Price.module.scss'

const FinalPrice = () => {
  const {
    price,
    currentSize,
    text,
    activeColor,
    activeFont,
    backBoard,
   } = useContext(RootContext)

  function placeToBasket() {
    addCustomNeonToBasktet({
      text,
      price,
      currentSize,
      activeColor,
      activeFont,
      backBoard,
    })
  }
  return (
    <>
      <div className={styles.priceContainer}>
        <p>
          Végösszeg
        </p>
        <p>
          {
            `${price.find(p => p.size === currentSize.size).price} Ft`
          }
        </p>
      </div>
      <div className={styles.placeToBasketBtnContainer}>
        <button onClick={() => placeToBasket()} type="button">
          Kosárba teszem
        </button>
      </div>
    </>
  )
}

export default FinalPrice