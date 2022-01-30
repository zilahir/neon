import React, { useContext, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import RootContext from '../../context/rootContext'
import styles from './Dimmer.module.scss'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { currencySign } from '../../utils/i18n/currencies'
import { getLanguage, t } from '../../utils/i18n';

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
	const { price, setPrice, currency } = useContext(RootContext)

	const currencyKey = Object.keys(currency)[0]
	const currentLanguage = getLanguage()

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
					label={`${t('meta.dimmer-and-remote')} + ${formatSum(8000)}`}
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