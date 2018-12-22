
<template>
    <v-card @keypress.enter="user_update()"> 
       
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          แก้ไขข้อมูลผู้ใช้
          <v-spacer></v-spacer>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>

            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  
                  :rules="[rules.required]"
                  counter
                  prepend-icon="far fa-file-alt fa-2x"
                  placeholder="ชื่อ นามสกุล"
                  v-model="u_fullname"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  placeholder="เบอร์โทรศัพท์"
                  prepend-icon="fas fa-phone"

                  v-model="u_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  placeholder="Username"
                  prepend-icon="fas fa-user"

                  v-model="u_username"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :type="show1 ? 'text' : 'password'"
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  placeholder="Password"
                  prepend-icon="fas fa-key"

                  v-model="u_password"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :type="show1 ? 'text' : 'password'"
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  placeholder="Confirm Password"
                  prepend-icon="fas fa-key"
                  v-model="u_con_password"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-alert
              v-model="danger"
              dismissible
              :type="type_api"
            >{{alt_txt}}
            </v-alert>
            <v-flex xs12 style="color:red;margin-left:30px" v-if="this.alt==true">ยืนยันรหัสผ่านไม่ถูกต้อง !</v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="user()"> <i class="fas fa-arrow-circle-left fa-2x"></i> </v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="green lighten-2" class="white--text" @click="user_update()"><i class="fas fa-save fa-2x"></i>&nbsp; บันทึก</v-btn>

        </v-card-actions>
        <v-flex xs2 >
          <v-dialog v-model="conf_del" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">เตือน</v-card-title>
              <v-card-text>เมื่อแก้ไขข้อมูลควรเข้าสู่ระบบอีกครั้ง</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="logout()">ตกลง</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
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
                u_fullname:"",
                u_username:"",
                u_password:"",
                u_con_password:"",
                u_tel:"",
                u_type:"",
                danger:"",
                type_api:"",
                alt_txt:"",
                alt:false,
                rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
                },
                u_id:this.$route.query.u_id,

                conf_del:false,
            } 
        },
        created(){
            this.load_user()
        },
        watch:{
          u_con_password(newValue){
            if(newValue!=this.u_password){this.alt=true}else{this.alt=false}
          }
        },
        methods:{
            logout(){
                sessionStorage.removeItem('u_id');
                sessionStorage.removeItem('u_fullname');
                sessionStorage.removeItem('u_username');
                sessionStorage.removeItem('u_password');
                sessionStorage.removeItem('u_type');
                this.$router.replace({name: "index"})
            },
            async load_user(){
                let res=await this.$http.get("sp_user/sh_user/"+this.u_id)
                console.log(res.data)
                if(res.data.ok==true){
                    this.u_fullname=res.data.user.u_fullname
                    this.u_username=res.data.user.u_username
                    this.u_password=res.data.user.u_password
                    this.u_tel=res.data.user.u_tel
                }
            },
            async user_update(){
                if(this.u_fullname!='' && this.u_username!=''&& this.u_password!=''&&this.u_tel!='' && this.u_con_password==this.u_password){
                let res=await this.$http.post("sp_user/user_update",{
                    u_fullname:this.u_fullname,
                    u_username:this.u_username,
                    u_password:this.u_password,
                    u_tel:this.u_tel,
                    u_id:this.u_id,
                })
                if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                    this.conf_del=true
                }
                else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
                }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
            },
            user(){
                this.$router.push({name:"plug-shplugs"})
            },

        }
    }
</script>