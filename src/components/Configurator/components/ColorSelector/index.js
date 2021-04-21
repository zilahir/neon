import React, { useContext } from 'react'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'

import styles from './ColorSelector.module.scss'
import rootContext from '../../../../context/rootContext'

const colors = [
  '#ff90ff',
  '#a5492a'
]

const ColorSelector = () => {
	const { setActiveColor } = useContext(rootContext)
  return (
    <div className={styles.colorContainer}>
		{
			colors.map(color => (
			<span key={color} onClick={() => setActiveColor(color)}>
				<WbIncandescentIcon fontSize="large" htmlColor={color} />
			</span>
			))
		}
   </div>
  )
}

export default ColorSelector