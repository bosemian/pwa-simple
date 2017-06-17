<template>
   <div>
    <div v-if="picture" class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="picture">
          <img :src="picture.url" />
        </div>
        <div class="info">
          <span>{{ picture.info }}</span>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="comment">
          <span>{{ picture.comment }}</span>
        </div>
        <div class="actions">
          <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/post">
            ANSWER
          </router-link>
        </div>
      </div>
    </div>
    <div  class="spinner-center">
      <div v-if="loading" class="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
   </div>
</template>
<script>
import { Cat } from '../services'
export default {
  data: () => ({
    picture: null,
    loading: false
  }),

  subscriptions () {
    const id = this.$route.params.id
    this.loading = true
    Cat.get(id)
      .subscribe((res) => {
        this.picture = res
        this.loading = false
      })
  }
}
</script>
<style scoped>
  .picture > img {
    color: #fff;
    width:100%;
  }
  .info {
    text-align: right;
    padding: 5px;
    color: #555;
    font-size: 10px;
  }
  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
</style>
