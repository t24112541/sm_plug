<template>
  <div>
    <v-flex xs12 v-for="item in items" :key="item.title">
    </v-flex>
    <v-flex xs12 v-for="(itm) in plug" :key="itm.code">

      <v-container fluid grid-list-sm>
        <v-layout row wrap>

          <v-flex v-for="(st,idx) in itm.status" :key="idx" xs6>
              <v-btn v-if="st == '1'" color="light-green darken-2" class="white--text" fab large dark @click="btn_click(itm.code,st,idx)">
                <i class="fas fa-lightbulb fa-3x" v-if="st == '1'"></i>
              </v-btn>
              <v-btn v-if="st == '0'" color="grey lighten-2" class="white--text" fab large dark @click="btn_click(itm.code,st,idx)">
                <i class="far fa-lightbulb fa-3x" v-if="st == '0'"></i>
              </v-btn>
            </v-flex>

        </v-layout>
      </v-container>

      
    </v-flex>      
       </div> 
</template>
<script>


const mqtt = require('mqtt')

export default {
  data() {
    return {
      
      plug: [
        { code: '84D8E176994', name: 'Plug-1', loc: '', status: [0, 1, 0, 0] },
        { code: '84D8E1766FC', name: 'Plug-2', loc: '', status: [0, 1, 1, 0]  },
      ],
      items: [
        { icon: 'far fa-lightbulb', iconClass: 'yellow lighten-3 white--text', title:'Open-Close Switches',
        },
      ],
      sw_all:"",
      sw_all_stage:"",
      

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
   },

  created() {
    //this.client = mqtt.connect('wss://mqtt.apps.ccollege.ac.th:8084/mqtt') //เซิฟเวอร์หลัก EMQ
    // this.client = mqtt.connect('wss://mqtt2.apps.ccollege.ac.th/')  //เซิฟเวอร์สำรอง Mosca
     this.client = mqtt.connect('wss://ecart-socket.poc.xenex.io')
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
        console.log(code)    
        console.log(st) 
        console.log(idx) 

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
<style>
.btn_all{
   border-radius: 4px;
  background-color: #FF9933;
  color: white;
  padding: 1px  8px;
}
.btn{
  border-radius: 4px;
  background-color: #FF9933;
  color: white;
  padding: 1px  8px;
}
</style>
