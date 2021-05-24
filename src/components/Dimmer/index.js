import React, { useContext, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import RootContext from '../../context/rootContext'
import styles from './Dimmer.module.scss'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const muiTheme = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      root: {
        color: '#000',
      }
    },
    MuiCheckbox: {
      colorPrimary: {
        color: '#000',
        '&.Mui-checked': {
          color: '#4BC3C8',
        }
      },
      checked: {
        color: '#4BC3C8',
      }
    }
  }
})

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
			<MuiThemeProvider theme={muiTheme}>
				<FormControlLabel
					label="Dimmer és remote control + 8000 Ft"
					control={(
						<Checkbox
							checked={checked}
							onChange={event => handleChange(event)}
							inputProps={{ 'aria-label': 'primary checkbox' }}
							color="primary"
						/>
					)}
				/>
			</MuiThemeProvider>
		</div>
	)
}

export default Dimmer