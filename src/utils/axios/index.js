import axios from "axios";

const axiosInstance = axios.create()

export const addCustomNeonToBasktet = newNeon => {
  const data = new FormData();
  data.append('action', 'new_custom_neon_product');
  data.append('newNeon', JSON.stringify(newNeon))
  const params = new URLSearchParams(data);

  const ajaxUrl = window.ajaxUrl
  if (ajaxUrl) {
    axiosInstance.post(ajaxUrl, data).then(({ data }) => {
      console.debug('result', data)
    })
  }

}
