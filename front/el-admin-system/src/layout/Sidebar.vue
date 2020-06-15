<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
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
export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  methods: {

  }
}
</script>

<style>
</style>
