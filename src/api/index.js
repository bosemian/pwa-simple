import axios from 'axios'
import parse from 'xml-parse'

const API_URL = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'

const http = axios.create({
  baseURL: API_URL
})

const get = (cb) => {
  http.get()
    .then((res) => {
      cb(parse(res.body).root.children['0'].children['0'].children['0'].children['0'].content)
    })
    .catch((err) => {
      return throw new err
    })
}

export default {
  get
}
