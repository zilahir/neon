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
	const { setActiveColor } = useContext(rootContext)
  const { status, data, error, isFetching } = useColors();
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
			setActiveColor(neoncolors[0].color.hex)
			return neoncolors;
		});
	}

  return (
		<div className={styles.colorContainer}>
			{
				data && data.map(({ name, color }) => (
					<button className={styles.colorSelectorBtn} type="button" key={name} onClick={() => setActiveColor(color.hex)}>
						<WbIncandescentIcon fontSize="large" htmlColor={color.hex} />
						<span>
							{name}
						</span>
					</button>
				))
			}
	</div>
  )
}

export default ColorSelector