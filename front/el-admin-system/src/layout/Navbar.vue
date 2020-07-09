<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="sidebar.collapse" @toggleClick="toggleCollapse" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper"><el-avatar shape="square" :size="50" :src="avatarUrl" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu></el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from './components/Hamburger'
import Breadcrumb from './components/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {
      avatarUrl: require('../assets/logo.png')
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toggleCollapse() {
      this.$store.dispatch('app/toggleCollapse')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>
