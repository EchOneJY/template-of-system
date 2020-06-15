import { asyncRoutes, constantRoutes } from '@/router'
import { queryAsyncRoutesName } from '@/api'

function filterAsyncRoutes(routes, asyncRoutesName) {
  const matchRoutes = []
  routes.forEach(route => {
    if (asyncRoutesName.includes(route.name)) {
      matchRoutes.push(route)
    } else if (route.children) {
      route.children = filterAsyncRoutes(route.children, asyncRoutesName)
      if (route.children.length) {
        matchRoutes.push(route)
      }
    }
  })
  // console.log(matchRoutes)
  return matchRoutes
}

// function isChildHasRoute(route,asyncRoutesName) {
//   const tmp = {...route}
//   if(asyncRoutesName.includes(tmp.name)) {
//     return tmp
//   }else {
//     if(tmp.children) {
//       tmp.children = isChildHasRoute(tmp.children,asyncRoutesName)
//     }
//   }
// }

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
  generateRoutes: async({ commit }, role) => {
    try {
      let accessedRoutes
      if (role === 'admin') {
        accessedRoutes = asyncRoutes || []
      } else {
        const res = await queryAsyncRoutesName(role)
        const asyncRoutesName = res.data
        if (asyncRoutesName && asyncRoutesName.length) {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, asyncRoutesName)
          // console.log(accessedRoutes)
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

