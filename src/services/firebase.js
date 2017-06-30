import firebase from 'firebase'
import { Observable } from 'rxjs'
import _ from 'lodash'

const refPath = (path) => firebase.database().ref(path)

const push = (path, postCat) => {
  return Observable.fromPromise(firebase.database().ref(`${path}`).push(postCat))
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

const timestamp = () => {
  return firebase.database.ServerValue.TIMESTAMP
}

const onceValue = (ref) => {
  ref = _.isString(ref) ? refPath(ref) : ref
  return Observable.fromPromise(ref.once('value'))
    .map((snapshots) => snapshots.val())
}

export default {
  push,
  onArrayValue,
  onceValue,
  timestamp
}
