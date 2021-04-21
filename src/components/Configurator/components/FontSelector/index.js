import React, { useContext } from 'react'

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

  console.debug('data', data)
  
  return (
    <div className={styles.fontSelectorContainer}>
      {
        data && data.map(({ id, name, fontType, asset }) => (
          <button key={id} className={styles.fontSelectorBtn} type="button">
            {name}
          </button>
        ))
      }
    </div>
  )
}

export default FontSelector