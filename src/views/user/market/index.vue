<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">市级代理商管理</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchInput" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom" @click="getList(1)">搜索</div>
      </div>
    </div>
    <div class="user">
      <div class="user-number">市级代理商总数:{{ merchants }}个</div>
      <el-row class="user-head" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox />
        </el-col> -->
        <el-col :span="2">ID</el-col>
        <el-col :span="3">公司名称</el-col>
        <el-col :span="3">所属省代</el-col>
        <el-col :span="4">下属设备</el-col>
        <el-col :span="4">下属网点</el-col>
        <el-col :span="4">注册时间</el-col>
        <el-col :span="3">状态</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
      <el-row v-for="(item,index) in list" :key="index" class="user-body" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox />
        </el-col> -->
        <el-col :span="2">{{ item.id }}</el-col>
        <el-col :span="3">{{ item.name }}</el-col>
        <el-col :span="3">{{ item.fid }}</el-col>
        <el-col :span="4">{{ item.comcount||0 }}</el-col>
        <el-col :span="4">{{ item.bcount }}</el-col>
        <el-col :span="4" class="user-body-time">{{ item.created_at }}</el-col>
        <el-col :span="3" class="user-body-identity">
          <div v-if="item.enable=='0'">启用</div>
          <div v-if="item.enable=='1'" style="color:red">禁用</div>
        </el-col>
        <el-col :span="4" class="user-body-operating">
          <svg-icon icon-class="jinzhi" @click="MunicipalStatus(item.id,item.enable)" />
          <svg-icon icon-class="hb" @click="goDetails(item.id)" />
          <svg-icon icon-class="ljt" @click="confirmDeletion(item.id)" />
        </el-col>
      </el-row>
    </div>
    <div class="edit">
      <!-- <div class="edit-detele">批量删除</div> -->
      <!-- <div class="addEquipment " @click="Add">新增市级代理商</div> -->
      <div class="edit-detele" style="cursor:pointer" @click="Add">新增市级代理商</div>

    </div>
    <!-- 分页 -->
    <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          background
          hide-on-single-page
          :current-page.sync="newpage"
          @current-change="getList"
        />
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否确定删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Udelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
    getMunicipalAgent, // 市代管理员
    setMunicipalStatus, // 状态修改
    getMunicipalAgentDel, // 删除市代理商
} from '@/api/user.js'
export default {
    data() {
        return {
            merchants: 0, // 市级代理商总数
            total: 0, // 当前列表总条数
            list: [], // 市级列表
            dialogVisible: false, // 删除询问框的是否显示
            newpage: 1, // 当前显示的分页
            id: '',
            searchInput: '', // 搜索
            status: '',
            aid:'',// 操作员ID

        }
    },
    created() {
        this.getList(1)
    },
    methods: {
    // 跳转
        goDetails(id) {
            this.$router.push({ path: '/user/market/particulars', query: { id: id }})
        },
        // 添加市代理
        Add(id) {
            this.$router.push({ path: '/user/market/AddAgent', query: { id: id }})
        },
        // 获取市代列表
        getList(pages) {
            getMunicipalAgent({'name':this.searchInput, 'pages': pages }).then(res => {
                this.list = res.result.model
                this.merchants = res.result.count
                this.total = res.result.count - 0
            })
        },
        // 状态
        MunicipalStatus(id, enable, aid) {
            if (enable === '0') {
                this.status = '1'
            }
            if (enable === '1') {
                this.status = '0'
            }
            setMunicipalStatus({ 'id': id, 'enable': this.status, 'aid': sessionStorage.getItem('admin_id') }).then(res => {
                if (this.status === '0') {
                    this.$message({
                        message: '已启用',
                        type: 'success'
                    })
                }
                if (this.status === '1') {
                    this.$message({
                        message: '已禁用',
                        type: 'success'
                    })
                }
                this.getList(1)
            })
        },
        // 删除市代理商
        Udelete() {
            getMunicipalAgentDel({ 'aid':this.aid , 'id': this.id }).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getList(1)
            })
            this.dialogVisible = false
        },
        // 删除询问框的显示
        confirmDeletion(id) {
            this.dialogVisible = true
            this.id = id
        }
    }
}
</script>
<style lang="scss">
.el-checkbox__inner {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-checkbox__inner::after {
  height: 17px;
  left: 11px;
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 15px 20px;
    min-height: calc(100vh - 90px);
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
  }
  &-management {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &-search {
      display: flex;
      align-items: center;
      &-input {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        background-color: white;
        border-radius: 25px;
        font-size: 35px;
        color: #b1b1b1;
        input {
          width: 200px;
          border: 0;
          outline: none;
          font-size: 16px;
          margin-left: 5px;
        }
      }
      &-buttom {
        background-color: #2CA9FC;
        color: white;
        padding: 8px 15px;
        border-radius: 2px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 240px);
  &-number {
    display: flex;
    justify-content: flex-end;
    position: relative;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
  }
  &-head {
    margin-bottom: -1px;
    border: 1px solid rgba(203, 203, 203, 1);
    padding: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  &-body {
    margin-bottom: -1px;
    border: 1px solid rgba(203, 203, 203, 1);
    padding: 20px;
    text-align: center;
    font-size: 16px;
    &-operating {
      font-size: 30px;
      color: black;
      svg {
        cursor: pointer;
      }
    }
    &-identity {
      color: #0b7767;
    }
    &-time {
      color: #707070;
    }
    &-character {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-ava {
      border-radius: 50%;
      width: 55px;
      height: 55px;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-text {
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 80px;
    }
  }
  &-head:hover,
  &-body:hover {
    box-shadow: 0 0 4px 0 rgba(62, 206, 185, 1);
  }
}
.edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  &-detele {
    padding: 12px 20px;
    background-color: #2CA9FC;
    color: white;
    font-size: 25px;
  }
}
.addEquipment{
    padding: 12px 20px;
    background-color: #2CA9FC;
    color: white;
    font-size: 25px;
    margin-left: -800px;
}
.el-pagination{
    position: static;
}
</style>
