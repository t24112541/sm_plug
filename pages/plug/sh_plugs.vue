<template>
  <div id="app">
    <v-app id="inspire">
      <v-flex xs12 >
        <v-card >
          <v-list two-line subheader style="width:300px">
            
              
              <v-list-tile v-for="item in items" :key="item.title" >
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              
              <button @click="btn_Open_All()" class="cv_btn_open"><i class="fas fa-check-circle fa-2x"></i></button>&nbsp;&nbsp;&nbsp;
              <button @click="btn_Close_All()" class="cv_btn_close"><i class="fas fa-times-circle fa-2x"></i></button>

            </v-list-tile><br>

            <v-divider></v-divider>
   
            <div v-for="(itm) in plug" :key="itm.p_code" class="plug">
                  <v-list-tile v-for="item in items" :key="item.title" @click="sh_plug(itm.p_code)">

                    <v-list-tile-avatar>
                      <i class="fas fa-plug fa-3x cv_icon" ></i>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ itm.p_name }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                <v-divider></v-divider>


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
        // { code: '8E0D84', name: 'Plug-1', loc: '', status: [-1,-1,-1,-1] },
        // { code: '84D8E1766FC', name: 'Plug-2', loc: '', status: [-1,-1,-1,-1] },
      ],
      items: [
        { icon: 'far fa-lightbulb', iconClass: 'orange darken-2 white--text', title:'ทุกปลั๊ก',
        },
      ],
      sw_all:"",
      sw_all_stage:"",
      u_id:sessionStorage.getItem('u_id'),

      

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

    this.load_sp_plug()
  }, // created

  beforeDestroy() {
    // if (this.client) {this.client.end()}
    this.client && this.client.end()
  }, // beforeDestroy

  methods: {

    sh_plug(item){
      this.$router.push({path: "/plug/plug_detail?p_code="+item})
    },
    async load_sp_plug(){
      let res=await this.$http.get('/sp_plug/list_sp_plug/'+this.u_id)
      // console.log(res.data.datas)
      this.plug=res.data.datas
    },

      async btn_Open_All(){   
        for (let i = 0; i < this.plug.length; i++) {
          this.client.publish('op-' + this.plug[i].p_code, 'ALL1')
          let res=await this.$http.post('/sp_plug/log/',{
            p_code:this.plug[i].p_code,
            l_unit:'เปิดทุกปลั๊ก',
            u_id:this.u_id,
          })
        }        
      },
      async btn_Close_All(){    
        for (let i = 0; i < this.plug.length; i++) {
          this.client.publish('op-' + this.plug[i].p_code, 'ALL0')
          let res=await this.$http.post('/sp_plug/log/',{
            p_code:this.plug[i].p_code,
            l_unit:'ปิดทุกปลั๊ก',
            u_id:this.u_id,
          })
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
        console.log('GOT:', message.toString())
        let msg = message.toString()
        let code = msg.substr(0,6 ) 
        let status = msg.substr(7, 4).split('') 
        console.log('code=', code, 'status', status)
        for (let i = 0; i < this.plug.length; i++) {
          if (this.plug[i].code === code) {
            this.plug[i].status = status
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
