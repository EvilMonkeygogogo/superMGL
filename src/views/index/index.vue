<template>
  <!-- <div class="index"> -->
  <!-- 内容容器 -->
  <el-container>
    <!-- 左侧 -->
    <el-aside width="200px">
      <!-- 自定义导航组件 -->
      <Nav></Nav>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <!-- 右侧头部 -->
      <el-header>Header</el-header>

      <!-- 右侧中间 -->
      <el-main>
        <!-- 路由出口 -->
        <router-view/>
      </el-main>

      <!-- 右侧尾部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import Nav from "@/components/Nav/Nav.vue";
export default {
  components: {
    Nav
  }
};
</script>

<style lang="less">
.el-container {
  height: 100%;
  // 左侧
  .el-aside {
    background-color: #2d3a4b;
    text-align: center;
  }
  // 右侧中间
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }
  // 右侧头和尾
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
}
</style>
