<template>
     <el-menu 
        background-color="#2d3a4b" 
        unique-opened
        active-text-color="rgb(64, 158, 255)"
        :default-active="this.$route.path"
        router
        >
        <!-- 导航一 -->
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item index="/">系统信息</el-menu-item>
                <el-menu-item index="/setting">系统配置</el-menu-item>
                <el-menu-item index="/rootg">权限管理</el-menu-item>
        </el-submenu>
        <!-- 导航二 -->
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>账号管理</template>
                <el-menu-item index="/usermanage">账号管理</el-menu-item>
                <el-menu-item index="/adduser">添加账号</el-menu-item>
                <el-menu-item index="/passup">密码修改</el-menu-item>
        </el-submenu>
        <!-- 导航三 -->
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/addgoods">添加商品</el-menu-item>
        </el-submenu>
        <!-- 导航四 -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-date"></i>统计管理</template>
                <el-menu-item index="/tongji">销售统计</el-menu-item>
        </el-submenu>
        <!-- 导航五 -->
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-goods"></i>分类管理</template>
                <el-menu-item index="/fenlei">分类管理</el-menu-item>
                <el-menu-item index="/addfenlei">添加分类</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {};
</script>

<style lang="less">
.el-menu {
  border: none;
  .el-submenu {
    .el-submenu__title {
      color: #fff;
    }
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>