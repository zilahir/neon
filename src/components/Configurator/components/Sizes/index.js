import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";

import rootContext from '../../../../context/rootContext'
import styles from './Sizes.module.scss'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';
import { t, getLanguage } from '../../../../utils/i18n'
import { currencySign } from '../../../../utils/i18n/currencies'
const WIDTH = {
	s: 9,
	m: 11,
	l: 14,
	xl: 17
}

function useSizes() {
	return useQuery("sizes", async () => {
		const { sizes } = await request(
			apiRoot,
			gql`
				query {
					sizes {
						size
						price
						description
					}
				}
			`
		);
		return sizes;
	});
}

const Sizes = () => {
	const { currentSize, setCurrentSize, price: calculatedPrice, activeFont, previewText, currency } = useContext(rootContext)
	const { status, data, error, isFetching } = useSizes();

	const filteredSizes = data && data.length > 0 && data.filter(({ size }) => activeFont.fontType === 'double' ? size !== 's' && size !== 'm' : size )

	const calculateLength = (size, length) => (
		size * length
	)

	const currencyKey = Object.keys(currency)[0]

	const currentLanguage = getLanguage()

	function formatSum(sum) {
		let formattedSum
		if (currentLanguage === 'hu') {
			formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toLocaleString()} ${currencySign[currencyKey]}`
		} else if (currentLanguage === 'en') {
			formattedSum = `${Number.parseFloat(Number.parseInt(sum, 10) * currency[currencyKey]).toFixed()} ${currencySign[currencyKey]}`
		}

		return formattedSum
	}

	const localizedText = (description) => description.replace('magasság', `${t('meta.height')}`)

	return (
		<div className={styles.sizesContainer}>
			{
				data && filteredSizes.map(({ size, price, description }) => (
					<div
						key={size}
						role="button"
						onClick={() => setCurrentSize({
							size,
							price,
						})}
						className={classnames(
							styles.sizeBtn,
							currentSize.size === size ? styles.active : '',
						)}
					>
						<div>
							<p>{size}</p>
						</div>
						<div>
								<p className={styles.price}>
									{
										formatSum(calculatedPrice.find(price => price.size === size) ? calculatedPrice.find(price => price.size === size).price : 0)
									}
								</p>
								<p className={styles.desc}>
									<span>
										{
											previewText.length > 0 && `${t('meta.width')}: ${calculateLength(WIDTH[size], previewText.length)} cm`
										}
									</span>
									<span>
										{localizedText(description)}
									</span>
								</p>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default Sizes