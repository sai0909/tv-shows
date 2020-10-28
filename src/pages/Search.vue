<template>
<div class="search-dialog-wrapper">
    <v-card class="search-dialog d-flex flex-column">
      <v-banner class="text-center"><h2 class="text-uppercase">Search for your favourite shows</h2></v-banner>
      <v-container>
        <v-text-field
          v-model="query"
          @input="debounceInput"
          label="Search"
          class="pt-6 mt-4 search-field"
        ></v-text-field>
        <div v-if="!loading">
          <div
            v-if="shows.length > 0"
            class="search-overlay-listing pt-12 d-flex flex-wrap flex-row justify-center"
          >
            <div
              v-for="show in shows"
              :key="'Search show ' + show.show.id"
              class="pa-4"
            >
              <ShowsCard :item="show.show" />
            </div>
          </div>
          <div class="text-center mt-5" v-if="query.length > 2 && this.shows.length == 0">
            <v-icon x-large>mdi-emoticon-sad</v-icon>
            <p class="mt-5">No Tv Shows Found</p>
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap justify-center" v-else>
          <v-skeleton-loader
            class="pr-4"
            width="200"
            type="card"
            v-for="n in 10 "
            :key="n"
          ></v-skeleton-loader>
        </div>
      </v-container>
    </v-card>
</div>
</template>

<script>

import { getSearchShowsData } from '@/api/search.api'
import ShowsCard from '@/components/ShowsCard.vue'

export default {
  name: 'Search',
  components: {
    ShowsCard
  },
  data: () => ({
    query: '',
    shows: [],
    loading: false,
    timeOut: null
  }),
  methods: {
    debounceInput () {
      this.loading = true
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.searchShows()
      }, 500)
    },
    async searchShows () {
      if (this.query.length > 2) {
        getSearchShowsData(this.query).then((res) => { this.shows = res.data; this.loading = false })
      } else {
        this.shows = []
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.search-dialog-wrapper{
  padding:68px 0px 0px;
}
</style>
