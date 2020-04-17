<template>
  <div class="register-form">
    <form @submit.prevent="register">
      <div v-if="error" class="error">
        {{ errorMsg }}
      </div>
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
        <button type="submit">Register</button>
      </div>
      <router-link to="/login">
        Already have an account? Login.
      </router-link>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: '',
      email: '',
      password: ''
    }
  },
  computed: {
    errorMsg() {
      return this.error === 409 ? 'Already exist email' : null
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          const error = this.$store.state.error
          if (!error) {
            this.$router.push({ name: 'private-page' })
          } else {
            this.error = error
          }
        })
    }
  }
}
</script>
<style lang="stylus">
.register-form
  .row
    display flex
    flex-direction column
    align-items: center;
    padding-bottom 10px
  .email, .password
    width 200px
  .error
    margin-bottom 10px
    font-size 12px
    color red
</style>
