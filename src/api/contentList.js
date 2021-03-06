import axios from 'axios'

const module = '/data/index/contentList/textContent'

export function addContentApi(params) {
  return axios.post(module, params, {
    encode: true
  });
}
export function getContentListApi(params) {
  return axios.get(module, {
    params
  }).then((res) => res.data);
}
export function getItemByIdApi(params) {
  return axios.get(`${module}/${params._id}`).then((res) => res.data);
}
export function deleteListItemByIdApi({
  _id,
  _csrf
}) {
  return axios.delete(`${module}/${_id}`, {
    params: {
      _csrf
    }
  });
}
export function updateListItemByIdApi(params) {
  return axios.put(`${module}/${params._id}`, {
    _csrf : params._csrf,
    ...params,
  }, {
    encode: true
  }).then((res) => res.data);
}