import axios from "axios";
import { getLanguage } from "../i18n";

const axiosInstance = axios.create()

const currencyApiIJnstance = axios.create({
  baseURL: 'https://freecurrencyapi.net/api/v2',   
})

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
    data.append('productImage', newNeon.productImage)

    console.log('newNeon', newNeon.productImage)

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

export function convertCurrency() {
  return new Promise((resolve, reject) => {
    currencyApiIJnstance.get('latest', {
      params: {
        apikey: '0781c160-63e0-11ec-8cfa-63b0029a2b93',
        base_currency: 'HUF'
      }
    }, {
    }).then((response) => {
      console.log('response', response);
      resolve({
        eur: response.data.data['EUR'],
      });
    }).catch((error) => {
      console.error('neon-error', error)
      reject({
        error: true,
      })
    })
  })
}