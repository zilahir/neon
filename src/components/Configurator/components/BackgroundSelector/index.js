import React from 'react'
import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";
import classnames from 'classnames'

import styles from './BackgroundSelector.module.scss'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

const BackgroundSelector = ({
	setCurrentImage,
	currentImage
}) => {	

	function useBackgrounds() {
		return useQuery("backgrounds", async () => {
			  const { backgrounds } = await request(
				  apiRoot,
				  gql`
					  query {
						  backgrounds {
							  id
							  background {
								  url
							  }
						  }
					  }
				  `
			  );
			  console.log(backgrounds)
			  setCurrentImage(backgrounds[0].background.url);
			  return backgrounds;
		  });
	  }
	const { status, data: backgrounds, error, isFetching } = useBackgrounds();
	return (
		 (Array.isArray(backgrounds) && backgrounds.length > 0) && (
			<div className={styles.backgroundSelectorRoot}>
				{
					backgrounds.map(({ id, background }) => (
						<img className={classnames(
							background.url === currentImage ? styles.active : '',
						)} onClick={() => setCurrentImage(background.url)} key={id} src={background.url} alt="background" />
					))
				}
			</div>
		 )
	)
}

export default BackgroundSelector