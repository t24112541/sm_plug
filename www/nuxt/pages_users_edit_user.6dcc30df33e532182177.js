webpackJsonp([5],{Dgns:function(e,t,a){"use strict";var s=a("Xxa5"),r=a.n(s),n=a("exGp"),u=a.n(n);t.a={layout:"non",data:function(){return{u_fullname:"",u_username:"",u_password:"",u_con_password:"",u_tel:"",u_type:"",danger:"",type_api:"",alt_txt:"",alt:!1,rules:{required:function(e){return!!e||"ห้ามว่าง."},counter:function(e){return e.length<=10||"เต็ม 10 ตัวอักษร"}},u_id:this.$route.query.u_id,conf_del:!1}},created:function(){this.load_user()},watch:{u_con_password:function(e){e!=this.u_password?this.alt=!0:this.alt=!1}},methods:{logout:function(){sessionStorage.removeItem("u_id"),sessionStorage.removeItem("u_fullname"),sessionStorage.removeItem("u_username"),sessionStorage.removeItem("u_password"),sessionStorage.removeItem("u_type"),this.$router.replace({name:"index"})},load_user:function(){var e=u()(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("sp_user/sh_user/"+this.u_id);case 2:t=e.sent,console.log(t.data),1==t.data.ok&&(this.u_fullname=t.data.user.u_fullname,this.u_username=t.data.user.u_username,this.u_password=t.data.user.u_password,this.u_tel=t.data.user.u_tel);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),user_update:function(){var e=u()(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""==this.u_fullname||""==this.u_username||""==this.u_password||""==this.u_tel||this.u_con_password!=this.u_password){e.next=7;break}return e.next=3,this.$http.post("sp_user/user_update",{u_fullname:this.u_fullname,u_username:this.u_username,u_password:this.u_password,u_tel:this.u_tel,u_id:this.u_id});case 3:1==(t=e.sent).data.ok?(this.danger=!0,this.alt_txt=t.data.txt,this.type_api=t.data.alt,this.conf_del=!0):(this.danger=!0,this.alt_txt=t.data.txt,this.type_api=t.data.alt),e.next=8;break;case 7:this.danger=!0,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error";case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),user:function(){this.$router.push({name:"plug-shplugs"})}}}},SrK9:function(e,t,a){"use strict";var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{on:{keypress:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.user_update()}}},[a("v-card-title",{staticClass:"grey lighten-4 py-4 title"},[e._v("\n      แก้ไขข้อมูลผู้ใช้\n      "),a("v-spacer")],1),a("v-container",{staticClass:"pa-4",attrs:{"grid-list-sm":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-text-field",{attrs:{rules:[e.rules.required],counter:"","prepend-icon":"far fa-file-alt fa-2x",placeholder:"ชื่อ นามสกุล"},model:{value:e.u_fullname,callback:function(t){e.u_fullname=t},expression:"u_fullname"}})],1)],1),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-text-field",{attrs:{rules:[e.rules.required],maxlength:"10",counter:"",placeholder:"เบอร์โทรศัพท์","prepend-icon":"fas fa-phone"},model:{value:e.u_tel,callback:function(t){e.u_tel=t},expression:"u_tel"}})],1)],1),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-text-field",{attrs:{rules:[e.rules.required],maxlength:"50",counter:"",placeholder:"Username","prepend-icon":"fas fa-user"},model:{value:e.u_username,callback:function(t){e.u_username=t},expression:"u_username"}})],1)],1),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-text-field",{attrs:{type:e.show1?"text":"password",rules:[e.rules.required],maxlength:"50",counter:"",placeholder:"Password","prepend-icon":"fas fa-key"},model:{value:e.u_password,callback:function(t){e.u_password=t},expression:"u_password"}})],1)],1),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-text-field",{attrs:{type:e.show1?"text":"password",rules:[e.rules.required],maxlength:"50",counter:"",placeholder:"Confirm Password","prepend-icon":"fas fa-key"},model:{value:e.u_con_password,callback:function(t){e.u_con_password=t},expression:"u_con_password"}})],1)],1),a("v-alert",{attrs:{dismissible:"",type:e.type_api},model:{value:e.danger,callback:function(t){e.danger=t},expression:"danger"}},[e._v(e._s(e.alt_txt)+"\n        ")]),1==this.alt?a("v-flex",{staticStyle:{color:"red","margin-left":"30px"},attrs:{xs12:""}},[e._v("ยืนยันรหัสผ่านไม่ถูกต้อง !")]):e._e()],1)],1),a("v-card-actions",[a("v-btn",{attrs:{flat:"",color:"red lighten-2"},on:{click:function(t){e.user()}}},[a("i",{staticClass:"fas fa-arrow-circle-left fa-2x"})]),a("v-spacer"),a("v-btn",{staticClass:"white--text",attrs:{color:"green lighten-2"},on:{click:function(t){e.user_update()}}},[a("i",{staticClass:"fas fa-save fa-2x"}),e._v("  บันทึก")])],1),a("v-flex",{attrs:{xs2:""}},[a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.conf_del,callback:function(t){e.conf_del=t},expression:"conf_del"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("เตือน")]),a("v-card-text",[e._v("เมื่อแก้ไขข้อมูลควรเข้าสู่ระบบอีกครั้ง")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(t){e.logout()}}},[e._v("ตกลง")])],1)],1)],1)],1)],1)},staticRenderFns:[]};t.a=s},gPaz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dgns"),r=a("SrK9");var n=function(e){a("qVY6")},u=a("VU/8")(s.a,r.a,!1,n,null,null);t.default=u.exports},qVY6:function(e,t,a){var s=a("z00y");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("fbb537c0",s,!0,{sourceMap:!1})},z00y:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,".uploading-image{display:-webkit-box;display:-ms-flexbox;display:flex}",""])}});