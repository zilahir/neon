import React from 'react'
import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";

import styes from './BackgroundSelector.module.scss'
import { apiRoot } from '../../../../utils/graphql/apiEndpoints';

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
		return backgrounds;
	});
}

const BackgroundSelector = ({
	setCurrentImage
}) => {	
	const { status, data: backgrounds, error, isFetching } = useBackgrounds();
	console.debug('hello', backgrounds)
	return (
		 (Array.isArray(backgrounds) && backgrounds.length > 0) && (
			<div className={styes.backgroundSelectorRoot}>
				{
					backgrounds.map(({ id, background }) => (
						<img onClick={() => setCurrentImage(background.url)} key={id} src={background.url} alt="background" />
					))
				}
			</div>
		 )
	)
}

export default BackgroundSelector