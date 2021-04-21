import React from 'react'
import { createGlobalStyle } from 'styled-components';
import {
  useQuery,
  useQueryClient,
} from "react-query";
import { request, gql } from "graphql-request";

import { apiRoot } from '../../../../../utils/graphql/apiEndpoints';

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

const CustomFontsProvider = ({
	children
}) => {
	const { status, data, error, isFetching } = useFonts();
	const fontList = data ? data.map(({ name, asset }) => (`
		@font-face {
			font-family: "${name}";
			src: url("${asset.url}");
		}
	`)).join(' ') : ''

	const GlobalStyle = createGlobalStyle`
		${fontList}
	`

	return (
		<React.Fragment>
			<GlobalStyle />
			{children}
		</React.Fragment>
	)
}

export default CustomFontsProvider

