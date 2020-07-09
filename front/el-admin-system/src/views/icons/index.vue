<template>
  <div class="icons-container">
    <el-divider content-position="left">svg图标，点击可复制svg</el-divider>
    <el-row :gutter="15">
      <el-col
        v-for="(svg,index) in svgIcons"
        :key="index"
        :xs="6"
        :sm="8"
        :md="3"
        :lg="2"
        :xl="2"
      >
        <el-card shadow="hover">
          <svg-icon :icon-class="svg" />
        </el-card>
        <div class="icon-text">{{ svg }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import svgIcons from './svg-icons'

export default {
  data() {
    return {
      svgIcons
    }
  },
  created() {
    console.log(this.svgIcons)
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  padding: 30px;
  ::v-deep {
    .el-card {
      cursor: pointer;
    }
    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */

      svg:not(:root).svg-icon {
        font-size: 30px;
        font-weight: bold;
        color: $base-color-gray;
        text-align: center;
        vertical-align: middle;
        pointer-events: none;
        cursor: pointer;
      }
    }
  }

  .icon-text {
    height: 30px;
    // margin-top: -15px;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
