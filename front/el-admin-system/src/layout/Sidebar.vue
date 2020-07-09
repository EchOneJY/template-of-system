<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        router
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './components/SidebarItem'
import variables from '@/styles/_variables.scss'
export default {
  components: {
    SidebarItem
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    isCollapse() {
      return !this.sidebar.collapse
    },
    variables() {
      return variables
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
