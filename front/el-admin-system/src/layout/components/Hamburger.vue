<template>
  <div class="hamburger-box" @click="toggleClick">
    <svg class="hamburger" :class="{'is-active': isActive}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path d="M408 442h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8z m-8 204a8 8 0 0 0 8 8h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56z m504-486H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8z m0 632H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zM142.4 642.1L298.7 519a8.8 8.8 0 0 0 0-13.9L142.4 381.9a8.9 8.9 0 0 0-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" p-id="5621" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-box {
  padding: 0 15px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    &.is-active {
      transform: rotate(180deg);
    }
   }
}
</style>
