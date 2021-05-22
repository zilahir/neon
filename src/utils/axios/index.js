import axios from "axios";

const axiosInstance = axios.create()

export const createNewCustomNeon = newNeon => {
  const ajaxUrl = window.ajaxUrl
  if (ajaxUrl) {
    axiosInstance.post(ajaxUrl, {
      ...newNeon
    }).then(({ data }) => {
      console.debug('result', data)
    })
  }

}
