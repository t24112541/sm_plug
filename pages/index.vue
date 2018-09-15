<template>
  <v-container class="login-page pa-5">
    <v-form v-model="valid" class="login-form">
      <v-text-field
        v-model="user"
        label="Username"
        required
        prepend-icon="face"
        :disabled="lock"
      />
      <v-text-field
        v-model="pass"
        type="password"
        label="Password"
        required
        prepend-icon="vpn_key"
        :disabled="lock"
      />
      <div class="d-flex justify-center">
        <v-btn @click="doLogin" class="login-btn" light :disabled="lock">Login</v-btn>
      </div>
    </v-form>
    <div v-if="lock" class="screen-lock">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        class="busy-lock"
      />
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      lock: false,
      valid: false,
      user: '',
      pass: '',
    }
  }, // data

  methods: {
    doLogin() {
      this.lock = true
      setTimeout(() => {
        this.$router.replace('/wecan')
      }, 1000)
    }, // doLogin
  }, // methods
}
</script>
<style lang="scss">
.login-page {
  .login-form {
    margin-top: 96px;
    .primary--text {
      color: #eee !important;
    }
    .login-btn {
      max-width: 144px;
      border-radius: 20px;
      height: 44px;
      color: #034EA1;
    }
  }
  .screen-lock {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
