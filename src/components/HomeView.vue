<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone spinner-center">
        <div v-if="pictures" v-for="picture in pictures" class="image-card" @click="displayDetails(picture.id)">
          <div class="image-card__picture">
            <img v-if="pictures" :src="picture.url" />
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ picture.comment }}</span>
          </div>
        </div>
        <div v-if="loading" class="mdl-spinner mdl-js-spinner is-active"></div>
      </div>
    </div>
    <router-link class="add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/post">
      <i class="material-icons">add</i>
    </router-link>
  </div>
</template>
<script>
import { Cat } from '../services'
export default {

  data: () => ({
    pictures: null,
    loading: false
  }),

  subscriptions () {
    this.loading = true
    Cat.list()
      .subscribe((res) => {
        this.pictures = res
        this.loading = false
      })
  },

  methods: {
    displayDetails (id) {
      this.$router.push(`detail/${id}`)
    }
  }
}
</script>
<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>
