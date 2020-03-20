<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">网点管理</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchInput" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom" @click="getList(1)">搜索</div>
      </div>
    </div>
    <div class="user">
      <div class="user-number">网点总数:{{ merchants }}个</div>
      <el-row class="user-head" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox size="medium" />
        </el-col> -->
        <el-col :span="2">ID</el-col>
        <el-col :span="3">联系人</el-col>
        <el-col :span="3">手机号</el-col>
        <el-col :span="4">网点名称</el-col>
        <el-col :span="4">注册时间</el-col>
        <el-col :span="3">状态</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
      <el-row v-for="(item,index) in list" :key="index" class="user-body" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox />
        </el-col> -->
        <el-col :span="2">{{ item.id }}</el-col>
        <el-col :span="3">{{ item.realname }}</el-col>
        <el-col :span="3">{{ item.phone }}</el-col>
        <el-col :span="4">{{ item.name }}</el-col>
        <el-col :span="4" class="user-body-time">{{ item.created_at }}</el-col>
        <el-col :span="3" class="user-body-identity">
          <div v-if="item.enable=='0'">营业</div>
          <div v-if="item.enable=='1'" style="color:red">禁用</div>
        </el-col>
        <el-col :span="4" class="user-body-operating">
          <svg-icon icon-class="jinzhi" @click="outletsStatus(item.id,item.enable)" />
          <svg-icon icon-class="hb" @click="goDetails(item.id)" />
          <svg-icon icon-class="ljt" @click="confirmDeletion(item.id)" />
        </el-col>
      </el-row>
    </div>
    <div class="edit">
      <div class="edit-detele" @click="Add">新增网点</div>
      <div />
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          background
          hide-on-single-page
          :current-page.sync="newpage"
          @current-change="getList"
        />
      </div>
    </div>
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
    getOutletsList,
    deleteOutlets,
    setOutletsStatus // 网点状态更改
} from '@/api/user.js'
export default {
    data() {
        return {
            merchants: 0, // 网点总数
            total: 0, // 网点列表总条数
            list: [], // 网点列表
            dialogVisible: false, // 删除询问框的是否显示
            newpage: 1, // 当前显示的分页
            id: '',
            searchInput: '', // 搜索
            status: ''
        }
    },
    created() {
        this.getList(1) // 网点列表
    },
    methods: {
        Add() {
            this.$router.push({ path: '/user/outlets/newDot'})
        },
        // 跳转修改
        goDetails(id) {
            this.$router.push({ path: '/user/outlets/details', query: { id: id }})
        },
        // 获取网点列表
        getList(pages) {
            getOutletsList({ 'name': this.searchInput, 'pages': pages }).then(res => {
                this.list = res.result.model
                this.merchants = res.result.count
                this.total = res.result.count - 0
            })
        },
        outletsStatus(id, enable) {
            if (enable === '0') {
                this.status = '1'
            }
            if (enable === '1') {
                this.status = '0'
            }
            setOutletsStatus({ 'id': id, 'enable': this.status, 'aid': this.$route.query.id }).then(res => {
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
        // 删除网点
        Udelete() {
            deleteOutlets({ 'aid':this.$route.query.id, 'id': this.id }).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getList(1)
                this.newpage = 1
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
.el-pagination{
    position: static;
}
</style>
