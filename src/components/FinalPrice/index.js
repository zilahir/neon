import React, { useContext } from 'react'

import RootContext from '../../context/rootContext'
import styles from './Price.module.scss'

const FinalPrice = () => {
  const { price, currentSize } = useContext(RootContext)
  return (
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
  )
}

export default FinalPrice