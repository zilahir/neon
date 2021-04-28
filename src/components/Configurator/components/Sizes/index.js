import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";

import rootContext from '../../../../context/rootContext'
import styles from './Sizes.module.scss'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

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
	const { currentSize, setCurrentSize, price: calculatedPrice } = useContext(rootContext)
	const { status, data, error, isFetching } = useSizes();
	return (
		<div className={styles.sizesContainer}>
			{
				data && data.map(({ size, price, description }) => (
					<div
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
										calculatedPrice.find(price => price.size === size).price
									}
								</p>
								<p className={styles.desc}>
									{description}
								</p>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default Sizes