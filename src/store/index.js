import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`
    },
    SET_ERROR(state, errorStatus) {
      state.error = errorStatus
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    async register({ commit }, credentials) {
      const endpoint = `//localhost:3000/register`

      await axios
        .post(endpoint, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
          commit('SET_ERROR', null)
        })
        .catch((error) => commit('SET_ERROR', error.response.status))
    },
    async login({ commit }, credentials) {
      const endpoint = `//localhost:3000/login`

      await axios
        .post(endpoint, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
          commit('SET_ERROR', null)
        })
        .catch((error) => commit('SET_ERROR', error.response.status))
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA', null)
    }
  },
  modules: {}
})
