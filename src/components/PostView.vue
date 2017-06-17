<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture spinner-center">
          <img class="img-post" v-if="catInfo.catUrl" :src="catInfo.catUrl" />
          <div v-if="loading" class="mdl-spinner mdl-js-spinner is-active"></div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="catInfo.title" type="text" class="mdl-textfield__input"/>
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
import { Cat } from '../services'
export default {
  data: () => ({
    catInfo: {
      catUrl: '',
      title: ''
    },
    loading: false
  }),

  subscriptions () {
    this.loading = true
    Cat.loadCat((url) => {
      this.loading = false
      this.catInfo.catUrl = url
    })
  },

  methods: {
    postCat () {
      Cat.post(this.catInfo)
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
</style>
