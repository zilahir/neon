import React, { useContext, useState } from 'react'
import Select from 'react-select'

import { t } from '../../utils/i18n'
import RootContext from '../../context/rootContext'
import styles from './BoardSelector.module.scss'

export const boardOptions = [
  { value: `${t('cut-to-text.valueText')} (${t('cut-to-text.extraPrice')})`, label: `${t('cut-to-text.valueText')} (${t('cut-to-text.extraPrice')})`, price: 0 },
  { value: `${t('rectangle.valueText')} (${t('rectangle.extraPrice')})`, label: `${t('rectangle.valueText')} (${t('rectangle.extraPrice')})`, price: 0 },
  { value: `${t('cut-to-shape.valueText')} (+${t('cut-to-shape.extraPrice')})`, label: `${t('cut-to-shape.valueText')} (+${t('cut-to-shape.extraPrice')} Ft)`, price: Number.parseInt(t('cut-to-shape.extraPrice'), 10) },
  { value: `${t('acrylic-stand.valueText')} (+${t('acrylic-stand.extraPrice')} Ft)`, label: `${t('acrylic-stand.valueText')} (+${t('acrylic-stand.extraPrice')} Ft)`, price: Number.parseInt(t('acrylic-stand.extraPrice'), 10) },
  { value: `${t('acrylic-box.valueText')} (+${t('acrylic-box.extraPrice')} Ft)`, label: `${t('acrylic-box.valueText')} (+${t('acrylic-box.extraPrice')} Ft)`, price: Number.parseInt(t('acrylic-box.extraPrice'), 10) },
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
  const [selectedBoard, setSelectedBoard] = useState(boardOptions[0])
  const [boardImage, setBoardImage] = useState(boardImages[0])

  function handleChange(chosen) {
    console.debug('chosen', chosen)
    setSelectedBoard(chosen)
    setBackBoard(chosen)
    setBoardImage(boardImages[boardOptions.findIndex(board => board === chosen)])
  }

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
          defaultValue={boardOptions[0]}
          options={boardOptions}
          placeholder="Válassz..."
          onChange={selected => handleChange(selected)}
          isSearchable={false}
        />
      </div>
    )
  )
}

export default BoardSelector