<template>
  <div class="account-update">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="text item">
        <!-- 添加账号表单 -->
        <el-form
          size="mini"
          :model="accountupdateForm"
          status-icon
          :rules="rules"
          ref="accountupdateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="accountupdateForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="text" v-model="accountupdateForm.checkPwd" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 登录按钮&重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('accountupdateForm')">修改</el-button>
            <el-button @click="resetForm('accountupdateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    // 自定义密码的验证
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("长度在 3 - 6 位"));
      } else {
        if (this.accountupdateForm.checkPwd !== "") {
          this.$refs.accountupdateForm.validateField("checkPwd");
        }
        callback();
      }
    };
    // 自定义确认密码的验证
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountupdateForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      accountupdateForm: {
        password: "",
        checkpwd: ""
      },
      rules:{
          // 密码
        password: [{ required: true, validator: pass, trigger: "blur" }],
        // 确认密码
        checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(val) {
      this.$refs[val].validate(valid=>{
          if(valid){
              let params = {
                  username:window.localStorage.getItem('username'),
                  oldpwd:window.localStorage.getItem('password'),
                  newpwd:this.accountupdateForm.password,
              }
              this.axios.post('http://127.0.0.1:664/account/updatepwd',qs.stringify(params))
              .then(response=>{
                  let {error_code,reason} = response.data;
                  if(error_code===0){
                      window.localStorage.removeItem('token')
                      this.$message({
                          type:'success',
                          message:reason
                      });
                      this.$router.push('/login')
                  }else{
                      this.$message.error(reason)
                  }
              })
              .catch(err=>{
                  console.log(err)
              })
          }else{
              return false
          }
      })
    },
    resetForm(val) {
      this.$refs[val].resetFields();
    }
  }
};
</script>

<style lang="less">
.account-update {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
        height: 400px;
        text-align: left;
      .el-form {
        width: 290px;
        
        .el-form-item {
            margin-bottom: 24px;
            //  background-color:red;
             height: 50px;
         .demo-ruleForm{
         }   
        }
      }
    }
  }
}
</style>
