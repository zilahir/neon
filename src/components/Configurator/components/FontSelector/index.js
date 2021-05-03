import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";

import RootContext from '../../../../context/rootContext'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

import styles from './FontSelector.module.scss'

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

  const { activeFont, setActiveFont } = useContext(RootContext)
  const { status, data, error, isFetching } = useFonts();
  
  return (
    <div className={styles.fontSelectorContainer}>
      {
        data && data.length > 0 && data.map(({ id, name, fontType, asset }) => (
          <React.Fragment key={id}>
            <button
              onClick={() => setActiveFont({
                name,
                fontType
              })}
              className={classnames(
                styles.fontSelectorBtn,
                name === activeFont.name ? styles.active : '',
              )}
              type="button"
            >
              {name} <span>({fontType})</span>
            </button>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default FontSelector