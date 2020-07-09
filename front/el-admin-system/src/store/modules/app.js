import Cookies from 'js-cookie'
const state = {
  sidebar: {
    collapse: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true
  }
}

const mutations = {
  TOGGLE_COLLAPSE: (state) => {
    state.sidebar.collapse = !state.sidebar.collapse
    Cookies.set('sidebarStatus', state.sidebar.collapse ? 1 : 0)
  }
}

const actions = {
  toggleCollapse: ({ commit }) => {
    commit('TOGGLE_COLLAPSE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
