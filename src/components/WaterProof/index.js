import React, { useState, useContext } from 'react'
import Select from 'react-select'

import { getLanguage } from '../../utils/i18n'
import RootContext from '../../context/rootContext'
import { useEffect } from 'react'

const WATERPROOF_OPTIONS = [
  { value: 'indoor', label: 'Indoor (ingyenes)', price: 0 },
  { value: 'waterproof', label: 'Vízálló (+12000 Ft)', price: 12000 }
]

const WATERPROOF_OPTIONS_EN = [
  { value: 'indoor', label: 'Indoor (free)', price: 0 },
  { value: 'waterproof', label: 'Waterproof (+12000 Ft)', price: 12000 }
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

const WaterProof = () => {
  const options = {
    hu: WATERPROOF_OPTIONS,
    en: WATERPROOF_OPTIONS_EN
  }
  
  const { price, setPrice } = useContext(RootContext)
  const currentLanguage = getLanguage()
  const [selected, setSelected] = useState()

  useEffect(() => {
    setSelected(options[currentLanguage][0])
  }, [currentLanguage])

  function handleChange(chosen) {
    setSelected(chosen)
     if (chosen.value === 'indoor') {
      const newPrice = price.map(p => ({
        ...p,
        price: p.price - 12000,
      }))
      setPrice(newPrice)
     } else {
      const newPrice = price.map(p => ({
        ...p,
        price: p.price + chosen.price,
      }))
      setPrice(newPrice)
     }
  }
  return (
    <Select
        value={selected}
        //defaultValue={options[currentLanguage][0]}
        options={options[currentLanguage]}
        placeholder="Válassz..."
        onChange={selected => handleChange(selected)}
        isSearchable={false}
        styles={dropdownStyles}
      />
  )
}

export default WaterProof