import React, { useContext } from 'react'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";

import styles from './ColorSelector.module.scss'
import rootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints'

const colors = [
  '#ff90ff',
  '#a5492a'
]

const ColorSelector = () => {
	function useColors() {
		return useQuery("colors", async () => {
			const { neoncolors } = await request(
				apiRoot,
				gql`
					query {
						neoncolors {
							name,
							color {hex}
						}
					}
				`
			);
			return neoncolors;
		});
	}
	
	const { setActiveColor } = useContext(rootContext)
  const { status, data, error, isFetching } = useColors();

  return (
		<div className={styles.colorContainer}>
			{
				data && data.map(({ name, color }) => (
					<span key={name} onClick={() => setActiveColor(color.hex)}>
						<WbIncandescentIcon fontSize="large" htmlColor={color.hex} />
					</span>
				))
			}
	</div>
  )
}

export default ColorSelector