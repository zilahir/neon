import axios from "axios";
import { getLanguage } from "../i18n";

const axiosInstance = axios.create()

export const addCustomNeonToBasktet = newNeon => new Promise((resolve, reject) => {
  {
    const data = new FormData();
    data.append('action', 'new_custom_neon_product');
    data.append('price', newNeon.price.price)
    data.append('size', newNeon.price.size)
    data.append('text', newNeon.previewText)
    data.append('color', newNeon.activeColor)
    data.append('font', newNeon.activeFont.name)
    data.append('fontType', newNeon.activeFont.fontType)
    data.append('backBoard', newNeon.backBoard)
    data.append('language', getLanguage())

    const ajaxUrl = window.ajaxUrl
    if (ajaxUrl) {
      axiosInstance.post(ajaxUrl, data).then(({ data }) => {
      }).then(() => {
        resolve(true)
      })
    } else {
      resolve(false)
    }
  }
})
