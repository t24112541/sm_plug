<template>
  <div id="app">
    <v-app id="inspire">
      <v-flex xs12 >
        <v-card>
          <v-list two-line subheader>
            
              
              <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>

              <button @click="btn_Open_All()" class="cv_btn_open"><i class="fas fa-check-circle fa-2x"></i></button>&nbsp;&nbsp;&nbsp;
              <button @click="btn_Close_All()" class="cv_btn_close"><i class="fas fa-times-circle fa-2x"></i></button>

              <!-- <v-switch :label="sw_all_stage" v-model="sw_all" color="#64DD17"></v-switch> -->
            </v-list-tile>

            <v-divider></v-divider><br>
   
            <div v-for="(itm,seq) in plug" :key="itm.code" class="plug">
                  <v-list-tile v-for="item in items" :key="item.title">

                    <v-list-tile-avatar>
                      <i class="fas fa-plug fa-3x cv_icon" ></i>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ itm.name }}</v-list-tile-title>
                    </v-list-tile-content>
                    
                    <button @click="btn_open(itm.code,seq)" fab large dark class="cv_btn"><i class="fas fa-check-circle fa-3x"></i></button>&nbsp;&nbsp;&nbsp;
                    <button @click="btn_close(itm.code,seq)" fab large dark class="cv_icon"><i class="fas fa-times-circle fa-3x"></i></button>

                  </v-list-tile>


                <v-container fluid grid-list-sm text-xs-center>
                  <v-layout row wrap>

                    <v-flex v-for="(st,idx) in itm.status" :key="idx" xs6>
                      <v-btn v-if="st == '1'" color="light-green lighten-1" class="white--text" fab large dark @click="btn_click(itm.code,st,idx)">
                        <i class="fas fa-lightbulb fa-3x" v-if="st == '1'"></i>
                      </v-btn>
                      <v-btn v-if="st == '0'" color="grey lighten-2" class="white--text" fab large dark @click="btn_click(itm.code,st,idx)">
                        <i class="far fa-lightbulb fa-3x" v-if="st == '0'"></i>
                      </v-btn>
                      <v-text-field
                        v-model="d_name"
                      ></v-text-field>
                    </v-flex>

                  </v-layout>
                </v-container>
                <v-divider></v-divider><br>
              </div>
            </v-list>
        </v-card>
      </v-flex>        
  </v-app>
</div>
</template>
<script>
const mqtt = require('mqtt')
export default {
  data() {
    return {
      
      plug: [
        { code: 'A4AE30', name: 'Plug-1', loc: '', status: [1,1,1,1] },
        { code: '8E0D848', name: 'Plug-2', loc: '', status: [-1,-1,-1,-1] },
      ],
      items: [
        { icon: 'far fa-lightbulb', iconClass: 'yellow lighten-3 white--text', title:'All Switches',
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
    async load_sp_plug(){
      let res=await this.$http.get('/sp_plug/sp_plug')
      // console.log(res.data.datas)
      this.plug=res.data.datas
    },
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
/////////////////////  waitting device  /////////////////////////////
////////////  select p_code in mysql -> this.plug ///////////////////
/////////////////////////////////////////////////////////////////////
    onMqttConnect() {
      console.log('connected')
      this.client.subscribe('status', err => err)
      for (let i = 0; i < this.plug.length; i++) {
        this.client.publish('op-' + this.plug[i].code, 'status')
      }
      
    }, // onMqttConnect
////////////////////////////////////////////////////////////////////
    onMqttMessage(topic, message) {
      if (topic === 'status') {
        // message is Buffer
        console.log('GOT:', message.toString())
        // 0002-0100
        let msg = message.toString()
        let code = msg.substr(0,6 ) 
        let status = msg.substr(7, 4).split('') 
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
  padding: 4px;
  margin:4px;
}
.btn{
  border-radius: 4px;
  background-color: #FF9933;
  color: white;
  padding: 1px  8px;
}
.cv_btn_open{border-radius: 4px;padding: 4px;margin:4px;color: white;background-color: #a9bd71;}
.cv_btn_close{border-radius: 4px;padding: 4px;margin:4px;color: white;background-color: #e09a4a;}
.cv_btn{color: #a9bd71;}
.cv_icon{color: #e09a4a;}
</style>
