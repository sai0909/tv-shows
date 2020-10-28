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
        :src="fullWidthImage | urlFormatter"
        position="top center"
        gradient="to top right, rgba(0,0,0,.33), rgba(125,132,172,.7)"
      ></v-img>
      <v-card class="detail-card" elevation="12">
         <v-btn class="back-btn"
              small
               :to="{ path: '/'}">
               <v-icon> mdi-keyboard-backspace</v-icon>
               <span>Go Back</span>
              </v-btn>
        <v-card-text>
          <h1 class="display-2" v-if="getTvShowDetails.name">
            {{ getTvShowDetails.name }}
          </h1>
          <div class="d-flex flex-column pt-2">
            <p class="subtitle-1 pt-4 mb-4">
              <v-chip
                v-for="genre in getTvShowDetails.genres"
                :key="genre"
                class="pr-2 mt-3 mr-2"
              >
                {{ genre }}
              </v-chip>
            </p>
            <v-divider></v-divider>
            <p
              class="headline d-flex align-center mt-2"
              v-if="getTvShowDetails.rating && getTvShowDetails.rating.average"
            >
              <v-icon class="mr-2" color="orange">mdi-star</v-icon>
              {{ getTvShowDetails.rating.average }} <span class="caption"> /10</span>
            </p>
            <div v-html="getTvShowDetails.summary"></div>
            <div class="cast-info" v-if="getTvShowDetails._embedded">
              <v-flex>
                <h3 class="mb-3 mt-4">Cast Info</h3>
                <v-tooltip
                  top
                  v-for="(value, index) in getTvShowDetails._embedded.cast"
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
    ...mapGetters('Shows', ['getTvShowDetails', 'getShowImages']),
    ...mapGetters('Search', ['getOpenDialog']),
    fullWidthImage () {
      if (this.getShowImages.length <= 0) return ''

      const bgImg = this.getShowImages.filter(
        image => image.type === 'background'
      )[0]
      return bgImg ? bgImg.resolutions.original.url : ''
    },
    posterImage () {
      if (this.getShowImages.length <= 0) return ''

      const posterImage = this.getShowImages.filter(
        image => image.type === 'poster'
      )[0]
      return posterImage ? posterImage.resolutions.original.url : ''
    }
  },
  async mounted () {
    this.isLoading = true
    if (!isNaN(this.$route.params.id)) {
      await this.pullTvShowImages(this.$route.params.id)
      await this.pullTvShow(this.$route.params.id)
      this.isLoading = false
    } else {
      this.$router.push({ name: 'pageNotFound' }).catch(() => {})
    }
  },
  methods: {
    ...mapActions('Shows', ['pullTvShow', 'pullTvShowImages'])
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
    img.cast-avatar-img {
      width: 70px;
      height: 80px;
      object-fit: cover;
      margin: 10px 10px;
    }
  }
  .back-btn{
   position: absolute;
    right: 0;
    z-index: 2;
    top: -50px;
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
      box-shadow:none !important;
    }
    .back-btn{
      top: -80px;
      right: 22px;
    }
  }
}
</style>
