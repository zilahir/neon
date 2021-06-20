import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";

import rootContext from '../../../../context/rootContext'
import styles from './Sizes.module.scss'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

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
	const { currentSize, setCurrentSize, price: calculatedPrice, activeFont, previewText } = useContext(rootContext)
	const { status, data, error, isFetching } = useSizes();

	const filteredSizes = data && data.length > 0 && data.filter(({ size }) => activeFont.fontType === 'double' ? size !== 's' && size !== 'm' : size )

	const calculateLength = (size, length) => (
		size * length
	)

	const formatSum = sum => `${Number.parseInt(sum).toLocaleString()} Ft`

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
											previewText.length > 0 && `szélesség ${calculateLength(WIDTH[size], previewText.length)} cm`
										}
									</span>
									<span>
										{description}
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