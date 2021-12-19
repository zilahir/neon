import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'

import { getLanguage } from '../../utils/i18n'
import RootContext from '../../context/rootContext'
import styles from './BoardSelector.module.scss'

export const boardOptions = [
  { value: 'Betű körül (ingyenes)', label: 'Betű körül (ingyenes)', price: 0 },
  { value: 'Téglalap alakú (ingyenes)', label: 'Téglalap alakú (ingyenes)', price: 0 },
  { value: 'Felirat körül közvetlenül (+13.000 Ft)', label: 'Felirat körül közvetlenül (+13.000 Ft)', price: 13000 },
  { value: 'Álló kivitel (+15.000 Ft)', label: 'Álló kivitel (+15.000 Ft)', price: 15000 },
  { value: 'Plexi box (+25.000 Ft)', label: 'Plexi box (+25.000 Ft)', price: 25000 },
]

const boardOptionsEn = [
  { value: 'Cut to text (free)', label: 'Cut to text (free)', price: 0 },
  { value: 'Rectangle (free)', label: 'Rectangle (free)', price: 0 },
  { value: 'Cut to shape (+13.000 Ft)', label: 'Cut to shape (+13.000 Ft)', price: 13000 },
  { value: 'Acrylic stand (+15.000 Ft)', label: 'Acrylic stand (+15.000 Ft)', price: 15000 },
  { value: 'Acrylic box (+25.000 Ft)', label: 'Acrylic box (+25.000 Ft)', price: 25000 },
]

const boardImages = [
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-01.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-03.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-02.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-04.png',
  'https://dekorklub.hu/wp-content/uploads/2021/05/hello-board-05.png'
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
  const { price, setPrice, setBackBoard } = useContext(RootContext)
  const currentLanguage = getLanguage()
  const BOARD_OPTIONS = {
    en: boardOptionsEn,
    hu: boardOptions
  }

  const [selectedBoard, setSelectedBoard] = useState(BOARD_OPTIONS[currentLanguage][0])
  const [boardImage, setBoardImage] = useState(boardImages[0])

  function handleChange(chosen) {
    setSelectedBoard(chosen)
    setBackBoard(chosen)
    setBoardImage(boardImages[boardOptions.findIndex(board => board === chosen)])
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