<template>
  <div>
    <div v-if="loading && error == null" class="text-center">
      <div class="spinner-border"></div>
      <h3 class="text-dark pt-4">Loading</h3>
    </div>
    <div v-else-if="error != null">
      <ErrorPage :error="error" />
    </div>
    <div v-else>
      <div class="show-container">
        <div class="show-left">
          <img class="rounded" :src="show.image.original" />
        </div>
        <div class="show-right">
          <h1 class="text-center">
            <strong>{{ show.name }}</strong>
          </h1>
          <b-icon icon="star-fill" class="star-icon mx-1"></b-icon>
          <b v-if="show.rating.average">{{ show.rating.average }} </b>
          <b v-else>NA</b>
          <b v-if="show.premiered">| {{ show.language }}</b>
          <b> | {{ show.genres.join(" , ") }}</b>
          <p class="description" v-html="show.summary"></p>
          <b-button pill class="m-2" variant="info" @click="$router.go(-1)">Go Back</b-button>
          <b-button
          pill
          class="m-2 test-button"
          variant="info"
          @click="moreDetails">
            Know More
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getShowDetails } from '../Services/ApiCalls'
import ErrorPage from '../Components/ErrorPage'
export default {
  name: 'ShowDetails',
  components: {
    ErrorPage
  },
  props: ['id'],
  data () {
    return {
      show: [],
      error: null,
      loading: true
    }
  },
  async created () {
    getShowDetails(this.id)
      .then((response) => {
        this.show = response.data
      })
      .catch((error) => {
        this.error = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    moreDetails () {
      window.open(this.show.url)
    }
  }
}
</script>
<style scoped>
img {
  width: 360px;
  height: auto;
  border: 5px solid black;
}
.description {
  font-size: 20px;
  font-family: "Comic sans MS", "Courier New", Courier, monospace;
  margin-top: 40px;
}
.spinner-border {
  width: 65px;
  height: 65px;
  margin-top: 120px;
}
.show-container {
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  text-align: center;
}

.show-left {
  flex: 40%;
  padding-top: 20px;
}

.show-right {
  flex: 60%;
  padding: 30px;
}

@media screen and (max-width: 425px) {
  img {
    width: 100%;
    height: auto;
  }
  .show-right,
  .show-left {
    flex: 100%;
    padding: 15px;
  }
}
.star-icon {
  color: rgb(255, 251, 1);
}
</style>
