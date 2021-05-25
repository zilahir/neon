import React from 'react'

import styles from './MarketingText.module.scss'

const MarketingText = ({
  text
}) => (
  <div className={styles.container}>
    <p>
      {text}
    </p>
  </div>
)

export default MarketingText