<template>
  <div>
    <h3 class="text-center mt-4">Result For {{ showName }} :</h3>
    <div v-if="loading && error == null" class="text-center">
      <div class="spinner-border"></div>
      <h3 class="text-dark pt-4">Loading</h3>
    </div>
    <div v-else-if="error != null">
      <ErrorPage :error="error" />
    </div>
    <div v-else-if="shows.length != 0">
      <div class="row">
        <div
        class="gallery col-lg-3 col-md-4 col-sm-6"
        v-for="show in shows"
        :key="show.show.id">
          <center>
            <Card :show="show.show" />
          </center>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-center">No Results Found</h3>
    </div>
  </div>
</template>

<script>
import { searchForShows } from '../Services/ApiCalls'
import ErrorPage from '../Components/ErrorPage'
import Card from '../Components/Card'
export default {
  name: 'SearchForShows',
  components: {
    ErrorPage,
    Card
  },
  data () {
    return {
      shows: [],
      error: null,
      loading: true
    }
  },
  props: ['showName'],
  created () {
    searchForShows(this.showName)
      .then((response) => {
        this.shows = response.data
        this.shows = this.filterByImage()
      })
      .catch((error) => {
        this.error = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    filterByImage () {
      return this.shows.filter((eachShow) => eachShow.show.image != null)
    }
  }
}
</script>
<style scoped>
.spinner-border {
  width: 65px;
  height: 65px;
  margin-top: 120px;
}
.gallery {
  padding: 25px;
}
</style>
