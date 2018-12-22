<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense >

          <v-list-tile @click="user_edit(u_id)">
            <v-list-tile-action>
              <v-icon class="fas fa-user-edit"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ user }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
          

        
        <v-subheader class="mt-3 grey--text text--darken-1">ระบบ</v-subheader>
        
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon color="grey darken-1" class="fas fa-sign-out-alt"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">ออกจากระบบ</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      style="color:#fff"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon style="color:#fff" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-side-icon><img style="width:100%" @click="plug()" :src="require('@/static/smp.png')"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title" @click="plug()">Smart Plug</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click="add_plug()"><i style="color:#fff" class="fas fa-plus"></i></v-toolbar-side-icon>
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
    <v-flex xs2 >
          <v-dialog v-model="conf" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">เตือน</v-card-title>
              <v-card-text>ยืนยันการออกจากระบบ</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="default" flat @click.native="conf = false">ยกเลิก</v-btn>
                <v-btn color="primary" flat @click="logout()">ตกลง</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
  </v-app>
</template>

<script>
  export default {
    data: () => ({

      conf:false,

      drawer: null,
      user:sessionStorage.getItem("u_fullname"),
      u_id:sessionStorage.getItem('u_id'),
    }),
    props: {
      source: String
    },
    methods:{
      add_plug(){
        this.$router.push({name:"plug-addplug"})
      },
      user_edit(id){
        this.$router.push({path: "/users/edit:user?u_id="+id})
      },
      plug(){
        this.$router.push({name:"plug-shplugs"})
      },
      conf(){this.conf=true},
      logout(){
        sessionStorage.removeItem('u_id');
        sessionStorage.removeItem('u_fullname');
        sessionStorage.removeItem('u_username');
        sessionStorage.removeItem('u_password');
        sessionStorage.removeItem('u_type');
        this.$router.replace({name: "index"})
      }
    },
    created() {
      if (!sessionStorage.getItem("u_id")|| !sessionStorage.getItem("u_fullname") || !sessionStorage.getItem("u_username")|| !sessionStorage.getItem("u_password")){
        this.$router.push({name: "index"})
      }
    },
  }
</script>