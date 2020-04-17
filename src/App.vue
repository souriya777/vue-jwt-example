<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link-private to="/private-page">Private Page</router-link-private>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
import RouterLinkPrivate from '@/components/RouterLinkPrivate'

export default {
  components: { RouterLinkPrivate }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

.content
  height 80vh
  display flex
  justify-content center
  align-items center
</style>
