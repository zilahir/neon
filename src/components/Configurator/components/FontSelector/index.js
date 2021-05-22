import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";
import styled from 'styled-components'

import RootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

import styles from './FontSelector.module.scss'

const StyledButton = styled.button`
  font-family: ${props => `${props.family}`};
`


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

const FontSelector = () => {
  function useFonts() {
    return useQuery("fonts", async () => {
			const { fonts } = await request(
				apiRoot,
				gql`
          query {
            fonts {
              asset {
                id
                url
              }
              id
              name
              fontType
            }
          }
				`
			);
			return fonts;
		});
  }

  const { activeFont, setActiveFont, currentSize, setCurrentSize } = useContext(RootContext)
  const { status, data, error, isFetching } = useFonts();
  const { data: sizes } = useSizes();

  function handleActiveFont(selected) {
    console.debug('seelected', selected)
    setActiveFont(selected)

    if (selected.fontType === 'double' && ( currentSize.size !== 'l' || currentSize.size !== 'xl' )) {
      const lSize = sizes.find(({ size }) => size === 'l')
      setCurrentSize({
        size: lSize.size,
        price: lSize.price,
      })
    }
  }

  return (
    <div className={styles.fontSelectorContainer}>
      {
        data && data.length > 0 && data.map(({ id, name, fontType, asset }) => (
          <React.Fragment key={id}>
            <StyledButton
              onClick={() => handleActiveFont({name, fontType}) }
              className={classnames(
                styles.fontSelectorBtn,
                name === activeFont.name ? styles.active : '',
              )}
              type="button"
              family={name}

            >
              {name} <span>({fontType})</span>
            </StyledButton>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default FontSelector