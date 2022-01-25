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
import styled from 'styled-components';
import hex2rgba from 'hex-to-rgba';

import rootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints'
import { t } from '../../../../utils/i18n'

import styles from './ColorSelector.module.scss'

const generateColor = (color) => `
rgb(255 255 255) 0px 0px 2px,
rgb(255 255 255) 0px 0px 4px,
${color} 0px 0px 8px,
${color} 0px 0px 12px, 
${color} 0px 0px 16px,
${color} 0px 0px 22px,
${color} 0px 0px 30px;
`

const StyledButton = styled.button`
	color: ${props => props.bgColor};
	text-shadow: ${props => props.isActive && generateColor(hex2rgba(props.bgColor, 1))};
	&:hover {
		text-shadow: ${props => generateColor(hex2rgba(props.bgColor, 0.5))};
	}
`

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
			<div onClick={() => toggleOpen(curr => !curr)} className={styles.header}>
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
						<StyledButton
							bgColor={color.hex}
							className={classnames(styles.colorSelectorBtn, 'fa fa-lightbulb-o')}
							type="button"
							key={name}
							onClick={() => setActiveColor(color.hex)}
							isActive={color.hex === activeColor}
							activeColor={hex2rgba(color.hex, 0.6)}
						>
							<span>
								{name}
							</span>
						</StyledButton>
					))
				}
			</div>
	</div>
  )
}

export default ColorSelector