<template>
  <v-app>
    <Header />
    <v-main>
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',

  components: {
    Header,
    Footer
  },
  data: () => ({
    //
  })
}
</script>

<style lang="scss">
//Fade Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Vuetify Slider icon alignments

.v-slide-group__prev,
.v-slide-group__next {
  position: absolute;
  top: -3.75rem;

  .v-icon {
    font-size: 35px;
    color: rgba(255, 255, 255, 1);

    &,
    svg {
      height: 35px;
      width: 35px;
    }
  }

  &.v-slide-group__next--disabled,
  &.v-slide-group__prev--disabled {
    .v-icon.v-icon--disabled {
      color: rgba(255, 255, 255, 0.15) !important;
    }
  }
}
.v-slide-group__prev {
  right: 3rem;
}
.v-slide-group__next {
  right: -0.5rem;
}

//Header alignments

.v-main {
  padding: 0 !important;
}

.v-application .v-app-bar {
  transition: background-color 1s ease 0s;
}

.v-application .v-app-bar.v-app-bar--hide-shadow {
  background: transparent !important;
}
.theme--light .v-app-bar--hide-shadow .v-btn{color:#fff!important}

// Parallax Styles

.v-parallax__image-container {
  opacity: 0.15;
}
.v-parallax-content {
  color: inherit;
}

.parallax-wrapper {
  position: relative;

  .fader-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;

    .fader-bottom-gradient {
      background-image: linear-gradient(
        180deg,
        rgba(18, 18, 18, 0) 40%,
        #121212
      );
      height: 100%;
    }
  }
}

//Light Theme
.theme--light {
  .parallax-wrapper {
    .fader-wrapper {
      .fader-bottom-gradient {
        background-image: linear-gradient(
          180deg,
          rgba(18, 18, 18, 0) 40%,
          #fff
        );
        height: 100%;
      }
    }
  }
}

@media(max-width: 560px){
  .v-application .carousel-content .display-2 {
    font-size: 20px !important;
}
}
</style>
