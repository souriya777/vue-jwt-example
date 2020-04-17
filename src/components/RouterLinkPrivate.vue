<template>
  <span v-if="loggedIn">
    | <router-link :to="to"><slot></slot></router-link>
  </span>
</template>
<script>
import { authComputed } from '@/store/helpers'
export default {
  props: ['to'],
  computed: {
    ...authComputed
  }
}
</script>
