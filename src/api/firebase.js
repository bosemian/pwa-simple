import firebase from 'firebase'
firebase

const post = (path, postCat) => {
  return firebase.database().ref(`${path}`).push(postCat)
}

export default {
  post
}
