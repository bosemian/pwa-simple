<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone spinner-center">
        <div v-if="pictures" v-for="picture in pictures" class="image-card" @click="displayDetails(picture.id)">
          <div class="image-card__picture">
            <img v-if="pictures" :src="picture.catUrl" >
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ picture.title }}</span>
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
    loading: false,
    cat: null
  }),

  subscriptions () {
    this.loading = true
    if (navigator.onLine) {
      this.cat = Cat.list()
        .subscribe((res) => {
          this.pictures = res
          this.saveCatsToCache()
          this.loading = false
        })
      return
    } else {
      this.loading = false
      this.pictures = JSON.parse(localStorage.getItem('cats'))
      return
    }
  },
  methods: {
    displayDetails (id) {
      this.$router.push(`detail/${id}`)
    },
    getCats () {
      if (navigator.onLine) {
        this.saveCatsToCache()
        return
      } else {
        return JSON.parse(localStorage.getItem('cats'))
      }
    },
    saveCatsToCache () {
      localStorage.setItem('cats', JSON.stringify(this.pictures))
    }
  },
  beforeDestroy () {
    this.cat.unsubscribe()
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
