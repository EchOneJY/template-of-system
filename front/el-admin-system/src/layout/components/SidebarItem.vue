<template>
  <div v-if="!item.hidden">
    <template v-if="isSingleMenu(item.children,item)&&!item.alwaysShow">
      <el-menu-item :index="resolvePath(singleMenu.path)">
        <svg-icon v-if="singleMenu.meta&&singleMenu.meta.icon" :icon-class="singleMenu.meta.icon" />
        <span slot="title">{{ singleMenu.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.singleMenu = null
    return {
      // singleMenu: null
    }
  },
  methods: {
    isSingleMenu(children = [], parent) {
      const showChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.singleMenu = item
          return true
        }
      })

      if (showChildren.length === 1) {
        return true
      }
      if (showChildren.length === 0) {
        this.singleMenu = { ...parent, path: '' }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>

</style>
