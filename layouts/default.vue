<template>
    <div id="app">
  <v-app id="inspire">
    <v-toolbar dark color="orange darken-4">
  <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="title font-weight-light text-xs-center grow">Smart Plug</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
<v-container>
   <nuxt/>
</v-container>
<v-tabs
      centered
      color="orange darken-4"
      dark
      icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>
  
      <v-tab href="#tab-1">
        หน้าหลัก
        <v-icon>home</v-icon>
      </v-tab>
  
      <v-tab href="#tab-2">
        คู่มือ
        <v-icon>fas fa-book-open</v-icon>
      </v-tab>
  
      <v-tab href="#tab-3">
        ประวัติ
        <v-icon>people</v-icon>
      </v-tab>
  
      <v-tab-item
        v-for="i in 3"
        :id="'tab-' + i"
        :key="i">
      </v-tab-item>
    </v-tabs>
  </v-app>
</div>
</template>
