<template>
  <v-app-bar app elevate-on-scroll fixed>
    <v-container fluid>
      <v-row justify="center" align="center" class="navbar_main">
        <div class="d-flex align-center">
          <router-link to="/" text :title="'Go to homepage'">
            <v-img
              alt="TV Shows"
              class="shrink mr-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              width="60"
              height="40"
            />
          </router-link>
        </div>

        <v-spacer></v-spacer>
        <v-btn
          aria-label="search"
          icon
          class="ml-2"
          :to="{ name: 'Search'}"
          :title="'Go to search'"
        >
          <v-icon>{{ searchIco }}</v-icon>
        </v-btn>
        <v-btn
          class="ml-2"
          icon
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>
            {{
              $vuetify.theme.dark ? "mdi-weather-night" : "mdi-weather-sunny"
            }}</v-icon
          >
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>

export default {
  name: 'Header',
  data: () => ({
    searchIco: 'mdi-magnify'
  })
}
</script>
