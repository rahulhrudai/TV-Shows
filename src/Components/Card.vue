<template>
  <div class="show">
    <router-link :to="{ name: 'ShowDetails', params: { id: show.id } }">
      <img :src="show.image.medium" />
      <div>
        <b>{{ show.name }}</b>
      </div>
    </router-link>
    <div>
      <b-icon icon="star-fill" class="star-icon mx-1"></b-icon>
      <span v-if="show.rating.average">
        <b>{{ show.rating.average }} </b>
      </span>
      <span v-else><b>NA</b></span>
      <span v-if="show.premiered">
        <b> | {{ show.language }}</b>
      </span>
    </div>
    <b>{{ show.genres.join(" , ") }}</b>
  </div>
</template>
<script>
export default {
  name: 'ShowCard',
  props: ['show']
}
</script>
<style scoped>
img {
  border: 2px solid black;
  margin-bottom: 10px;
}
div {
  padding-bottom: 5px;
}
.show {
  width: 210px;
}
a {
  text-decoration: none;
}
b {
  color: black;
}
.star-icon {
  color: rgb(255, 251, 1);
}
</style>
