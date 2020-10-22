<template>
  <div class="show-listing">
    <div v-if="!isLoading">
      <FeaturedShows :featuredShows="showsByPopularity"></FeaturedShows>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="genre in getGenres"
            :key="genre"
            cols="12"
            class="pa-md-7"
          >
            <div class="h4 text-uppercase font-weight-bold mb-5">
              {{ genre }}
            </div>
            <v-lazy
              :options="{
                threshold: 0
              }"
              min-height="260"
              transition="fade-transition"
            >
              <v-slide-group multiple show-arrows>
                <v-slide-item
                  v-for="show in showsByGenre(genre)"
                  :key="'Show ' + show.id"
                  class="pr-4"
                >
                  <ShowsCard :item="show" />
                </v-slide-item>
              </v-slide-group>
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Loader v-else></Loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShowsCard from '@/components/ShowsCard.vue'
import FeaturedShows from '@/components/FeaturedShows.vue'
import Loader from '@/components/Loader.vue'
export default {
  name: 'Shows',
  components: {
    ShowsCard,
    FeaturedShows,
    Loader
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapGetters('Shows', ['getShows']),
    ...mapGetters('Shows', ['getGenres']),
    showsByPopularity () {
      return this.getShows.slice(0, 10)
    }
  },
  async mounted () {
    if (this.getShows.length === 0) {
      this.isLoading = true
      await this.fetchShows()
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('Shows', ['fetchShows']),
    showsByGenre: function (genre) {
      return this.getShows
        .filter(show => show.genres && show.genres.some(g => g === genre))
        .slice(0, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.show-listing {
  height: 100%;
}
</style>
