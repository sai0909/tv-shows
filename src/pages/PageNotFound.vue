<template>
  <v-container class="text-center fill-height">
    <v-row>
      <v-col cols="12">
        <v-icon x-large>mdi-emoticon-sad</v-icon>
        <h1 class="pt-3 pb-5">{{ title }}</h1>
        <p class="text-uppercase">The Page you are looking for doesn't exist</p>
        <p class="subtitle-2 text-uppercase">
          You may have mistyped the address or the page may have moved
        </p>
        <router-link to="/" :title="'Navigate to Home'">
          <v-btn color="primary" class="mt-4">Navigate to home</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '404'
  })
}
</script>
