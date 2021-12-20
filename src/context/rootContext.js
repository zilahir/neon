import { createContext } from 'react'

export default createContext({
	previewText: '',
	setPreviewText: () => {},
	activeColor: '#000000',
	setActiveColor: () => {},
	activeFont: '',
	setActiveFont: () => {},
	currentSize: 'sm',
	setCurrentSize: () => {},
	price: 0,
	setPrice: () => {},
	backBoard: 0,
	setBackBoard: () => {},
	base64Image: undefined,
	setBase64Image: () => {}
})
