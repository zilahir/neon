import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import styles from './ColorSelector.module.scss'
import rootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints'

const ColorSelector = () => {	
	const { setActiveColor } = useContext(rootContext);
	const [isOpen, toggleOpen] = useState(false);
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
		<div className={classnames(
			styles.colorContainer,
			!isOpen ? styles.closed : styles.open,
		)}>
			<div onClick={() => toggleOpen(curr => !curr)} className={styles.header}>
				<p>
					Szín
				</p>
				<div>
          {
            isOpen ? <ExpandLessIcon htmlColor="#000000" /> : <ExpandMoreIcon htmlColor="#000000" />
          }
        </div>
			</div>
			<div className={classnames(
				styles.colorInnerContainer,
				isOpen ? styles.open : styles.hidden
			)}>
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
	</div>
  )
}

export default ColorSelector