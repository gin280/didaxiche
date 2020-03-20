<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">代理商审核</div>
      <div class="dashboard-left">
        <!-- <el-select v-model="statusV" @change="getList(1)">
          <el-option v-for="item in status" :key="item.value" :value="item.value" />
        </el-select> -->
      </div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchInput" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom" @click="getList(1)">搜索</div>
      </div>
    </div>
    <div class="user">
      <el-row class="user-head" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox size="medium" />
        </el-col> -->
        <el-col :span="2">序号</el-col>
        <el-col :span="3">联系人</el-col>
        <el-col :span="3">公司名称</el-col>
        <el-col :span="4">代理地区</el-col>
        <el-col :span="4">申请时间</el-col>
        <el-col :span="4">省代审核状态</el-col>
        <el-col :span="4">系统审核状态</el-col>
        <el-col :span="3">操作人</el-col>
        <el-col :span="3">操作</el-col>
      </el-row>
      <el-row v-for="(item,index) in list" :key="index" class="user-body" type="flex" align="middle">
        <!-- <el-col :span="1">
          <el-checkbox />
        </el-col> -->
        <el-col :span="2">{{ item.id }}</el-col>
        <el-col :span="3">{{ item.realname }}</el-col>
        <el-col :span="3">{{ item.name }}</el-col>
        <el-col :span="4">{{ item.dprovince }} {{ item.dcity }} {{ item.darea }}</el-col>
        <el-col :span="4">{{ item.created_at }}</el-col>
        <el-col :span="4" class="user-body-identity">
          <div v-if="item.status=='0'" style="color:#2CA9FC">待审核</div>
          <div v-if="item.status=='1'" style="color:#19D4B8">审核通过</div>
          <div v-if="item.status=='2'" style="color:#EE350D">已拒绝</div>
          <div v-if="item.status=='3'" style="color:#1D1D1D">无省代</div>
          <!-- <div v-else>无省代</div> -->
        </el-col>
        <el-col :span="4" class="user-body-identity">
          <div v-if="item.status_z=='0'" style="color:#2CA9FC">待审核</div>
          <div v-if="item.status_z=='1'" style="color:#19D4B8">审核通过</div>
          <div v-if="item.status_z=='2'" style="color:#EE350D">已拒绝</div>
        </el-col>
        <el-col :span="3">{{ item.nickname }}</el-col>
        <el-col :span="3" class="user-body-operating">
          <svg-icon icon-class="hb" @click="goDetails(item.id)" />
        </el-col>
      </el-row>
    </div>
    <div class="edit">
      <div>
        <el-pagination
          layout="prev, pager, next,jumper"
          :total="total"
          :page-size="10"
          background
          :current-page.sync="newPage"
          @current-change="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAgentAuditList } from '@/api/review.js'

export default {
    data() {
        return {
            total: 0, // 审核列表
            newPage:1, // 当前页
            list: [], // 初始化列表总数
            statusV: '全部',
            status: [{ value: '全部' }, { value: '待审核' }, { value: '已通过' }, { value: '已拒绝' }],
            settlementTimeS: '', // 开始时间
            settlementTimeE: '', // 结束时间
            settlementTime: [], // 结算记录时间数组
            searchInput:'',  // 审核搜索
        }
    },
    created() {
        this.getList(1)
    },
    methods: {
    // 跳转编辑
        goDetails(id) {
            this.$router.push({ path: '/review/practitioner/review', query: { id: id }})
        },

        // 获取列表
        getList(pages) {
            this.settlementTimeS = this.settlementTime[0]
            this.settlementTimeE = this.settlementTime[1]
            getAgentAuditList({
                'id': this.id,
                'pages': pages,
                'status': this.statusV === '全部' ? '' : this.statusV,
                'created_at': this.settlementTimeS,
                'end_time': this.settlementTimeE,
                'name':this.searchInput
            }).then(res => {
                this.list = res.result.model
                this.total = res.result.count - 0
            })
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
  &-left{
  width: 180px;
  margin-left: -370px;

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
    margin-bottom: 10px;
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
    font-size: 14px;
    &-operating {
      font-size: 30px;
      color: black;
      svg {
        cursor: pointer;
      }
    }
    &-identity {
      color: #0b7767;
      font-weight: bold;
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
</style>
