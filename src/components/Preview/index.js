import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Toggle from 'react-toggle'
import html2canvas from 'html2canvas';

import rootContext from '../../context/rootContext'
import styles from './Preview.module.scss'
import BackgroundSelector from '../Configurator/components/BackgroundSelector'
import "react-toggle/style.css"

const Previewtext = styled.p`
  text-shadow: ${props => props.textShadow};
  font-family: ${props => props.fontFamily};
`

const Preview = () => {
  const [currentImage, setCurrentImage] = useState(false)
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

  const ELEMENT_BLACKLIST = ['test-image', 'shadow-toggle', 'image-selector']

  function  generateImage() {
    const previewContainer = document.querySelector('#neon-preview')
    html2canvas(previewContainer, {
      logging: true,
      useCORS: true,
      ignoreElements: element => {
        if (ELEMENT_BLACKLIST.some(blacklist => blacklist === element.id)) {
          return true
        }
      }
    }).then(function(canvas) {
      document.body.appendChild(canvas);
      const base64Image = canvas.toDataURL("image/jpeg");
      // console.log(base64Image)
  });
  }

  return (
    <div
      className={styles.previewModuleContainer}
      id="neon-preview"
    >
      <div className={styles.preview}>
        <div className={styles.toggleContainer}>
          <button id="test-image" onClick={() => generateImage()} type="button">
            test image
          </button>
          <div id="shadow-toggle">
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
        </div>
        <Previewtext
          textShadow={isOn ? createTextShadow(activeColor) : false}
          fontFamily={activeFont.name}
        >
          {previewText}
        </Previewtext>
        <img src={currentImage} alt="previewimage" />
      </div>
      <div id="image-selector" className={styles.imageContainer}>
          <BackgroundSelector currentImage={currentImage} setCurrentImage={setCurrentImage} />
      </div>
    </div>
  )
}

export default Preview