<template>
  <div class="usermanage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户管理</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-table
        ref="multipleTable"
        :data="accountdata"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="账号" width="180"></el-table-column>
        <el-table-column prop="usergroup" label="用户组" width="180"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="180">
          <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div style="margin-top: 20px; text-align: left;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 批量删除按钮 & 取消选择按钮 -->
      <div style="margin-top: 20px; text-align: left;">
        <el-button @click="batchDelete">批量删除</el-button>
        <el-button @click="cancelSelect()">取消选择</el-button>
      </div>

      <!-- 修改的弹出模态框 -->
      <el-dialog title="账号修改" width="400px" :visible.sync="flag">
        <!-- 回填表单 -->
        <el-form :model="editForm" label-width="60px">
          <!-- 账号 -->
          <el-form-item label="账号" prop="username">
            <el-input
              style="width: 217px;"
              type="text"
              v-model="editForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 选中用户组 -->
          <el-form-item label="用户组" prop="usergroup">
            <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="高级管理员" value="高级管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 表单的尾部 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import qs from 'qs'
export default {
  data() {
    return {
      accountdata: [
        { username: "o" },
        { username: "o" },
        { username: "o" },
        { username: "o" }
      ],
      currentPage: 1,//当前页
      total: 11, //总共数据条数
      editForm: {
        username: "",
        usergroup:""
      },
      editid:"",
      flag:false,
      pageSize:3,//每页条数
      selectionaccount:[],
    };
  },
  //生命周期函数,一进入组件自动触发
  created() {
    this.getuserlist();
  },
  methods: {
    //选中所有单选
    handleSelectionChange(val) {
      this.selectionaccount = val;
    },
    //单页列表
    getuserlist() {
        let pagesize = this.pageSize;
        let currentpage = this.currentPage;
        this.axios.get('http://127.0.0.1:664/account/accountlist',{params:{pagesize,currentpage}})
        .then(response=>{
            let {all,data}=response.data;
            this.accountdata=data;
            this.total=all;
            console.log(data)
            //判断返回总数据的长度和页面不为第一页
            if(!data.length&&this.currentPage!==1){
                this.currentPage-=1;
                this.getuserlist();
            }

        })
        .catch(err=>{
            console.log(err)
        })
    },
    handleSizeChange(val) {
      // 保存每页显示的条数
      this.pageSize = val;
      // 调用分页函数
      this.getuserlist();
    },
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getuserlist();
    },
    //点击批量删除
    batchDelete() {
      let selectid = this.selectionaccount.map(v=>v.id)
        // console.log(selectid)
      if(!selectid.length){
          this.$message.error('没有任何选中')
          return
      }else{
          this.axios.get('http://127.0.0.1:664/account/accountsedit',{params:{selectid}})
          .then(response=>{
              let {error_code,reason}=response.data;
              if(error_code=0){
                  this.$message({
                      type:'success',
                      message:reason,
                  })
              }else{
                  this.$message.error(reason)
              }
            this.getuserlist();
          })
          .catch(err=>{
              console.log(err)
          })
      }
    },
    //点击取消所有选中
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    //编辑按键触发
    handleEdit(id){
        this.editid = id;
        this.axios.get('http://127.0.0.1:664/account/accountedit',{params:{id}})
        .then(
            response=>{
                console.log(response.data)
                let edit = response.data[0];
                this.editForm.username=edit.username;
                this.editForm.usergroup=edit.usergroup;
                this.flag=true;
            }
        )
        .catch(err=>{
            console.log(err)
        })

    },
    //按键删除
    handleDelete(id){
        console.log(id)
       this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
          this.axios.get(`http://127.0.0.1:664/account/accountdelet?id=${id}`)
          .then(response=>{
              let{error_code,reason}=response.data;
              if(error_code===0){
                  this.$message({
                      type:'success',
                      message:reason
                  })
              }else{
                  this.$message.error(reason);
              };
              this.getuserlist();
          })
          .catch(err=>{
              console.log(err)
          })
      })
      .catch(()=>{
          this.$message({
              type:'info',
              message:'已取消删除'
          })
      })
    },
    //确定保存改变的按键
    saveEdit(){
        let params ={
            username:this.editForm.username,
            usergroup:this.editForm.usergroup,
            editid:this.editid
        }
        this.axios.post('http://127.0.0.1:664/account/accountedit',qs.stringify(params))
        .then(response=>{
            let {error_code,reason} = response.data;
            if(error_code===0){
                this.$message({
                    type:'success',
                    message:reason
                });
            }else{
                this.$message({
                    type:'info',
                    message:reason
                })
            }
            this.getuserlist();
            this.flag=false;
        })
        .catch()
    },
    
  },
  filters:{
      filterCtime(ctime){
          return moment(ctime).format("YYYY.MM.DD HH点mm分ss");
      }
  }
};
</script>

<style lang="less">
.el-card {
  .el-card__header {
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    background-color: #f1f1f1;
    .el-button {
    }
  }
}
</style>