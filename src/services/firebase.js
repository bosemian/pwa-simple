import firebase from 'firebase'
import { Observable } from 'rxjs'
import _ from 'lodash'

const refPath = (path) => firebase.database().ref(path)

const post = (path, postCat) => {
  return firebase.database().ref(`${path}`).push(postCat)
}

const onArrayValue = (ref) => {
  return Observable.create((obs) => {
    ref = _.isString(ref) ? refPath(ref) : ref
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

const onValueId = (ref) => {
  return Observable.create((obs) => {
    ref = _.isString(ref) ? refPath(ref) : ref
    const fn = ref.on('value', (snapshot) => {
      obs.next(snapshot.val())
    }, (err) => {
      obs.error(err)
    })
    return () => { ref.off('value', fn) }
  })
}

const timestamp = () => {
  return firebase.database.ServerValue.TIMESTAMP
}

export default {
  post,
  onArrayValue,
  onValueId,
  timestamp
}
