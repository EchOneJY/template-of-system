<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { mapGetters } from 'vuex'
export default {
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    ...mapGetters(['sidebar']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.collapse,
        openSidebar: this.sidebar.collapse
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.navbar {
  height: 50px;
  border-bottom: 1px solid #e6e6e6;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.3s;
  z-index: 10;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.has-tags {
  .app-main {
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
