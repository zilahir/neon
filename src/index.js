import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'

import App from './App'
import { queryClient } from './utils/graphql/apiEndpoints'
import 'font-awesome/css/font-awesome.min.css';

setTimeout(() => {
	ReactDOM.render(
		(
			<QueryClientProvider client={queryClient}>
				<App />
		</QueryClientProvider>
		), document.querySelector('#neon')
	)
}, 1500)