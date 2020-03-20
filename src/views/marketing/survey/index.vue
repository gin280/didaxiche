<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">会员卡管理</div>
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
        <el-tab-pane label="会员卡管理" name="first">
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox size="medium" /> -->
            <el-col :span="1">序号</el-col>
            <el-col :span="3">会员卡名称</el-col>
            <el-col :span="4">创建时间</el-col>
            <el-col :span="2">价格</el-col>
            <el-col :span="2">有效期</el-col>
            <el-col :span="5">卡号</el-col>
            <el-col :span="3">会员卡类型</el-col>
            <el-col :span="3">领取情况</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in MemberInList" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox /> -->
            <el-col :span="1">{{ item.id }}</el-col>
            <el-col :span="3" class="user-body-character">{{ item.title }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="2">{{ item.money }}</el-col>
            <el-col :span="2">{{ item.month }}</el-col>
            <el-col :span="5" class="user-body-identity">{{ item.card_number }}</el-col>
            <el-col :span="3" class="user-body-time">
              <div v-if="item.type=='1'">全国通用卡</div>
              <div v-else-if="item.type=='2'">网点专属卡</div>
              <div v-else>地区通用卡</div>
            </el-col>
            <el-col :span="3" class="user-body-identity">{{ item.surplus_stock }}/{{ item.stock }}</el-col>
            <el-col :span="2" class="user-body-operating">
              <svg-icon :span="3" icon-class="hb" @click="goModifyDetails(item.id)" />
              <svg-icon icon-class="ljt" @click="prompt(item.id)" />
            </el-col>
          </el-row>

          <!--分页-->
          <el-pagination layout="prev, pager, next,jumper" :total="memberCount" :page-size="10" background
            :current-page="memberPages" @current-change="getMember" />

        </el-tab-pane>
        <el-tab-pane label="开卡记录" name="second">
          <el-select v-model="consumptionV.name" @change="getReceiveList(1)">
            <el-option v-for="item in options" :key="item.value" :value="item.label" />
          </el-select>
          <el-select v-model="searchTimeV" style="margin:0 20px;" @change="getReceiveList(1)">
            <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
          </el-select>
          <el-date-picker v-model="consumptionTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false" @change="getReceiveList(1)" />

          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1">
              <el-checkbox size="medium" />
            </el-col>-->
            <el-col :span="2">序号</el-col>
            <el-col :span="4">会员卡名称</el-col>
            <el-col :span="3">开卡人</el-col>
            <el-col :span="4">领取时间</el-col>
            <el-col :span="4">价格</el-col>
            <el-col :span="3">次数</el-col>
            <el-col :span="3">有效期</el-col>
            <el-col :span="3"> 状态</el-col>
            <!-- <el-col :span="3">支付方式</el-col> -->
          </el-row>
          <el-row v-for="(item,index) in cardList" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1">
              <el-checkbox />
            </el-col>-->
            <el-col :span="2">{{ item.id }}</el-col>
            <el-col :span="4" class="user-body-character">{{ item.title }}</el-col>
            <el-col :span="3">{{ item.nickname }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="4">{{ item.money }}</el-col>
            <el-col :span="3">
              <el-input @change="changeInputValue" v-model="item.number"></el-input>
            </el-col>
            <el-col :span="3">{{ item.month }}</el-col>
            <el-col :span="3">
              {{ item.status==='1'?'已开通':'已失效' }}
            </el-col>

          </el-row>
          <el-pagination layout="prev, pager, next,jumper" :total="cardListTotal" :page-size="10" background
            :current-page.sync="cardPage" @current-change="getReceiveList" />
        </el-tab-pane>
        <el-tab-pane label="删除记录" name="third">
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox size="medium" /> -->
            <el-col :span="2">序号</el-col>
            <el-col :span="4">会员卡名称</el-col>
            <el-col :span="4">创建时间</el-col>
            <el-col :span="4">删除时间</el-col>
            <!-- <el-col :span="3">参与人数</el-col> -->
            <el-col :span="3">价格</el-col>
            <el-col :span="3">开卡人数</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row />
          <el-row v-for="(item,index) in carddel" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1"> -->
            <!-- <el-checkbox /> -->
            <!-- </el-col> -->
            <el-col :span="2">{{ item.id }}</el-col>
            <el-col :span="4">{{ item.title }}</el-col>
            <el-col :span="4"> {{ item.created_at }} </el-col>
            <el-col :span="4">{{ item.updated_at }}</el-col>
            <el-col :span="3">{{ item.money }}</el-col>
            <el-col :span="3">{{ item.number }}</el-col>

            <el-col :span="3" class="user-body-operating">
              <svg-icon icon-class="back" @click="recoveryCard(item.id,item.deleted)" />
            </el-col>
          </el-row>
          <el-pagination layout="prev, pager, next,jumper" :total="carddelTotal" :page-size="10" background
            :current-page.sync="carddelPages" @current-change="getMembershipCardDel" />
        </el-tab-pane>

        <el-tab-pane label="默认设置" name="fourth">
          <el-tabs type="border-card">
            <el-tab-pane label="地区会员卡默认样式">
              <el-card class="box-card">
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-col :span="2" class="a1" style="text-align:center ">默认名称<div class="grid-content bg-purple"></div>
                  </el-col>
                  <el-col :span="8" class="a2">
                    <el-input v-model="input1" placeholder="请输入会员卡名称"></el-input>
                    <div class="grid-content bg-purple-light"></div>
                  </el-col>
                </el-row>
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-col :span="2" class="a1" style="text-align:center ">默认样式<div class="grid-content bg-purple"></div>
                  </el-col>
                  <el-col :span='7' class="a2">
                    <el-input v-model="input2" placeholder="请输入内容"></el-input>
                  </el-col>
                  <el-col :span='1'>
                    <el-button type="primary" style="border-radius:0;">上传<i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </el-col>
                </el-row>

                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleChange">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-row>
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-button type="primary" @click="edit">保存修改</el-button>
                </el-row>
              </el-card>

            </el-tab-pane>

            <el-tab-pane label="网点会员卡默认样式">

                <el-card class="box-card">
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-col :span="2" class="a1" style="text-align:center">默认名称<div class="grid-content bg-purple"></div>
                  </el-col>
                  <el-col :span="8" class="a2">
                    <el-input v-model="input3" placeholder="请输入会员卡名称"></el-input>
                    <div class="grid-content bg-purple-light"></div>
                  </el-col>
                </el-row>
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-col :span="2" class="a1" style="text-align:center">默认样式<div class="grid-content bg-purple"></div>
                  </el-col>
                  <el-col :span='7' class="a2">
                    <el-input v-model="input4" placeholder="请输入内容"></el-input>
                  </el-col>
                  <el-col :span='1'>
                    <el-button type="primary" style="border-radius:0;">上传<i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </el-col>
                </el-row>

                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleChange">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-row>
                <el-row type='flex' align='middle' justify="center" style="margin-top:30px">
                  <el-button type="primary" @click="edit1">保存修改</el-button>
                </el-row>
              </el-card>



            </el-tab-pane>

          </el-tabs>

        </el-tab-pane>

      </el-tabs>

    </div>
    <div class="edit">
      <div style="display:flex;">
        <div v-show="adds===0" class="edit-detele" @click="goDetails">新增会员卡</div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:20px;">是否删除此会员卡</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Bdelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getMemberInList, // 获取会员卡列表
  getActivateCard, // 获取会员 卡开卡记录
  getDeleteMemberList, // 会员卡删除列表
  getOutletsIsCardDelete,// 删除会员卡
  getRecoveryCard  // 会员卡删除撤回
} from '@/api/activity.js'
import { log } from 'util'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 领取优惠卷 选择的下拉框
      options: [
        { value: 1, label: '全国通用会员' },
        { value: 2, label: '网点专属会员' },
        { value: 3, label: '地区通用会员' },
        // { value: 4, label: '全国通用会员' },
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
      input1: '',
      input2: '',
       input3: '',
        input4: '',
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

      imageUrl: '',
      input: '',
    }
  },
  created() {
    this.getMember() //会员卡列表
    this.getReceiveList(1)   // 开卡记录
    this.getMembershipCardDel(1)  // 删除记录
  },
  methods: {
    edit() {
      console.info('jojo')
    },
     edit1() {
      console.info('jojo')
    },
    handleChange(file, fileList) {
      console.info(file, fileList)
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    changeInputValue(e) {
      console.info(e, 'jojo')
      // a({num: e}).then(res => { //调后端接口实现改数字

      // })
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
    // 删除会员
    Bdelete(id) {
      getOutletsIsCardDelete({ 'id': this.id }).then(res => {
        console.log('deleteRes', res)
      })
      getMemberInList({ 'aid': this.$route.query.id, 'id': this.id }).then(res => {
        console.log('res', res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getMember(1)
        this.getMembershipCardDel()
        this.newpage = 1
      })
      this.dialogVisible = false
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

// .a1 {
//   width: 112px;
//   height: 40px;
//   font-size: 28px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(90, 90, 90, 1);
//   line-height: 40px;
//   margin-top: 50px;
// }
// .a2 {
//   margin-left: 50px;
//   margin-top: 50px;
// }

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
