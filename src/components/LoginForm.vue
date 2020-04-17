<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="row">
        <label for="name">Email:</label>
        <input class="email" v-model="email" type="email" name="email" />
      </div>
      <div class="row">
        <label for="name">Password:</label>
        <input
          class="password"
          v-model="password"
          type="password"
          name="new-password"
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'private-page' })
        })
    }
  }
}
</script>
<style lang="stylus">
.login-form
  .row
    display flex
    flex-direction column
    align-items: center;
    padding-bottom 10px
  .email, .password
    width 200px
</style>
