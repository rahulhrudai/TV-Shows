<template>
  <div>
    <div v-if="loading && error == null" class="text-center">
      <div class="spinner-border"></div>
      <h3 class="text-dark pt-4">Loading</h3>
    </div>
    <div v-else-if="error != null">
      <ErrorPage :error="error" />
    </div>
    <div class="container" v-else>
      <div v-for="genre in getGenresList()" :key="genre">
        <h3 class="m-3">{{ genre }}</h3>
        <div class="px-3">
          <vue-horizontal>
            <template v-if="genre === 'Popular Shows'">
              <section v-for="show in popularShows" :key="show.id">
                <Card :show="show" />
              </section>
            </template>
            <section
              v-else
              v-for="show in getShowsByGenere(genre)"
              :key="show.id">
              <Card :show="show" />
            </section>
          </vue-horizontal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllShows } from '../Services/ApiCalls'
import VueHorizontal from 'vue-horizontal'
import ErrorPage from '../Components/ErrorPage'
import Card from '../Components/Card'
export default {
  name: 'HomePage',
  components: {
    VueHorizontal,
    ErrorPage,
    Card
  },
  data () {
    return {
      shows: [],
      popularShows: [],
      error: null,
      loading: true
    }
  },
  created () {
    getAllShows()
      .then((response) => {
        this.shows = response.data
        this.popularShows = this.sortByRating()
      })
      .catch((error) => {
        this.error = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    getShowsByGenere (genre) {
      return this.shows.filter((show) => show.genres.includes(genre))
    },
    sortByRating () {
      return this.shows.sort(function (a, b) {
        return b.rating.average - a.rating.average
      })
    },
    getGenresList () {
      const list = new Set()
      list.add('Popular Shows')
      for (const show of this.shows) {
        for (const genre of show.genres) {
          list.add(genre)
        }
      }
      return list
    }
  }
}
</script>
<style scoped>
section {
  padding: 16px 24px;
}
.spinner-border {
  width: 65px;
  height: 65px;
  margin-top: 120px;
}
.star-icon {
  color: rgb(255, 251, 1);
}
</style>
