<template>
  <div id="app">
    <v-app id="inspire">
      <v-flex xs12 >
        
        <v-card>
          <v-list two-line subheader>
   
            <div class="plug">
              
                  <v-list-tile v-for="item in items" :key="item.title">

                    <v-list-tile-avatar>
                      <i class="fas fa-plug fa-3x cv_icon" ></i>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                
                      <v-text-field
                        :disabled="!isEditing"
                        v-model="p_name"
                        @keypress.enter="update_plug_p_name(plug.code)"
                        :placeholder="plug.name"
                      ></v-text-field>
                    </v-list-tile-content>                   
                  </v-list-tile>

                <v-container fluid grid-list-sm text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-btn color="light-green darken-1" dark fab large
                        @click="btn_open(plug.code)"
                      >
                        <v-icon large >done</v-icon>
                      </v-btn>
                    
                    </v-flex>
                    <v-flex xs6>
                      <v-btn color="red" dark fab large
                        @click="btn_close(plug.code)"
                      >
                        <v-icon large >clear</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-divider style="margin:10px"></v-divider>
                  <v-layout row wrap>
                    <v-flex v-for="(st,idx) in plug.status" :key="idx" xs6>
                      <v-btn v-if="st == '1'" color="light-green lighten-1" class="white--text" fab large dark @click="btn_click(plug.code,st,idx)">
                        <i class="fas fa-lightbulb fa-3x" v-if="st == '1'"></i>
                      </v-btn>
                      <v-btn v-if="st == '0'" color="grey lighten-2" class="white--text" fab large dark @click="btn_click(plug.code,st,idx)">
                        <i class="far fa-lightbulb fa-3x" v-if="st == '0'"></i>
                      </v-btn>
                      <!-- <v-text-field
                        
                        :disabled="!isEditing"
                        v-model="d_name"
                        :placeholder="plg_des.d_name"
                      ></v-text-field> -->
                    </v-flex>

                  </v-layout>
                  <v-flex xs12 >
                    <v-divider style="margin:10px"></v-divider>
                    <v-layout align-center>
                      <v-textarea
                          prepend-icon="far fa-file-alt fa-2x"
                          name="input-7-1"
                          label="คำอธิบาย"
                          :disabled="!isEditing"
                          :placeholder="plug.loc"
                          v-model="p_des_locat"
                          @keypress.enter="update_plug_p_des_locat(plug.code)"
                      ></v-textarea>
                    </v-layout>
                  </v-flex>
                </v-container>

                  

              </div>
      
                    <v-dialog v-model="conf_del" persistent max-width="290">
                      <v-btn slot="activator" dark absolute buttom right fab
                        color="red lighten-2"
                      >
                        <i class="fas fa-trash-alt fa-2x"></i>
                      </v-btn>
                      <v-card>
                        <v-card-title class="headline">ยืนยันการลบข้อมูล</v-card-title>
                        <v-card-text>ต้องการลบปลั๊ก<br> ใช่หรือไม่?</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="red lighten-2" flat @click.native="conf_del=false">ไม่ใช่</v-btn>
                          <v-btn color="primary" flat @click="plug_del(plug.code)">ใช่</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
            

                  <v-fab-transition>
                    <v-btn color="orange darken-3" dark absolute buttom left fab
                      @click="isEditing = !isEditing"
                      style="margin-top:3%"
                    >
                      <v-icon v-if="isEditing" class="fas fa-times fa-2x"></v-icon>
                      <v-icon v-else >edit</v-icon>        
                    </v-btn>    
                  </v-fab-transition>
            </v-list>
            
          
        </v-card>
        <!-- <v-alert
                v-model="danger"
                dismissible
                :type="this.type_api"
            >{{alt_txt}}
            </v-alert> -->

            <v-data-table
      :headers="headers"
      :items="log_data"
      style="margin-top:20%"
      class="elevation-1"
      prev-icon="fas fa-chevron-circle-left"
      next-icon="fas fa-chevron-circle-right"
      sort-icon="mdi-menu-down"
      rows-per-page-text="แสดง"
      :rows-per-page-items=rows_per_page
      
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props" >
      <tr>
        <td class="text-xs-left">{{ props.item.l_datetime }}</td>
            <td class="text-xs-left">{{ props.item.l_unit }}</td>
            <td class="text-xs-left">{{ props.item.u_fullname}}</td>
      </tr>
    </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          ไม่พบข้อมูล :(
        </v-alert>
      </template>
  </v-data-table>
      </v-flex>   
           
  </v-app>
  
</div>
</template>
<script>


const mqtt = require('mqtt')

export default {
  data() {
    return {
              rows_per_page:[5],

      headers: [
          { text: 'เวลา', value:""},
          { text: 'การทำงาน', value: 'fat' },
          { text: 'ผู้ใช้', value: 'carbs' },
        ],
      log_data:[],
      p_name:"",
      p_des_locat:"",
      isEditing:"",
      plug: [],
      items: [
        { icon: 'far fa-lightbulb', iconClass: 'yellow lighten-3 white--text', title:'All Switches',
        },
      ],
      sw_all:"",
      sw_all_stage:"",
      
      conf_del:false,

      u_id:sessionStorage.getItem('u_id'),
      p_code:this.$route.query.p_code,

      plg_des:[],

      danger:"",
      type_api:"",
      alt_txt:"",
      alt:false,
      plg_status:false,
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
    this.load_plug()
    this.load_log()
    
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
    async load_log(){
       let res=await this.$http.get("/sp_plug/load_log/"+this.p_code)
      //  console.log("log")
      //  console.log(res.data.datas)
       if(res.data.ok==true){this.log_data=res.data.datas}
    },
    async update_plug_p_des_locat(code){
      let res=await this.$http.post("/sp_plug/update_plug_p_des_locat",{
        p_code:code,
        p_des_locat:this.p_des_locat,
      })
      if(res.data.ok==true){this.isEditing=!this.isEditing}},
    async update_plug_p_name(code){
      let res=await this.$http.post("/sp_plug/update_plug_p_name",{
        p_code:code,
        p_name:this.p_name,
      })
      if(res.data.ok==true){this.isEditing=!this.isEditing}
    },
    async load_plug(){
      // console.log(this.p_code)
      let res=await this.$http.post("/sp_plug/list_sp_plug_2",{
        u_id:this.u_id,
        p_code:this.p_code
      })
      // console.log(res.data)
      this.plug=res.data.datas[0]
      // console.log(this.plug)
      // this.plg_des=res.data.datas

    },
    async plug_del(code){
     
      let res=await this.$http.post('/sp_plug/plug_del/',{
        p_code:code,
      })
      if(res.data.ok==true){
        this.conf_del=false
        // console.log("del ok")
        this.sh_plugs()
      }
      else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}

    },
    sh_plugs(){
      this.$router.push({name:"plug-shplugs"})
    },
    async load_sp_plug(){
      let res=await this.$http.get('/sp_plug/sp_plug')
      // console.log(res.data.datas)
      this.plug=res.data.datas
    },
    async btn_click(code,st,idx){

          if (this.plug.code === code && idx == 0 && st == 0){
            this.client.publish('op-' + this.plug.code, '0=1')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"เปิดช่องที่ 1",
              u_id:this.u_id,
            })
            this.load_log()
          }
          else if(this.plug.code === code && idx == 0 && st == 1){
            this.client.publish('op-' + this.plug.code, '0=0')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"ปิดช่องที่ 1",
              u_id:this.u_id,
            })
            this.load_log()
          }

          if(this.plug.code === code && idx == 1 && st == 0){
            this.client.publish('op-' + this.plug.code, '1=1')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"เปิดช่องที่ 2",
              u_id:this.u_id,
            })
            this.load_log()
          }
          else if(this.plug.code === code && idx == 1 && st == 1){
            this.client.publish('op-' + this.plug.code, '1=0')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"ปิดช่องที่ 2",
              u_id:this.u_id,
            })
            this.load_log()
          }
              
          if(this.plug.code === code && idx == 2 && st == 0){
            this.client.publish('op-' + this.plug.code, '2=1')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"เปิดช่องที่ 3",
              u_id:this.u_id,
            })
            this.load_log()
          }
          else if(this.plug.code === code && idx == 2 && st == 1){
            this.client.publish('op-' + this.plug.code, '2=0')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"ปิดช่องที่ 3",
              u_id:this.u_id,
            })
            this.load_log()
          }

          if(this.plug.code === code && idx == 3 && st == 0){
            this.client.publish('op-' + this.plug.code, '3=1')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"เปิดช่องที่ 4",
              u_id:this.u_id,
            })
            this.load_log()
          }
          else if(this.plug.code === code && idx == 3 && st == 1){
            this.client.publish('op-' + this.plug.code, '3=0')
            
            let res=await this.$http.post('/sp_plug/log/',{
              p_code:this.plug.code,
              l_unit:"ปิดช่องที่ 4",
              u_id:this.u_id,
            })
            this.load_log()
          }
        
      },
      async btn_close(code){    

            if(this.plug.code === code){
              for(let l = 0 ; l <= 3; l++){
              this.client.publish('op-' + this.plug.code, l+'=0')
              
              }
              let res=await this.$http.post('/sp_plug/log/',{
                p_code:this.plug.code,
                l_unit:"ปิดทั้งปลั๊ก",
                u_id:this.u_id,
              })
              this.load_log()
            }
           
      },
      async btn_open(code){    

            if(this.plug.code === code){
              for(let l = 0 ; l <= 3; l++){
              this.client.publish('op-' + this.plug.code, l+'=1')
              
              }
              let res=await this.$http.post('/sp_plug/log/',{
                p_code:this.plug.code,
                l_unit:"เปิดทั้งปลั๊ก",
                u_id:this.u_id,
              })
              this.load_log()
            }
           
      },


/////////////////////////////////////////////////////////////////////
    onMqttConnect() {
      console.log('onMqttConnect')
      console.log(this.plug)
      this.client.subscribe('status', err => err)
      
        this.client.publish('op-' + this.plug.code, 'status')
      
      console.log(this.client.publish('op-' + this.plug.code, 'status'))
    }, // onMqttConnect
////////////////////////////////////////////////////////////////////

    onMqttMessage(topic, message) {
      console.log(message)
      console.log('onMqttMessage')
      if (topic === 'status') {
        console.log('GOT:', message.toString())
        let msg = message.toString()
        let code = msg.substr(0,6 ) 
        let status = msg.substr(7, 4).split('') 
        console.log('code=', code, 'status', status)
        
          if (this.plug.code === code) {
            this.plug.status = status
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
