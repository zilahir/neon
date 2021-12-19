import React, { useState, useContext } from 'react'
import Select from 'react-select'

import { t } from '../../utils/i18n'
import RootContext from '../../context/rootContext'

const WATERPROOF_OPTIONS = [
  { value: t('waterproof.indoor.valueText'), label: `${t('waterproof.indoor.labelText')} (${t('waterproof.indoor.extraPrice')})`, price: 0 },
  { value: t('waterproof.waterproof.valueText'), label: `${t('waterproof.waterproof.labelText')} (+${t('waterproof.waterproof.extraPrice')})`, price: `${Number.parseInt(t('waterproof.waterproof.extraPrice'))} Ft` }
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
  const { price, setPrice } = useContext(RootContext)
  const [selected, setSelected] = useState(WATERPROOF_OPTIONS[0])

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
        defaultValue={WATERPROOF_OPTIONS[0]}
        options={WATERPROOF_OPTIONS}
        placeholder="Válassz..."
        onChange={selected => handleChange(selected)}
        isSearchable={false}
        styles={dropdownStyles}
      />
  )
}

export default WaterProof