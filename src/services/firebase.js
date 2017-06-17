import firebase from 'firebase'
import { Observable } from 'rxjs'

const post = (path, postCat) => {
  return firebase.database().ref(`${path}`).push(postCat)
}

const onArrayValue = () => {
  return Observable.create((obs) => {
    const ref = firebase.database().ref('cat')
    const fn = ref.on('value', (snapshots) => {
      const result = []
      snapshots.forEach((snap) => {
        const item = snap.val()
        item.id = snap.key
        result.push(item)
      })
      obs.next(result)
    }, (err) => {
      obs.error(err)
    })
    return () => { ref.off('value', fn) }
  })
}

const onValueId = (id) => {
  return Observable.create((obs) => {
    const ref = firebase.database().ref(`cat/${id}`)
    const fn = ref.on('value', (snapshot) => {
      obs.next(snapshot.val())
    }, (err) => {
      obs.error(err)
    })
    return () => { ref.off('value', fn) }
  })
}

export default {
  post,
  onArrayValue,
  onValueId
}
