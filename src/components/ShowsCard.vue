<template>
  <v-card color="transparent" flat width="185">
    <router-link
      :to="{ name: 'show', params: { id: item.id } }"
      :title="'Go to ' + item.name"
      class="show-card"
    >
        <v-img
          :alt="item.name"
          :src="loadImage"
          class="black darken-4 elevation-6 d-placeholder"
          gradient="to top right, rgba(0,0,30,.33), rgba(0,0,0,.7)"
        >
          <div class="d-flex flex-column card-overlay-content white--text">
            <h3 class="subtitle-1 pt-2">
              {{ item.name }}
            </h3>

            <span v-if="item.rating && item.rating.average" class="subtitle-1">
              <v-icon color="orange">mdi-star</v-icon>
              {{ item.rating.average }} <span class="caption">/10</span>
            </span>
          </div>
        </v-img>
    </router-link>
  </v-card>
</template>

<script>
import defaultPlaceholder from '@/assets/default-placeholder.png'
export default {
  name: 'ShowsListItem',
  props: {
    item: Object
  },
  data: () => ({
  }),
  computed: {
    loadImage () {
      if (this.item.image) {
        return this.item.image.medium
      } else {
        return defaultPlaceholder
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.show-card {
  text-decoration: none;
  height: inherit;
  display: block;
  border-radius: 5px !important;
  overflow: hidden;
}
.card-overlay-content {
  height: 100%;
  justify-content: flex-end;
  padding: 14px 10px;
  text-decoration: none;
}
.d-placeholder{
  max-height: 260px;
}

.show-card:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
}
</style>
