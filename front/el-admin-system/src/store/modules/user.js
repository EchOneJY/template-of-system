import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  role: ''
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_ROLE(state, role) {
    state.role = role
  }
}

const actions = {
  login: async({ commit }, data) => {
    const res = await request.post('/user/login', data)
    const { token } = res.data
    commit('SET_TOKEN', token)
    setToken(token)
    return Promise.resolve(true)
  },

  getInfo: async({ commit }) => {
    const res = await request.get('/user/info')
    const { role, name } = res.data
    commit('SET_ROLE', role)
    commit('SET_NAME', name)
    return Promise.resolve({ role, name })
  },

  // remove token
  resetToken: async({ commit }) => {
    commit('SET_TOKEN', '')
    commit('SET_ROLE', '')
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
