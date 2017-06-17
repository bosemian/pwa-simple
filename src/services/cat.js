import $firebase from './firebase'
import axios from 'axios'
import parse from 'xml-parser'

const API_URL = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'

const http = axios.create({
  baseURL: API_URL
})

const loadCat = (cb) => {
  http.get()
    .then((res) => {
      cb(parse(res.data).root.children['0'].children['0'].children['0'].children['0'].content)
    })
    .catch((err) => {
      return err
    })
}

const post = (catInfo) => {
  return $firebase.post('cat', catInfo)
}

const list = () => {
  return $firebase.onArrayValue()
}

const get = (id) => {
  return $firebase.onValueId(id)
}

export default {
  get,
  post,
  list,
  loadCat
}
