import React, { useState } from 'react'
import Select from 'react-select'

import styles from './BoardSelector.module.scss'
import board1 from '../../assets/board/hello board-01.png'
import board2 from '../../assets/board/hello board-02.png'
import board3 from '../../assets/board/hello board-03.png'
import board4 from '../../assets/board/hello board-04.png'

const boardOptions = [
  { value: 'Betű körül (ingyenes)', label: 'Betű körül (ingyenes)' },
  { value: 'Téglalap alakú (ingyenes)', label: 'Téglalap alakú (ingyenes)' },
  { value: 'Felirat körül közvetlenül (+13.000 Ft)', label: 'Felirat körül közvetlenül (+13.000 Ft)' },
  { value: 'Álló kivitel (+15.000 Ft)', label: 'Álló kivitel (+15.000 Ft)' },
  { value: 'Plexi box (+25.000 Ft)', label: 'Plexi box (+25.000 Ft)' },
]

const boardImages = [board1, board2, board3, board4]

const BoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(boardOptions[0])
  return (
    (
      <div className={styles.boardSelectorContainer}>
        <div className={styles.imageContainer}>
          {
            <img alt="board-preview" src={boardImages[boardOptions.findIndex(option => option === selectedBoard)]} />
          }
        </div>
        <Select
          defaultValue={boardOptions[0]}
          options={boardOptions}
          placeholder="Válassz..."
          onChange={selected => setSelectedBoard(selected)}
        />
      </div>
    )
  )
}

export default BoardSelector