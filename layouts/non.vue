<template>
  <v-app
    id="inspire"
  >
   
    <v-toolbar
      color="red"
      style="color:#fff"
      dense
      fixed
      clipped-left
      app
    >
  
      <v-toolbar-side-icon><img style="width:100%" :src="require('@/static/smp.png')"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Smart Plug</span>
      </v-toolbar-title>

    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-container>
              <nuxt/>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
     <v-footer color="red" app>
      <v-spacer></v-spacer>
      <span class="white--text" >Information Technology. CTC 2018 &nbsp;</span>
    </v-footer>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' }
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>