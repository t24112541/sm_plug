<template>
  <div id="app">
  <v-app id="inspire">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line subheader>
            
              
              <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-switch :label="sw_all_stage" v-model="sw_all" color="#64DD17"></v-switch>
            </v-list-tile>

   
   <v-divider></v-divider>
   
       <div v-for="(itm,seq) in plug" :key="itm.code" class="plug">
            <v-list-tile v-for="item in items" :key="item.title">

              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ itm.name }}</v-list-tile-title>
              </v-list-tile-content>
              
              <button @click="btn_open(itm.code,seq)" class="btn_all">เปิดทุกดวง</button>&nbsp;&nbsp;&nbsp;
              <button @click="btn_close(itm.code,seq)" class="btn_all">ปิดทุกดวง</button>
              
              <!-- <v-switch :label="plugs_stage" v-model="plugs" color="#64DD17"></v-switch>
               -->
            </v-list-tile>


        <div class="relay" v-for="(st,idx) in itm.status" :key="idx">
             
             <!-- <v-list-tile v-for="item in items" :key="item.title"> -->

              <!-- <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar> -->

              <v-list-tile-content>
                <v-list-tile-title>Switch - {{ idx +1 }}</v-list-tile-title>
              </v-list-tile-content>
              <button @click="btn_click(itm.code,st,idx)">{{ st === '0' ? 'เปิดไฟ' : (st === '1' ? 'ปิดไฟ' : '') }}</button>
              <!-- <v-switch :label="relay_stage" v-model="relay" color="#64DD17"></v-switch> -->
            <!-- </v-list-tile> -->
        </div>
      
      
       </div> 
  
            </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</div>
</template>
<script>


const mqtt = require('mqtt')

export default {
  data() {
    return {
      
      plug: [
        { code: '84D8E1766FC', name: 'Plug-1', loc: '', status: [-1, -1, -1, -1] },
        { code: '84D8E176994', name: 'Plug-2', loc: '', status: [-1, -1, -1, -1] },
      ],
      items: [
        { icon: 'far fa-lightbulb', iconClass: 'yellow lighten-3 white--text', title:'Open-Close Switches',
        },
      ],
      sw_all:"",
      sw_all_stage:"",
      
      // plugs:"",
      // plugs_stages:"",

      // relay:"",
      // relay_stage:"",

    }
  }, // data
  watch:{
   
    sw_all(newValue){
      if(newValue==true){
        this.btn_Open_All()
        this.sw_all_stage="true" 
      }
      else if(newValue==false){
        this.btn_Close_All()
        this.sw_all_stage="false"
      } 
     },
     
    //   plugs(newValue){
    //   if(newValue==true){
    //     // this.btn_open(code)
    //     this.plugs_stage="true"
    //     console.log(code) 
    //   }
    //   else if(newValue==false){
    //     // this.btn_close(code)
    //     this.plugs_stage="false"
    //   } 
    // }, 
    //  relay(newValue){
    //   if(newValue==true){
    //     this.btn_click(code,st,idx)
    //     this.relay_stage="true" 
    //   }
    //   else if(newValue==false){
    //     this.btn_click(code,st,idx)
    //     this.relay_stagee="false"
    //   } 
    //  },
   
   
   
   },

  created() {
    //this.client = mqtt.connect('wss://mqtt.apps.ccollege.ac.th:8084/mqtt') //เซิฟเวอร์หลัก EMQ
    this.client = mqtt.connect('wss://mqtt2.apps.ccollege.ac.th/')  //เซิฟเวอร์สำรอง Mosca
    this.client.on('connect', this.onMqttConnect.bind(this))
    this.client.on('message', this.onMqttMessage.bind(this))
  }, // created

  beforeDestroy() {
    // if (this.client) {this.client.end()}
    this.client && this.client.end()
  }, // beforeDestroy

  methods: {
      btn_click(code,st,idx){
        // var st = parseInt(st)
        // console.log('st',st)
        // console.log(typeof st)       
         for (let i = 0 ; i < this.plug.length ; i++){
        if (this.plug[i].code === code && idx == 0 && st == 0){
            this.client.publish('op-' + this.plug[i].code, '0=1')}
        else if(this.plug[i].code === code && idx == 0 && st == 1){
            this.client.publish('op-' + this.plug[i].code, '0=0')}

         if(this.plug[i].code === code && idx == 1 && st == 0){
            this.client.publish('op-' + this.plug[i].code, '1=1')}
        else if(this.plug[i].code === code && idx == 1 && st == 1){
            this.client.publish('op-' + this.plug[i].code, '1=0')}
            
         if(this.plug[i].code === code && idx == 2 && st == 0){
            this.client.publish('op-' + this.plug[i].code, '2=1')}
        else if(this.plug[i].code === code && idx == 2 && st == 1){
            this.client.publish('op-' + this.plug[i].code, '2=0')}

         if(this.plug[i].code === code && idx == 3 && st == 0){
            this.client.publish('op-' + this.plug[i].code, '3=1')}
        else if(this.plug[i].code === code && idx == 3 && st == 1){
            this.client.publish('op-' + this.plug[i].code, '3=0')}
         }
      },
      btn_close(code){    
         
         for (let i = 0 ; i < this.plug.length ; i++){
            if(this.plug[i].code === code){
              for(let l = 0 ; l <= 3; l++){
              this.client.publish('op-' + this.plug[i].code, l+'=0')
              }
            }
           }
      },
       btn_open(code){    
         
         for (let i = 0 ; i < this.plug.length ; i++){
            if(this.plug[i].code === code){
              for(let l = 0 ; l <= 3; l++){
              this.client.publish('op-' + this.plug[i].code, l+'=1')
              }
            }
           }
      },
      btn_Open_All(){    
      for (let i = 0; i < this.plug.length; i++) {
        this.client.publish('op-' + this.plug[i].code, 'ALL1')
      }        
      },
      btn_Close_All(){    
         
         for (let i = 0; i < this.plug.length; i++) {
        this.client.publish('op-' + this.plug[i].code, 'ALL0')
      }
      },

    onMqttConnect() {
      console.log('connected')
      this.client.subscribe('status', err => err)
      for (let i = 0; i < this.plug.length; i++) {
        this.client.publish('op-' + this.plug[i].code, 'status')
      }
      
    }, // onMqttConnect

    onMqttMessage(topic, message) {
      if (topic === 'status') {
        // message is Buffer
        console.log('GOT:', message.toString())
        // 0002-0100
        let msg = message.toString()
        let code = msg.substr(0, 11) // '0002'
        let status = msg.substr(12, 4).split('') // ['0', '1', '0', '0']
        console.log('code=', code, 'status', status)
        for (let i = 0; i < this.plug.length; i++) {
          if (this.plug[i].code === code) {
            this.plug[i].status = status
            // TODO: ???
          }
        }
      }
    }, // onMqttMessage
  }, // methods
}
</script>
