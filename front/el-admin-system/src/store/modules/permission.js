import { asyncRoutes, constantRoutes } from '@/router'
import { queryAsyncRoutesName } from '@/api'

const filterAsyncRoutes = async(routes, roles, asyncRoutesName) => {
  const matchRoutes = []
  routes.forEach(route => {
    if (asyncRoutesName.includes(route.name)) {
      matchRoutes.push(route)
    }
    if (route.children) {
      filterAsyncRoutes(route.children, roles, asyncRoutesName)
    }
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes: async({ commit }, roles) => {
    try {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        const asyncRoutesName = await queryAsyncRoutesName(roles)
        if (asyncRoutesName && asyncRoutesName.length) {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, asyncRoutesName)
        } else {
          accessedRoutes = []
        }
      }
      commit('SET_ROUTES', accessedRoutes)
      return Promise.resolve(accessedRoutes)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
