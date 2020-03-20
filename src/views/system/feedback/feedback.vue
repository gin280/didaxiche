<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">意见反馈</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchInput" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom">搜索</div>
      </div>
    </div>
    <div class="user">
      <el-row class="user-head" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox size="medium" />
        </el-col> -->
        <el-col :span="2">ID</el-col>
        <el-col :span="4">用户昵称</el-col>
        <el-col :span="4">反馈网点</el-col>
        <el-col :span="5">反馈时间</el-col>
        <el-col :span="4">详情</el-col>
      </el-row>
      <el-row v-for="(item,index) in feedbackList" :key="index" class="user-body" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox />
        </el-col> -->
         <el-col :span="2">{{ item.id }}</el-col>
        <el-col :span="4">{{ item.nickname }}</el-col>
        <el-col :span="4">{{ item.name }}</el-col>
        <el-col :span="5">{{ item.created_at }}</el-col>
        <el-col :span="4" class="user-body-operating">
          <svg-icon icon-class="hb" @click="goDetails(item.id)" />
        </el-col>
      </el-col>
      </el-row>
    </div>
    <div>
        <el-pagination
          layout="prev, pager, next,jumper"
          :total="total"
          :page-size="10"
          background
          :current-page.sync="newpage"
          @current-change="getList"
        />
</div>
  </div>
</template>

<script>
import {
    getFeedback,  // 意见反馈列表
} from '@/api/system.js'
export default {
    data() {
        return {
            total: 0, // 设备列表总条数
            newpage: 1, // 当前显示的分页
            id: '',
            searchInput: '', // 搜索
            feedbackList:[],  // 反馈列表
        }
    },
    created() {
        this.getList(1)
    },
    methods: {
        goDetails(id) {
            this.$router.push({ path: '/feedback/feedbackDetails', query: { id: id }})
        },
        // 获取意见反馈列表
        getList(pages) {
            getFeedback({ 'name': this.searchInput, 'pages': pages }).then(res => {
                this.feedbackList = res.result.model
                this.total = res.result.count - 0
            })
        },

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
.el-pagination {
  right: 45px;
  position: absolute;
  top: calc(100vh - 225px);
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
    margin-bottom: -1px;
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
    padding: 5px 20px;
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

</style>
