<template>
  <div class="top">
    <el-row>
      <el-col :span="12">
        <div class="top-left">
          <i class="el-icon-menu"></i>
          华联超市管理系统
        </div>
      </el-col>
      <el-col :span="12">
        <div class="top-right">
          <el-col :span="18">欢迎您!
            <el-dropdown @command="handleCommand">
              <!-- 名字 -->
              <span class="username el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">
            <div class="avatar">
              <img width="100%" height="100%" :src="avatarUrl" alt="">
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '122',
      avatarUrl: "http://127.0.0.1:8080/timg.jpg"
    };
  },
  created(){
      console.log(window.localStorage.getItem('token'))
      this.username=window.localStorage.getItem('username')
  },
  methods:{
      handleCommand(command){
          if(command ==='personal'){
              this.$router.push('/personal')
          }
          else if(command==='logout'){
              window.localStorage.removeItem('token');
              this.$message({
                  type:"info",
                  message:"退出成功"
              })
              this.$router.push('/login')
          }
      }
  }
};
</script>

<style lang="less">
.top {
        // background-color: red;
        border-bottom: 2px solid green;
        .top-left {
            text-align: left;
            font-size: 20px;
            font-weight: 900;
        }
        .top-right {
            color: #2d3a4b;
            text-align: right;
            .username {
               font-weight: 600;
            }
            .avatar {
                width: 52px;
                height: 52px;
                margin-top: 4px;
                margin-left: 30px;
                border-radius: 50%;
                img {
                    border-radius: 50%;
                }
            }
        }
    }
</style>
