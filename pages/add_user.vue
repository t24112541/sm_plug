
<template>
    <v-card @keypress.enter="user_add()"> 
       
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          ลงทะเบียนใช้งาน Smart Plug
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
              :type=type_api
            >{{alt_txt}}
            </v-alert>
            <v-flex xs12 style="color:red;margin-left:30px" v-if="this.alt==true">ยืนยันรหัสผ่านไม่ถูกต้อง !</v-flex>
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="user()"> <i class="fas fa-arrow-circle-left fa-2x"></i> </v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="green lighten-2" class="white--text" @click="user_add()"><i class="fas fa-save fa-2x"></i>&nbsp; ลงทะเบียน</v-btn>

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
                u_fullname:"",
                u_username:"",
                u_password:"",
                u_con_password:"",
                danger:"",
                type_api:"",
                alt_txt:"",
                alt:false,
                rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
                },
            } 
        },
        watch:{
          u_con_password(newValue){
            if(newValue!=this.u_password){this.alt=true}else{this.alt=false}
          }
        },
        methods:{
           async user_add(){
            // if(this.u_fullname!='' && this.u_username!=''&& this.u_password!=''&&this.u_tel!='' && this.u_con_password==this.u_password){
              let res=await this.$http.post("sp_user/user_add",{
                u_fullname:this.u_fullname,
                u_username:this.u_username,
                u_password:this.u_password,
                u_tel:this.u_tel,

              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
              this.user()}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            // }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          async test(){
            // if(this.u_fullname!='' && this.u_username!=''&& this.u_password!=''&&this.u_tel!='' && this.u_con_password==this.u_password){
              let res=await this.$http.get("sp_user/un_test")
          },
          user(){
            this.$router.push({name:""})
          },

        }
    }
</script>