import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

import rootContext from '../../context/rootContext'
import demoBg from '../../assets/temp/1.jpg'
import styles from './Preview.module.scss'

const Previewtext = styled.p`
  text-shadow: ${props => props.textShadow};
  font-family: ${props => props.fontFamily};
`

const Preview = () => {
  const images = [demoBg]
  const [currentImage, setCurrentImage] = useState(images[0])
  const [isOn, toggleOn] = useState(true)
  const { previewText, activeColor, activeFont } = useContext(rootContext)

  const createTextShadow = color => (
    `rgb(255, 255, 255) 0px 0px 5px,
    ${color} 0px 0px 10px,
    ${color} 0px 0px 20px,
    ${color} 0px 0px 30px,
    ${color} 0px 0px 40px,
    ${color} 0px 0px 55px,
    ${color} 0px 0px 75px;`
  )

  return (
    <div className={styles.previewModuleContainer}>
      <div className={styles.preview}>
        <div className={styles.toggleContainer}>
          <Toggle
            defaultChecked={isOn}
            onChange={() => toggleOn(isOn => !isOn)}
            icons={{
              checked: (
                <label className={styles.toggleBn}>ON</label>
              ),
              unchecked: (
                <label
                  className={classnames(
                    styles.toggleBn,
                    styles.off,
                  )}>
                    OFF
                </label>
              )
            }}
          />
        </div>
        <Previewtext
          textShadow={isOn ? createTextShadow(activeColor) : false}
          fontFamily={activeFont}
        >
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