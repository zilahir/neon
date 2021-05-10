import React, { useContext, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import RootContext from '../../context/rootContext'
import styles from './Dimmer.module.scss'

const Dimmer = () => {
	const [checked, setChecked] = useState(false)
	const { price, setPrice } = useContext(RootContext)

	function handleChange(event) {
		if (event.target.checked) {
			const newPrice = price.map(p => ({
        ...p,
        price: p.price + 8000,
      }))
			setPrice(newPrice)
		} else {
			const newPrice = price.map(p => ({
        ...p,
        price: p.price - 8000,
      }))
			setPrice(newPrice)
		}
		setChecked(event.target.checked)
	}
	return (
		<div className={styles.dimmerContainer}>
			<p>
				Dimmer és remote control + 8000 Ft
			</p>
			<Checkbox
        checked={checked}
        onChange={event => handleChange(event)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
		</div>
	)
}

export default Dimmer