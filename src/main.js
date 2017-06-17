import Vue from 'vue'

import '!script-loader!material-design-lite/material.min.js'
import '!style-loader!css-loader!material-design-lite/material.min.css'

import firebase from 'firebase'
import App from './App'
import router from './router'

// Initialize Firebase
firebase.initializeApp(process.env.FIREBASE)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
