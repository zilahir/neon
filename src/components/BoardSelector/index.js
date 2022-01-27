import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'

import { getLanguage } from '../../utils/i18n'
import RootContext from '../../context/rootContext'
import styles from './BoardSelector.module.scss'
import { currencySign } from '../../utils/i18n/currencies'

const boardImages = [
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-01.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-03.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-02.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-04.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-05.png'
]

export const boardOptions = [
  { value: 'Betű körül közvetlenül (+13.000 Ft)', label: 'Betű körül közvetlenul (+13.000 Ft)', price: 13000, index: 0, },
  { value: 'Téglalap alakú (ingyenes)', label: 'Téglalap alakú (ingyenes)', price: 0, index: 1, },
  { value: 'Felirat körül (ingyenes)', label: 'Felirat körül (ingyenes)', price: 0, index: 2 },
  { value: 'Álló kivitel (+15.000 Ft)', label: 'Álló kivitel (+15.000 Ft)', price: 15000, index: 3, },
  { value: 'Plexi box (+25.000 Ft)', label: 'Plexi box (+25.000 Ft)', price: 25000, index: 4 },
]

const dropdownStyles = {
  valueContainer: provided => ({
    ...provided,
    height: 60,
  }),
  control: provided => ({
    ...provided,
    borderRadius: 15,
    border: '2px solid #C277F2',
  })
}

const BoardSelector = () => {
  const { currency, setBackBoard } = useContext(RootContext)
  const currentLanguage = getLanguage()
  const currencyKey = Object.keys(currency)[0]

  function formatSum(sum, sign = true) {
		let formattedSum
		if (currentLanguage === 'hu') {
			if (sign) {
        formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toLocaleString()} ${currencySign[currencyKey]}`
      } else {
        formattedSum = Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey])
      }
		} else if (currentLanguage === 'en') {
			if (sign) {
        formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toFixed()} ${currencySign[currencyKey]}`
      } else {
        formattedSum = Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey])
      }
		}

		return formattedSum
	}

  const boardOptionsEn = [
    { value: `Cut to text (+${formatSum(13000)})`, label: `Cut to text (+${formatSum(13000)})`, price: 13000, index: 0 },
    { value: 'Rectangle (free)', label: 'Rectangle (free)', price: 0, index: 1 },
    { value: `Cut to shape (free)`, label: `Cut to shape (free)`, price: 0, index: 2, },
    { value: `Acrylic stand (+${formatSum(15000)})`, label: `Acrylic stand (+${formatSum(15000)})`, price: 15000, index: 3, },
    { value: `Acrylic box (+${formatSum(25000)})`, label: `Acrylic box (+${formatSum(25000)})`, price: 25000, index: 4 },
  ]

  const BOARD_OPTIONS = {
    en: boardOptionsEn,
    hu: boardOptions
  }

  const [selectedBoard, setSelectedBoard] = useState(BOARD_OPTIONS[currentLanguage][0])
  const [boardImage, setBoardImage] = useState(boardImages[0])

  function handleChange(chosen) {
    setSelectedBoard(chosen)
    setBackBoard(chosen)
    setBoardImage(boardImages[boardOptions.findIndex(board => board.index === chosen.index)])
  }

  useEffect(() => {
    setSelectedBoard(BOARD_OPTIONS[currentLanguage][0])
  }, [currentLanguage])

  return (
    (
      <div className={styles.boardSelectorContainer}>
        <div className={styles.imageContainer}>
          {
            <img alt="board-preview" src={boardImage} />
          }
        </div>
        <Select
          styles={dropdownStyles}
          value={selectedBoard}
          options={BOARD_OPTIONS[currentLanguage]}
          placeholder="Válassz..."
          onChange={selected => handleChange(selected)}
          isSearchable={false}
        />
      </div>
    )
  )
}

export default BoardSelector