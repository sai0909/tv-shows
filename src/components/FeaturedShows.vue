<template>
  <v-carousel
    class="carousel-height"
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(show, i) in featuredShows"
      :key="i"
      reverse-transition="fade"
      transition="fade"
    >
      <v-sheet :color="colors[i]" height="100%">
        <v-parallax
          grey
          darken-4
          v-if="show.image"
          :src="show.image.original"
          class="parallax-wrapper"
        >
          <div class="fader-wrapper">
            <div class="fader-bottom-gradient"></div>
          </div>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="8">
              <div class="feature-carousel-wrapper d-flex">
                <div class="carousel-image px-8 pt-2">
                  <v-img width="180" :src="show.image.medium"/>
                </div>
                <div class="carousel-content">
                  <h1 class="display-2">
                    {{ show.name }}
                  </h1>
                  <div class="d-flex flex-column pt-2">
                    <p class="subtitle-1">
                      <span
                        v-for="genre in show.genres"
                        :key="genre"
                        class="pl-1 pr-2"
                      >
                        {{ genre }}
                      </span>
                    </p>
                    <p>
                        <v-icon color="orange">mdi-star</v-icon>
                          {{ show.rating.average }}
                        <span class="caption">/10</span>
                    </p>
                    <div :inner-html.prop="show.summary | truncate(180)"></div>
                    <div class="find-btn-wrapper">
                      <v-btn :to="{ name: 'show', params: { id: show.id } }" outlined>Find out more</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  props: ['featuredShows'],
  data () {
    return {
      colors: [
        'indigo darken-4',
        'warning darken-3',
        'pink darken-3',
        'red darken-3',
        'deep-purple accent-4',
        'brown ',
        'blue-grey darken-1',
        'deep-purple accent-4'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel-height {
  height: 400px;
}

@media(max-width: 959px){
  .carousel-image{
    display: none;
  }
  .carousel-content{
    padding: 0px 40px;
  }
}
</style>
