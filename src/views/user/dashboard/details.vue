<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">用户详情</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基本信息"
          name="basic"
        >
          <div class="userInformation">
            <ul class="xinxi">
              <li>
                <div>id</div>
                <div>{{ UserDetails.id }}</div>
              </li>
              <li>
                <div> 头像</div>
                <div class="img">
                  <img :src="UserDetails.avatar">
                </div>
              </li>
              <li>
                <div> 昵称</div>
                <div>{{ UserDetails.nickname }}</div>
              </li>
              <li>
                <div> 手机号</div>
                <input v-model="mobile">
              </li>
              <li>
                <div>车牌号</div>
                <input v-model="number_plates">
              </li>
            </ul>
            <ul class="xinxi">
              <li>
                <div>登陆时间</div>
                <div>{{ UserDetails.login_at }}</div>
              </li>
              <li>
                <div> 注册时间</div>
                <div>{{ UserDetails.created_at }}</div>
              </li>
              <li>
                <div> 微信UnionID</div>
                <div>{{ UserDetails.unionid }}</div>
              </li>
              <li>
                <div> 微信公众号UnionID</div>
                <div>{{ UserDetails.openid }}</div>
              </li>
              <li>
                <div>公众号openid</div>

              </li>
              <li>
                <div>公众号openid</div>

              </li>
            </ul>
          </div>

          <div class="basic-information">
            <ul class="basic-information-project">
              <li>
                <p>上级分销商</p>
                <el-input class="w700" />
              </li>
              <li>
                <p>分销商等级</p>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </li>
              <li>
                <p>累计佣金</p>
                <el-input class="w700" />
              </li>
              <li>
                <p>已打款佣金</p>
                <el-input class="w700" />
              </li>
              <li>
                <p>成为分销商时间</p>
                <el-input class="w700" />
              </li>
              <li>
                <p>分销商权限</p>
                <el-radio
                  v-model="power"
                  label="1"
                >是</el-radio>
                <el-radio
                  v-model="power"
                  label="2"
                >否</el-radio>
              </li>
              <li>
                <p>强制不自动升级</p>
                <el-radio
                  v-model="upgrade"
                  label="1"
                >允许自动升级</el-radio>
                <el-radio
                  v-model="upgrade"
                  label="2"
                >强制不自动升级</el-radio>
              </li>
              <li>
                <p />
                <div>如果强制不自动升级，满足任何条件，此分销的级别也不会改变</div>
              </li>
            </ul>
            <div
              class="save-modify"
              @click="basicT = true"
            >保存修改</div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="提现管理"
          name="dividend"
        >
          <el-row class="top">
            <el-col :span="4">提现银行</el-col>
            <el-col :span="4">金额</el-col>
            <el-col :span="4">账号</el-col>
            <el-col :span="4">提现时间</el-col>
            <el-col :span="4">状态</el-col>
            <el-col :span="4">操作人</el-col>
          </el-row>
          <el-row
            v-for="(item,index) in CashWithdrawalList"
            :key="index"
          >
            <el-col :span="4">{{ item.bankname?item.bankname:'无' }}</el-col>
            <el-col :span="4">{{ item.money?item.money:'无' }}</el-col>
            <el-col :span="4">{{ item.account?item.account:'无' }}</el-col>
            <el-col :span="4">{{ item.created_at?item.created_at:'无' }}</el-col>
            <el-col :span="4">
              <div v-show="item.status=='1'">审核</div>
              <div v-show="item.status=='2'">通过</div>
              <div v-show="item.status=='3'">拒绝</div>
            </el-col>
            <el-col :span="4">{{ '无' }}</el-col>
          </el-row>
          <!-- <el-pagination :current-page.sync="memberPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="memberTotal" background hide-on-single-page @current-change="体现管理" /> -->
        </el-tab-pane>
        <el-tab-pane
          label="消费记录"
          name="consumption"
        >
          <div class="module-condition">
            <el-select
              v-model="consumptionV"
              @change="Consumption(1)"
            >
              <el-option
                v-for="item in consumption_type"
                :key="item.value"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="searchTimeV"
              style="margin:0 20px;"
              @change="Consumption(1)"
            >
              <el-option
                v-for="item in searchTime"
                :key="item.value"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-model="memberTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :clearable="false"
              @change="Consumption(1)"
            />
          </div>
          <el-row class="top">
            <el-col :span="4">消费时间</el-col>
            <el-col :span="3">会员卡</el-col>
            <el-col :span="3">会员卡号</el-col>
            <el-col :span="3">消费金额</el-col>
            <el-col :span="5">订单号</el-col>
            <el-col :span="3">消费类型</el-col>
            <el-col :span="3">消费网点</el-col>
          </el-row>
          <el-row
            v-for="(item,index) in ConsumptionList"
            :key="index"
          >
            <el-col :span="4">{{ item.created_at?item.created_at:'无' }}</el-col>
            <el-col :span="3">{{ item.title?item.title:'无' }}</el-col>
            <el-col :span="3">{{ item.card_number?item.card_number:'无' }}</el-col>
            <el-col :span="3">{{ item.money?item.money:'无' }}</el-col>
            <el-col :span="5">{{ item.order_number?item.order_number:'无' }}</el-col>
            <el-col :span="3">{{ item.content?item.content:'无' }}</el-col>
            <el-col :span="3">{{ item.name?item.name:'无' }}</el-col>

          </el-row>
          <el-pagination
            :current-page.sync="pages"
            :page-size="10"
            layout="prev, pager, next"
            :total="consumptionTotal"
            background
            hide-on-single-page
            @current-change="Consumption"
          />
        </el-tab-pane>
        <el-tab-pane
          label="会员卡信息"
          name="cardInformation"
        >

          <el-row
            class="user-head"
            type="flex"
            align="middle"
          >
            <!-- <el-col :span="1">
              <el-checkbox size="medium" />
            </el-col>-->
            <el-col :span="4">卡号</el-col>
            <el-col :span="4">属性</el-col>
            <el-col :span="4">消费金额</el-col>
            <el-col :span="4">有效时间</el-col>
            <el-col :span="4">可用次数</el-col>
            <el-col :span="4"> 剩余次数</el-col>
            <el-col :span="4"> 设置</el-col>
            <!-- <el-col :span="3">支付方式</el-col> -->
          </el-row>
          <el-row
            v-for="(item,index) in Information"
            :key="index"
            class="user-body"
            type="flex"
            align="middle"
          >
            <!-- <el-col :span="1">
              <el-checkbox />
            </el-col>-->
            <el-col
              :span="4"
              class="a1"
            >{{ item.card_number }}</el-col>
            <el-col :span="4">{{ }}
              <span v-if="item.type==='1'">全国通用卡</span>

              <span v-else-if="item.type==='2'">网点专属卡</span>
              <span v-else>地区通用卡</span></el-col>

            <el-col :span="4">{{ item.money }}</el-col>
            <el-col :span="4">{{ item.start_time }}</br></br>{{item.end_time}}</el-col>
            <el-col :span="4">{{ item.number }}</el-col>
            <el-col :span="4">{{ item.surplus_number }}</el-col>
            <el-col
              :span="4"
              style="color:rgba(44,169,252,1);cursor: pointer;"
              @click.native="tudo"
            >权益设置</el-col>
          </el-row>
          <el-pagination
            layout="prev, pager, next,jumper"
            :total="cardListTotal"
            :page-size="10"
            background
            :current-page.sync="cardPage"
            @current-change="getReceiveList"
          />
        </el-tab-pane>
        <!-- <div class="huiyuan">
            <ul v-for="(item,index) in Information" :key="index">
              <li>
                <h3>会员卡{{ item.index }}</h3>
                <div class="box2">卡号 </div>
                <div>{{ item.card_number }}</div>
              </li>
              <li>
                <div>属性</div>
                <div v-if="item.type==='1'">全国通用会员卡</div>
                <div v-else-if="item.type==='2'">网点专属卡</div>
                <div v-else>地区通用卡</div>
              </li>
              <li>
                <div>消费金额</div>
                <div>{{ item.money }}元</div>
              </li>
              <li>
                <div>有效时间</div>
                <div>{{ item.month }}个月</div>
              </li>
              <li>
                <div>可使用次数</div>
                <div>{{ item.number }}次</div>
              </li>
              <li>
                <div>剩余次数</div>
                <div>{{ item.surplus_number }}次</div>
              </li>
            </ul>
          </div> -->
        <el-tab-pane
          label="下属团队"
          name="device"
        >
          <div style="text-align:right;margin:20px 0">团队总人数：21</div>
          <el-row class="top">
            <el-col :span="3">粉丝</el-col>
            <el-col :span="3">手机号</el-col>
            <el-col :span="3">下线层级</el-col>
            <el-col :span="3">级别</el-col>
            <el-col
              :span="3"
              class="size"
            >累计佣金</br>打款佣金</el-col>
            <el-col :span="3">下级下线</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">粉丝</el-col>
            <el-col :span="3">手机号</el-col>
            <el-col :span="3">下线层级</el-col>
            <el-col :span="3">级别</el-col>
            <el-col :span="3">累计佣金/打款佣金</el-col>
            <el-col :span="3">下级下线</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="分销订单"
          name="settlement"
        >
          <div
            class="module-flex"
            style="justify-content: space-between;"
          >
            <!-- <div class="module-condition">
              <el-select v-model="settlementV" @change="getOutletsSettlement(1)">
                <el-option v-for="item in settlement" :key="item.value" :value="item.value" />
              </el-select>
              <el-select v-model="settlementSearchTimeV" style="margin:0 20px;" @change="getOutletsSettlement(1)">
                <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
              </el-select>
              <el-date-picker v-model="settlementTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"
                @change="getOutletsSettlement(1)" />
            </div> -->
          </div>
          <el-row class="top">
            <el-col :span="3">下级姓名</el-col>
            <el-col :span="5">消费时间</el-col>
            <el-col :span="3">金额</el-col>
            <el-col :span="4">订单号</el-col>
            <el-col :span="3">消费类型</el-col>
            <el-col :span="3">佣金</el-col>
            <el-col :span="3">佣消费网点</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">下级姓名</el-col>
            <el-col :span="5">消费时间</el-col>
            <el-col :span="3">金额</el-col>
            <el-col :span="4">订单号</el-col>
            <el-col :span="3">消费类型</el-col>
            <el-col :span="3">佣金</el-col>
            <el-col :span="3">佣消费网点</el-col>
          </el-row>
          <!-- <el-pagination :current-page.sync="settlementPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="settlementTotal" background hide-on-single-page /> -->
        </el-tab-pane>
        <el-tab-pane
          label="提现账号"
          name="account"
        >
          <el-row class="top">
            <el-col :span="3">银行</el-col>
            <el-col :span="3">姓名</el-col>
            <el-col :span="6">账号</el-col>
            <el-col :span="4">添加日期</el-col>
          </el-row>
          <el-row
            v-for="(item,index) in WithdrawalsAccount"
            :key="index"
          >
            <el-col :span="3">{{ item.bankname }}</el-col>
            <el-col :span="3">{{ item.name }}</el-col>
            <el-col :span="6">{{ item.account }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
          </el-row>
          <!-- <el-pagination :current-page.sync="accountPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="accountTotal" background hide-on-single-page /> -->
          <!-- @current-change="getOutletsAccount" -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 基本信息修改  -->
    <el-dialog
      title="提示"
      :visible.sync="basicT"
      width="30%"
    >
      <span style="font-size:20px;">是否确定保存?</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="basicT = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveData"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div v-show="addIn===1" class="addbtn" @click="goAdd">新增网点管理员</div> -->
  </div>
</template>

<script>
import { } from '@/router/index.js'
import {
  getUserDetails, // 用户管理详情
  setUserDetails, // 用户管理详情 修改
  getUserCashWithdrawal, // 提现管理
  getConsumption, // 消费记录
  getMembershipCard, // 会员卡信息
  getWithdrawalsAccount, // 用户的提现账户
} from '@/api/user.js'
export default {
  data() {
    return {
      value: 0,
      getReceiveList: [],
      cardPage: null,
      cardListTotal: null,
      activeName: 'basic', // 第一个标签页
      accountTotal: '',
      UserDetails: '', // 用户信息
      id: '', // 基本信息id
      avatar: '', // 头像
      nickname: '', // 昵称
      mobile: '', // 手机号
      number_plates: '', // 车牌号
      login_at: '', // 登陆时间
      created_at: '', // 注册时间
      unionid: '', // 微信UnionID
      openid: '', // 公众号openid
      basicT: false, // 修改询问弹窗
      Information: [], // 会员卡信息
      card_number: '', // 卡号
      type: '', // 属性
      month: '', // 有效日期
      number: '', // 可用次数
      surplus_number: '', // 剩余次数
      upgrade: '', //  强制不自动升
      power: '', // 分销
      options: [{ value: 1, label: '一级' }, { value: 2, label: '二级' }], // 分销商等级
      ConsumptionList: [],  // 消费记录 列表
      consumptionTotal: 0,  // 消费条数
      memberTime: [], // 消费记录时间数组
      memberTimeS: '', // 开始时间
      memberTimeE: '',  // 结束时间
      pages: 1,            //页码
      count: '',           //总条数
      pageSize: '',        //每页数据数量
      consumption_type: [{ value: '洗车类型' }, { value: '现金洗车' }, { value: '会员洗车' }, { value: '开通会员卡' }],
      consumptionV: '洗车类型', // 消费记录
      searchTime: [{ value: '不按时间' }, { value: '消费时间' }],
      time: [{ value: '天' }, { value: '月' }],
      searchTimeV: '不按时间',  // 消费记录
      CashWithdrawalList: [],  // 用户的提现列表
      WithdrawalsAccount: [],   // 用户提现账号列表
      type: '',
    }
  },
  created(id) {
    this.id = this.$route.query.id
    this.getUserDetails(this.id) // 用户详情
    this.getCard(this.id) // 会员信息
    this.Consumption(this.id)  // 消费记录
    this.getUserCashWithdrawalList(this.id)   // 用户的提现管理
    this.getWithdrawalsAccountList(this.id)    // 用户提现账号
    this.type = this.$route.query.type
  },
  methods: {

    tudo(id) {
      this.$router.push(`/user/dashboard/xiangxi?id=${id}`)
    },



    // 用户管理详情
    getUserDetails(id) {
      getUserDetails({ 'id': id }).then(res => {
        this.mobile = res.result.mobile
        this.number_plates = res.result.number_plates
        this.UserDetails = res.result
      })
    },
    // 用户管理详情 修改
    saveData() {
      if (this.mobile == '' || this.number_plates == '') {
        this.$message.error('您未完善用户资料')
      } else if (!(/^[1][3|4|5|6|7|8|9][0-9]{9}$/.test(this.mobile))) {
        this.$message.error('请输入正确的手机号')
      } else {
        let obj
        obj = {
          id: this.id,
          mobile: this.mobile,
          number_plates: this.number_plates
        }
        setUserDetails(Object.assign(obj, { id: this.id })).then(res => {
          this.$message({
            message: '修改基本资料成功',
            type: 'success'
          })
        })
        this.basicT = false
      }
    },

    // 用户的提现管理
    getUserCashWithdrawalList() {
      getUserCashWithdrawal({
        id: this.id,
        pages: this.pages
      }).then(res => {
        console.log(res)
        this.CashWithdrawalList = res.result.list
      })
    },
    //  消费记录
    Consumption() {
      this.memberTimeS = this.memberTime[0]
      this.memberTimeE = this.memberTime[1]
      getConsumption({
        id: this.id,
        pages: this.pages,
        time: this.searchTimeV === '不按时间' ? 1 : 2,
        start_time: this.memberTimeS,
        end_time: this.memberTimeE,
        consumption_type: this.consumptionV === '洗车类型' ? '' : this.consumptionV
      }).then(res => {
        this.ConsumptionList = res.result.list
        this.consumptionTotal = res.result.count - 0
      })
    },
    // 会员卡信息
    getCard(id) {
      getMembershipCard({ 'id': id }).then(res => {
        this.Information = res.result.model
      })
    },
    // 用户的提现账户
    getWithdrawalsAccountList() {
      getWithdrawalsAccount({
        id: this.id,
        pages: this.pages
      }).then(res => {
        this.WithdrawalsAccount = res.result.list
      })
    },

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
</style>
<style lang="scss" scoped>
.module {
  border-top: 1px solid #cfcdcd;
  margin-bottom: 20px;
  &-condition {
    margin: 12px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-title {
    font-weight: bold;
    margin: 20px 0;
  }
  &-flex {
    display: flex;
    align-items: center;
  }
  &-p6 {
    width: 6em;
    text-align: right;
    p {
      font-size: 12px;
      color: #5a5a5a;
    }
  }
  &-p10 {
    width: 10em;
    text-align: right;
  }
  &-w120 {
    width: 120px;
    margin: 0 0.5em 0 1em;
  }
  &-w300 {
    width: 300px;
    margin: 0 0.5em 0 1em;
  }
  &-w400 {
    width: 400px;
    margin: 0 0.5em 0 1em;
  }
  &-w70 {
    width: 70px;
  }
  &-description5 {
    margin: 10px 0 30px 7em;
    color: #979797;
  }
  &-description10 {
    margin: 10px 0 30px 12em;
    color: #979797;
  }
  &-F25 {
    font-size: 25px;
    color: #333333;
    svg {
      cursor: pointer;
    }
  }
}
.addbtn {
  color: white;
  background-color: #2ca9fc;
  padding: 12px 12px;
  width: 160px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.save {
  width: 140px;
  background-color: #2ca9fc;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 8px 12px;
  margin: 50px auto 0;
  cursor: pointer;
}
.imageAndInput {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  &-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.address-search {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.buttn {
  background-color: #2ca9fc;
  padding: 8px 13px;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 15px;
}
.w200 {
  width: 200px;
}
.w130 {
  width: 130px;
}
.w700 {
  width: 700px;
}
.el-col {
  text-align: center;
}
.el-row {
  padding: 15px 0;
  border: 1px solid #cbcbcb;
  border-top: 1px solid white;
  color: #757575;
}
.el-row:hover {
  border: 1px solid #2ca9fc;
}
.save-modify {
  border-radius: 5px;
  background-color: #2ca9fc;
  padding: 8px 30px;
  font-size: 20px;
  color: white;
  width: 180px;
  text-align: center;
  margin: 40px auto 20px;
  cursor: pointer;
}
.title {
  margin: 30px;
  font-size: 20px;
  font-weight: bold;
}
.el-pagination {
  right: 0;
  position: absolute;
  top: calc(100vh - 265px);
}
.photoDistance {
  margin-top: 100px;
}
.half {
  width: 50%;
}
.top {
  border-top: 1px solid #cbcbcb;
  font-size: 20px;
  color: #23262f;
  text-align: center;
  line-height: 23px;
  .size {
    font-size: 17px;
  }
}
.top:hover {
  border: 1px solid #2ca9fc;
}
li {
  list-style-type: none;
}
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
  min-height: calc(100vh - 200px);
}
.basic {
  &-information {
    position: relative;
    // margin-top: 500px;
    font-size: 20px;
    line-height: 20px;
    &-project {
      text-align: right;
      margin: 10px 50px 0 50px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 7em;
          margin-right: 1em;
        }
        div {
          font-size: 14px;
          color: #606266;
          margin-top: 0px;
        }
      }
    }
  }
}
.userInformation {
  position: relative;
  height: 290px;
  &-ul {
    margin: 30px 50px 0 50px;
    width: 50%;
    li {
      width: 50%;
      height: 20px;
      margin: 10px 12px 15px 10px;
      width: 50%;
      &-title {
        // display: inline-block;
        height: 20px;
        font-size: 20px;
        font-weight: 700;
        padding: 10px;
        vertical-align: middle;
      }
    }
  }
}
.xinxi {
  width: 50%;
  float: left;
  &-input {
    border: 0px solid #fff;
  }
  li {
    margin: 20px 0;
    font-size: 20px;

    .img {
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        // overflow: hidden;
        vertical-align: middle;
      }
    }
  }

  li div:nth-child(1) {
    display: inline-block;
    width: 35%;
    text-align: right;
  }
  li div:nth-child(2) {
    display: inline-block;
    text-align: right;
  }
}
.huiyuan {
  ul {
    float: left;
    width: 40%;
  }
  ul:nth-child(2n) {
    float: right;
  }
  ul:nth-child(2n + 1) {
    float: left;
  }

  li {
    margin: 10px 0;
    font-size: 20px;
  }
  h3 {
    display: inline-block;
    width: 35%;
    color: #2ca9fc;
  }
  .box2 {
    // width: 9%!important;
    margin-left: -75px !important;
  }
  li div:nth-child(1) {
    display: inline-block;
    width: 30%;
    text-align: right;
  }
  li div:nth-child(2) {
    display: inline-block;
    width: 40%;
    text-align: left;
    margin-left: 10px;
  }
  li div:nth-child(3) {
    display: inline-block;
    text-align: left;
    margin-left: -185px;
  }
}
</style>
