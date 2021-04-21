import { createContext } from 'react'

export default createContext({
	text: '',
	setText: () => {},
	activeColor: '#000000',
	setActiveColor: () => {},
})
