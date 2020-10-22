<template>
  <v-lazy
    :options="{
      threshold: 0
    }"
    transition="fade-transition"
    class="show-detail"
  >
    <div v-if="!isLoading">
      <v-img
        height="400"
        :src="backgroundImage | urlFormatter"
        position="top center"
        gradient="to top right, rgba(0,0,0,.33), rgba(125,132,172,.7)"
      ></v-img>
      <v-card class="detail-card" elevation="12">
        <v-card-text>
          <h1 class="display-2">
            {{ getShowInfo.name }}
          </h1>
          <div class="d-flex flex-column pt-2">
            <p class="subtitle-1 pt-4 mb-4">
              <v-chip
                v-for="genre in getShowInfo.genres"
                :key="genre"
                class="pr-2 mt-3 mr-2"
              >
                {{ genre }}
              </v-chip>
            </p>
            <v-divider></v-divider>
            <p
              class="headline d-flex align-center mt-2"
              v-if="getShowInfo.rating && getShowInfo.rating.average"
            >
              <v-icon class="mr-2" color="orange">mdi-star</v-icon>
              {{ getShowInfo.rating.average }} <span class="caption"> /10</span>
            </p>
            <div v-html="getShowInfo.summary"></div>
            <div class="cast-info" v-if="getShowInfo._embedded">
              <v-flex>
                <h3 class="mb-3 mt-4">Cast Info</h3>
                <v-tooltip
                  top
                  v-for="(value, index) in getShowInfo._embedded.cast"
                  :key="index"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      class="cast-avatar-img"
                      :alt="value.person.name"
                      :src="value.person.image.medium"
                    />
                  </template>
                  <span>{{ value.person.name }}</span>
                </v-tooltip>
              </v-flex>
            </div>
          </div>
        </v-card-text>

        <v-img v-if="posterImage"
          :src="posterImage | urlFormatter"
          class="mx-auto elevation-6 order-first order-md-last poster-image"
          width="300"
          lazy-src="@/assets/default-placeholder.png"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row> </template
        ></v-img>
        <v-img v-else  class="mx-auto black elevation-6 order-first order-md-last poster-image" width="300" src="@/assets/default-placeholder.png"></v-img>
      </v-card>
    </div>
    <Loader v-else></Loader>
  </v-lazy>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/components/Loader.vue'
export default {
  name: 'ShowDetail',
  data: () => ({
    isLoading: false
  }),
  components: {
    Loader
  },
  computed: {
    ...mapGetters('Shows', ['getShowInfo']),
    ...mapGetters('Shows', ['getShowImages']),
    ...mapGetters('Search', ['getOpenDialog']),
    backgroundImage () {
      if (this.getShowImages.length <= 0) return ''

      const bgImage = this.getShowImages.filter(
        image => image.type === 'background'
      )[0]
      return bgImage ? bgImage.resolutions.original.url : ''
    },
    posterImage () {
      if (this.getShowImages.length <= 0) return ''

      const psImage = this.getShowImages.filter(
        image => image.type === 'poster'
      )[0]
      return psImage ? psImage.resolutions.original.url : ''
    }
  },
  async mounted () {
    this.isLoading = true
    if (!isNaN(this.$route.params.id)) {
      await this.fetchShowImages(this.$route.params.id)
      await this.fetchShow(this.$route.params.id)
      this.isLoading = false
      console.log(this.getShowInfo)
    } else {
      this.$router.push({ name: 'pageNotFound' })
    }
  },
  methods: {
    ...mapActions('Shows', ['fetchShow', 'fetchShowImages'])
  },
  async beforeRouteUpdate (to, from, next) {
    this.isLoading = true
    if (!isNaN(to.params.id)) {
      await this.fetchShowImages(to.params.id)
      await this.fetchShow(to.params.id)
      console.log(to.params.id)
      this.isLoading = false
      next()
    } else {
      this.$router.push({ name: 'pageNotFound' })
    }
  }
}
</script>

<style lang="scss" scoped>
.show-detail {
  height: 100%;
  .detail-card {
    max-width: 66%;
    margin-top: -80px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    display: flex;
    overflow: hidden;
    img.cast-avatar-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin: 10px 10px;
    }
  }
}

@media (max-width: 959px) {
  .show-detail {
    .detail-card {
      max-width: 100%;
      margin-top: -180px;
      background: transparent;
      padding: 16px;
      flex-direction: column;
      margin-bottom: 0px;
    }
  }
}
</style>
