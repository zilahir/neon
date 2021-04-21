import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import rootContext from '../../context/rootContext'
import demoBg from '../../assets/temp/1.jpg'
import styles from './Preview.module.scss'

const Previewtext = styled.p`
  text-shadow: rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px, rgb(255, 144, 255) 0px 0px 20px, rgb(255, 144, 255) 0px 0px 30px, rgb(255, 144, 255) 0px 0px 40px, rgb(255, 144, 255) 0px 0px 55px, rgb(255, 144, 255) 0px 0px 75px;
  color: ${props => props.color};
`

const Preview = () => {
  const images = [demoBg]
  const [currentImage, setCurrentImage] = useState(images[0])
  const { previewText, activeColor } = useContext(rootContext)

  return (
    <div className={styles.previewModuleContainer}>
      <div className={styles.preview}>
        <Previewtext color={activeColor}>
          {previewText}
        </Previewtext>
        <img src={currentImage} alt="previewimage" />
      </div>
      <div className={styles.imageContainer}>
        {
          images.map((image, key) => (
            <img key={key} src={image} alt="image" />
          ))
        }
      </div>
    </div>
  )
}

export default Preview