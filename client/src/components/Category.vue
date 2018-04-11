<template>
  <Cards :products="products" />
</template>

<script>
import Cards from './Cards'
import Api from '../../config/Api'

export default {
  props: ['category'],
  data () {
    return {
      products: []
    }
  },
  components: {
    Cards
  },
  created () {
    console.log(`PropCat = ${this.category}`)
    this.categoryFromURL()
    this.fetch()
  },
  watch: {
    '$route' (to, from) {
      if (from.params.category !== to.params.category) {
        this.fetch()
      }
    }
  },
  methods: {
    fetch () {
      console.log(`the category is: ${this.categoryFromURL()}`)
      Api().get(`/categories/${this.categoryFromURL()}`)
        .then(response => {
          this.products = response.data
        })
    },
    categoryFromURL () {
      const url = window.location.href
      const querry = 'category/'
      const category = url.slice(url.indexOf(querry) + querry.length).trim()
      return category
    }
  }
}
</script>

<style>

</style>
