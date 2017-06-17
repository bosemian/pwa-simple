<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture spinner-center">
          <img class="img-post" v-if="catUrl" :src="this.catUrl" />
          <div v-else="catUrl"class="mdl-spinner mdl-js-spinner is-active"></div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A CAT
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { Cat } from '../api'
export default {
  data: () => ({
    catUrl: '',
    title: ''
  }),
  created () {
    Cat.get((url) => {
      this.catUrl = url
    })
  },
  methods: {
    postCat () {
      const catInfo = {
        'url': this.catUrl,
        'comment': this.title,
        'info': 'Posted by Charles on Tuesday',
        'created_at': -1 * new Date().getTime()
      }
      Cat.post(catInfo)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
<style scoped>
 .img-post {
   max-width: 100%;
 }
 .spinner-center {
   text-align: center
 }
</style>
