import $firebase from './firebase'
import axios from 'axios'
import parse from 'xml-parser'

const API_URL = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'
// initial API server
const http = axios.create({
  baseURL: API_URL
})

// fetch img cat
const loadCat = (cb) => {
  http.get()
    .then((res) => {
      cb(parse(res.data).root.children['0'].children['0'].children['0'].children['0'].content)
    })
    .catch((err) => {
      return err
    })
}

const post = ({ url, comment }) => {
  return $firebase.post('cat', {
    url,
    comment,
    'info': 'Posted by SpeedBoy',
    'created_at': $firebase.timestamp()
  })
}

const list = () => {
  return $firebase.onArrayValue('cat').map((item) => item.reverse())
}

const get = (id) => {
  return $firebase.onValueId(`cat/${id}`)
}

export default {
  get,
  post,
  list,
  loadCat
}
