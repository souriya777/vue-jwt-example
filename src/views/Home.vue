<template>
  <div class="home">
    <h1>Welcome to the App</h1>
    <div v-if="!loggedIn">
      To use this app you'll need to
      <router-link to="/login">
        Login
      </router-link>
      or
      <router-link to="/register">
        Register
      </router-link>
    </div>
    <div v-else>
      <p>Welcome my friend {{ email }}</p>
      <logout-button />
    </div>
  </div>
</template>
<script>
import { authComputed } from '@/store/helpers'
import LogoutButton from '@/components/LogoutButton'

export default {
  components: { LogoutButton },
  data() {
    return {
      email: this.$store.state?.user?.email
    }
  },
  computed: {
    ...authComputed
  }
}
</script>
