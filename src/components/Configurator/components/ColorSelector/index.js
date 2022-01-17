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

import rootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints'
import { t } from '../../../../utils/i18n'

import styles from './ColorSelector.module.scss'

const ColorSelector = ({
	isOpen,
	toggleOpen
}) => {	
	const { setActiveColor, activeColor } = useContext(rootContext);
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
					{t('color.color')}
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
						<button className={classnames(styles.colorSelectorBtn, color.hex === activeColor && styles.selected)} type="button" key={name} onClick={() => setActiveColor(color.hex)}>
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