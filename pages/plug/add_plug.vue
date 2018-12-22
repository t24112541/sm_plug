
<template>
    <v-card @keypress.enter="plug_add()">
       
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          เพิ่ม Smart Plug
          <v-spacer></v-spacer>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <i style="color:#757575" class="far fa-file-alt fa-2x"></i>
                <select  v-model="pt_id" class="form-control  minimal padding-top-mn" placeholder="ประเภทปลั๊ก" aria-label="ประเภทปลั๊ก">
                  <option disabled  >ประเภทปลั๊ก</option>
                  <option v-for="plg in sp_plug_type" v-bind:value="plg.pt_id" v-bind:key="plg.pt_id">
                    {{ plg.pt_name }}
                  </option>
                </select>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  counter
                   maxlength="50"
                  prepend-icon="far fa-file-alt fa-2x"
                  label="Serial Number"
                  placeholder="Serial Number"
                  v-model="p_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  prepend-icon="far fa-file-alt fa-2x"
                  label="ชื่อปลั๊ก"
                  placeholder="ตั้งชื่อให้ปลั๊ก"
                  v-model="p_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            
            <v-flex xs12 >
              <v-layout align-center>
                <v-textarea
                    prepend-icon="far fa-file-alt fa-2x"
                    name="input-7-1"
                    label="คำอธิบาย"
                    placeholder="อธิบายเกี่ยวกับตำแหน่งการวางปลั๊ก หรือ ลักษณะของปลั๊ก"
                    v-model="p_des_locat"
                ></v-textarea>
              </v-layout>
            </v-flex>
         
            <v-alert
                v-model="danger"
                dismissible
                :type=type_api
            >{{alt_txt}}
            </v-alert>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="plug()"> <i class="fas fa-arrow-circle-left fa-2x"></i> </v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="green lighten-2" class="white--text" @click="plug_add()"><i class="fas fa-save fa-2x"></i>&nbsp; บันทึก</v-btn>

        </v-card-actions>
        
    </v-card>
</template>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
 
<script>
    export default {
        layout: 'non',
        data () {
            return {
                sp_plug_type:"",
                p_code:"",
                p_name:"",
                p_des_locat:"",
                pt_id:"",
                pt_port_count:"",
                u_id:sessionStorage.getItem('u_id'),

                danger:"",
                type_api:"",
                alt_txt:"",
                alt:false,
                rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                },
            } 
        },
        async created(){
          this.load_sp_plug_type()
        },
        methods:{
           async plug_add(){
                if(this.p_code!='' || this.u_id!=""){
                let res=await this.$http.post("sp_plug/plug_add",{
                    p_code:this.p_code,
                    p_name:this.p_name,
                    p_des_locat:this.p_des_locat,
                    pt_id:this.pt_id,
                    u_id:this.u_id,
                })
                if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                this.plug()}
                else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
                }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
            },
            async load_sp_plug_type(){
              let res=await this.$http.get('/sp_plug/sp_plug_type')
              // console.log(res.data.datas)
              this.sp_plug_type=res.data.datas
            },
          plug(){
            this.$router.push({name:"plug-shplugs"})
          },

        }
    }
</script>