import axios from 'axios'

const module = '/api/v1/contentList/'
// const module = 'http://13.229.242.5:7001/api/v1/pageList/'

export function addContentApi(params) {
  return axios.post(`${module}addContent`, params, { encode: true });
}
export function getContentListApi(params) {
  return axios.get(`${module}getContentList`, { params }).then((res) => res.data);
}
export function getItemByIdApi(params) {
  return axios.get(`${module}getItemById`, { params }).then((res) => res.data);
}
export function deleteListItemByIdApi(params) {
  return axios.post(`${module}deleteListItemById`, params, { encode: true });
}

export const captchaUrl = `${module}captcha`