<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">售后管理</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchText" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom" @click="search">搜索</div>
      </div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName" @tab-click="deletebtn">
        <el-tab-pane label=" 待处理" name="first">
          <!-- 筛选条件开始-->
          <el-select v-model="consumptionV.name" @change="getReceiveList(1)">
            <el-option v-for="item in options" :key="item.value" :value="item.label" />
          </el-select>
          <el-select v-model="searchTimeV" style="margin:0 20px;" @change="getReceiveList(1)">
            <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
          </el-select>
          <el-date-picker v-model="consumptionTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false" @change="getReceiveList(1)" />
          <!-- 筛选条件结束-->
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox size="medium" /> -->
            <el-col :span="2">序号</el-col>
            <el-col :span="5">消费者</el-col>
            <el-col :span="3">消费网点</el-col>
            <el-col :span="5">消费时间</el-col>
            <el-col :span="6">消费金额</el-col>
            <el-col :span="5">反馈</el-col>
            <el-col :span="4">状态</el-col>
            <el-col :span="4">操作人</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in dingdanguanli1" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox /> -->
            <el-col :span="2">{{ item.nickname }}</el-col>
            <el-col :span="3" class="user-body-character">{{ item.updated_at}}</el-col>
            <el-col :span="4">{{ item.name }}</el-col>
            <el-col :span="2">{{ item.title }}</el-col>
            <el-col :span="7" class="user-body-identity">{{ item.out_trade_no }}</el-col>
            <el-col :span="3" class="user-body-time">
              <div v-if="item.type=='1'">全国通用卡</div>
              <div v-else-if="item.type=='2'">网点专属卡</div>
              <div v-else>地区通用卡</div>
            </el-col>
            <el-col :span="3" class="user-body-identity">{{ item.nickname }}</el-col>
            <el-col :span="2" class="user-body-operating">
              <svg-icon :span="3" icon-class="hb" @click="goModifyDetails(item.id)" />
              
            </el-col>
          </el-row>

          <!--分页-->
          <el-pagination layout="prev, pager, next,jumper" :total="memberCount" :page-size="10" background
            :current-page="memberPages" @current-change="getMember" />

        </el-tab-pane>
        <el-tab-pane label="已处理" name="second">
          <!-- 筛选条件开始-->
          <el-select v-model="consumptionV.name" @change="getReceiveList(1)">
            <el-option v-for="item in options" :key="item.value" :value="item.label" />
          </el-select>
          <el-select v-model="searchTimeV" style="margin:0 20px;" @change="getReceiveList(1)">
            <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
          </el-select>
          <el-date-picker v-model="consumptionTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false" @change="getReceiveList(1)" />
          <!-- 筛选条件结束-->
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1">
              <el-checkbox size="medium" />
            </el-col>-->
             <el-col :span="2">序号</el-col>
            <el-col :span="5">消费者</el-col>
            <el-col :span="3">消费网点</el-col>
            <el-col :span="5">消费时间</el-col>
            <el-col :span="6">消费金额</el-col>
            <el-col :span="5">反馈</el-col>
            <el-col :span="4">状态</el-col>
            <el-col :span="4">操作人</el-col>
            <el-col :span="4">操作</el-col>
            <!-- <el-col :span="3">支付方式</el-col> -->
          </el-row>
          <el-row v-for="(item,index) in xianjinxiche1" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1">
              <el-checkbox />
            </el-col>-->
            <el-col :span="3">{{ item.nickname }}</el-col>
            <el-col :span="4" class="user-body-character">{{ item.use_time }}</el-col>
            <el-col :span="2">{{ item.money }}</el-col>
            <el-col :span="1">{{ item.created_at }}</el-col>
            <el-col :span="4">{{ item.out_trade_no }}</el-col>
            <el-col :span="3">
              {{ item.type==='1'?'':'已失效' }}
              <!-- <span
                style="color:red;"
                v-if="item.type === 1"
              >1</span>
              <span
                style="color:pink;"
                v-else-if="item.type === 2"
              >2</span>
              <span
                style="color: purple;"
                v-else
              >3</span> -->
            </el-col>
            <el-col :span="3">{{ item.name }}</el-col>
          </el-row>
          <el-pagination layout="prev, pager, next,jumper" :total="cardListTotal" :page-size="10" background
            :current-page.sync="cardPage" @current-change="getReceiveList" />
        </el-tab-pane>
       
      </el-tabs>
    </div>

  </div>
</template>

<script>
import {
  getMemberInList, // 获取会员卡列表
  getActivateCard, // 获取会员 卡开卡记录
  getDeleteMemberList, // 会员卡删除列表
  getOutletsIsCardDelete,// 删除会员卡
  getRecoveryCard,  // 会员卡删除撤回
  dingdanguanli1,
  xianjinxiche1,
} from '@/api/system.js'
import { log } from 'util'
export default {
  data() {
    return {
      // 领取优惠卷 选择的下拉框
      options: [
        { value: 1, label: '全国通用会员' },
        { value: 2, label: '网点专属会员' },
        { value: 3, label: '地区通用会员' },
      ],
      // activitycount:'',
      value: '',
      activeName: 'first', // 第一个标签页
      Inlist: [], // 进行中活动列表
      list: [], // 结束活动列表
      id: '',
      dialogVisible: false, // 删除确认框的显示
      memberPages: 1, // 会员记录当前页
      memberCount: 1, // 会员记录总数据
      memberPageSize: 1,      //会员记录每条数据
      time: [], // 开卡时间
      couponName: '', // 优惠劵名称
      getListCoupon: [],
      carddel: [], // 删除列表
      carddelPages: 1,  // 删除记录当前页
      carddelTotal: 0,  // 删除记录总件数
      input: '',
      getActivateCardList: [], // 获取优惠劵列表
      cardList: [], // 会员卡 开卡记录
      cardPage: 1, //  当前页 开卡记录
      cardListTotal: 0, // 开卡记录 共条数
      deletes: 0, // 删除按钮的显示与隐藏
      adds: 0, // 添加优惠劵的显示与隐藏
      DeleteMember: [], // 删除记录列表
      getDeleteMemberList: [],
      months: '', // 有效期月份
      // getMembershipCardDel: [], // 删除记录列表
      getOutletsIsCardDelete: [],// 删除会员卡
      MemberInList: [],// 会员卡记录
      memberTimeS: '', // 会员记录开始时间
      memberTimeE: '', // 会员记录结束时间
      dingdanguanli1: [], //订单管理
      xianjinxiche1: [],  //现金洗车
      consumptionV: {
        name: '',
        id: ''
      }, // 开卡记录
      searchTimeV: '不按时间', // 开卡记录
      searchTime: [{ value: '不按时间' }, { value: '开卡时间' }],
      consumptionTime: [], // 开卡记录时间数组
      consumptionTimeS: '', // 开卡记录开始时间
      consumptionTimeE: '', // 开卡记录结束时间
      searchText: '',          //搜索文字
    }
  },
  created() {
    // this.getMember() //会员卡列表
    // this.getReceiveList(1)   // 开卡记录
    // this.getMembershipCardDel(1)  // 删除记录
    this.dingdanguanli()
    this.xianjinxiche()
  },
  methods: {

    // 订单管理1接口调用
    dingdanguanli() {
      dingdanguanli1({ page: '1' }).then(res => {
        console.log(res);
        // 做判断条件，确认成功返回数据
        if (res.code == 200) {
          // 将返回数据放进变量中
          let data = res.result.model;
          // 给data中的变量赋值返回数据，方便页面数据操作
          this.dingdanguanli1 = data
          this.$message({
            message: '请求成功',
            type: 'success'
          });
        } else {
          // 返回数据不成功的时候执行兼容操作
          this.$message.error('请求失败，请重试!');
        }
      })
    },

    // 现金洗车接口调用
    xianjinxiche() {
      xianjinxiche1({ page: '1' }).then(res => {
        console.log(res);
        // 做判断条件，确认成功返回数据
        if (res.code == 200) {
          // 将返回数据放进变量中
          let data = res.result.model;
          // 给data中的变量赋值返回数据，方便页面数据操作
          this.xianjinxiche1 = data
          this.$message({
            message: '请求成功',
            type: 'success'
          });
        } else {
          // 返回数据不成功的时候执行兼容操作
          this.$message.error('请求失败，请重试!');
        }
      })
    },








    deletebtn(tab) {
      if (tab.name === 'fourth') {
        this.deletes = 1
        this.adds = 1
      } else {
        this.deletes = 0
        this.adds = 0
      }
    },
    // 会员选择框
    memberSelection() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    //会员卡删除撤回
    recoveryCard(id, deleted) {
      getRecoveryCard({ id, 'deleted': 0 }).then(res => {
        this.$message({
          message: '撤回成功',
          type: 'success'
        })
        this.getMembershipCardDel()
        this.getMember()
      })
    },

    // 新增会员卡
    goDetails() {
      this.$router.push('/survey/survey')
    },

    // 修改会员卡
    goModifyDetails(id) {
      this.$router.push({ path: '/survey/survey', query: { id: id } })
    },
    // 获取会员卡列表
    getMember() {
      getMemberInList({ pages: this.memberPages, title: this.searchText }).then(res => {
        console.log(res);
        this.MemberInList = res.result.model
        this.memberCount = parseInt(res.result.count)
      })
    },
    // 获取会员卡开卡记录列表
    getReceiveList(pages) {
      this.consumptionTimeS = this.consumptionTime[0]
      this.consumptionTimeE = this.consumptionTime[1]
      this.options.forEach(val => {
        if (val.label == this.consumptionV.name) {
          this.consumptionV.id = val.value
        }
      })
      getActivateCard({
        'type': this.consumptionV.id,
        'time': this.searchTimeV === '不按时间' ? 1 : 2,
        'start_time': this.consumptionTimeS,
        'end_time': this.consumptionTimeE
      }).then(res => {
        this.cardList = res.result.model
        this.cardListTotal = res.result.count - 0
      })
    },

    // 删除会员记录的列表
    getMembershipCardDel(pages) {
      getDeleteMemberList({ pages: pages }).then(res => {
        this.carddel = res.result.model
        this.carddelTotal = res.result.count - 0
        console.log(this.cardListTotal)
      })
    },
    // 打开删除对话框
    prompt(id) {
      this.id = id
      this.dialogVisible = true
    },

    // 删除询问框的显示
    confirmDeletion(id) {
      sessionStorage.setItem('deleteId', id)
      console.log(id)
      this.dialogVisible = true
      this.id = id
    },
    //搜索
    search() {
      this.memberPages = 1
      this.getMember()
    }
  }
}
</script>
<style lang="scss">
.el-tabs__content {
  overflow: unset;
}
.el-tabs__item {
  color: #222222;
  font-size: 20px;
  font-weight: bold;
}
.el-tabs__item.is-active {
  color: #222222;
}
.el-tabs__active-bar {
  background-color: #2ca9fc;
}
.el-tabs__item:hover {
  color: #2ca9fc;
}
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
  right: 0px;
  position: absolute;
  top: calc(100vh - 290px);
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
    // height: 50px;
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
        background-color: #2ca9fc;
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
    padding: 18px 20px;
    text-align: center;
    font-size: 16px;
    &-operating {
      font-size: 20px;
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
    float: left;
    padding: 12px 20px;
    background-color: #2ca9fc;
    color: white;
    font-size: 25px;
    margin-right: 20px;
    cursor: pointer;
  }
}
.receive {
  margin-bottom: 16px;
}
</style>
