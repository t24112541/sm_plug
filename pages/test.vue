<template>
  <div>
    <button @click="btn_Open_All" class="btn_all" >เปิดทั้งหมดทุกปลั๊ก</button>&nbsp;
    <button @click="btn_Close_All" class="btn_all">ปิดทั้งหมดทุกปลั๊ก</button>
    
  
    <div v-for="(item,seq) in plug" :key="item.code" class="plug">
       &nbsp;&nbsp;{{ item.name }}--{{ item.code }}
       
      <button @click="btn_open(item.code,seq)" class="btn_all">เปิดทุกดวง</button>&nbsp;
      <button @click="btn_close(item.code,seq)" class="btn_all">ปิดทุกดวง</button>
      
      <div class="status">
        
        <div class="relay" v-for="(st,idx) in item.status" :key="idx">
             
          <div>{{ st }}</div>
          <div><button @click="btn_click(item.code,st,idx)">{{ st === '0' ? 'เปิดไฟ' : (st === '1' ? 'ปิดไฟ' : '') }}</button></div>
        
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
const mqtt = require('mqtt')

export default {
  data() {
    return {
      plug: [
        { code: '84D8E1766FC', name: 'PopKung', loc: '', status: [-1, -1, -1, -1] },
        { code: '84D8E176994', name: 'NiceKung', loc: '', status: [-1, -1, -1, -1] },
        //  { code: '0003', name: 'Plug3', loc: '', status: [-1, -1, -1, -1] },
        // { code: '0004', name: 'Plug4', loc: '', status: [-1, -1, -1, -1] },
        // { code: '0005', name: 'Plug5', loc: '', status: [-1, -1, -1, -1] },
      ],
      
    }
  }, // data

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
<style>
body{
  background-color: #F8F8FF;
}
h1{
  color:#3300FF;
}
.btn_all{
  background-color:#0099FF;
  color: white;
  border-radius: 12px;
  padding: 3px 3px; }
</style>
