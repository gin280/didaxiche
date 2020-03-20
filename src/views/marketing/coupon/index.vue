<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">优惠券管理</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input v-model="searchInput" type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom" @click="getOutList(1)">搜索</div>
      </div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <!-- @tab-click="deletebtn" -->
        <el-tab-pane label="优惠券管理" name="first">
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox size="medium" /> -->
            <el-col :span="2">序号</el-col>
            <el-col :span="3">优惠券名称</el-col>
            <el-col :span="4">创建时间</el-col>
            <el-col :span="4" class="time">有效期</el-col>
            <el-col :span="3">类型</el-col>
            <el-col :span="3">优惠内容</el-col>
            <el-col :span="3">领取情况</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in listCoupon" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox /> -->
            <el-col :span="2">{{ item.sort }}</el-col>
            <el-col :span="3">{{ item.name }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="4" class="time">{{ item.month_type==1?item.month:item.month_start
              +' '+item.month_end }}</el-col>
            <el-col :span="3">
              <div v-if="item.type=='1'">新会员专属</div>
              <div v-else-if="item.type=='2'">网点会员专属</div>
              <div v-else>通用劵</div>
            </el-col>
            <el-col :span="3" class="user-body-identity">满{{ item.money_rule }}元</br>立减{{ item.money_reduce }}元</el-col>
            <el-col :span="3" class="user-body-identity">{{ item.count }}/{{ item.number== 0?'0':item.number }}</el-col>
            <el-col :span="3" class="user-body-operating">
              <svg-icon :span="3" icon-class="hb" @click="goModifyDetails(item.id)" />
              <svg-icon icon-class="ljt" @click="confirmDeletion(item.id)" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="领取记录" name="second">
          <div class="module-flex" style="justify-content: space-between;">
            <div class="module-condition">
              <el-select v-model="consumptionV.name" @change="getCouponreceive(1)">
                <el-option v-for="item in couponName" :key="item.value" :value="item.label" />
              </el-select>
              <el-select v-model="CouponreceiveSearchTimeV" style="margin:0 20px;" @change="getCouponreceive(1)">
                <el-option v-for="item in receiveSearchTimeV" :key="item.value" :value="item.value" />
              </el-select>
              <el-date-picker
                v-model="consumptionTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                @change="getCouponreceive(1)"
                />
            </div>
          </div>
          <el-row class="user-head" type="flex" align="middle">

            <el-col :span="2">序号</el-col>
            <el-col :span="4">优惠劵名称</el-col>
            <el-col :span="3">领取人</el-col>
            <el-col :span="4">领取时间</el-col>
            <el-col :span="4">类型</el-col>
            <el-col :span="3">有效期</el-col>
            <!-- <el-col :span="3">使用情况</el-col> -->
          </el-row>
          <el-row v-for="(item,index) in couponreceive" :key="index" class="user-body" type="flex" align="middle">
            <el-col :span="2">{{ item.id }}</el-col>
            <el-col :span="4" class="user-body-character">{{ item.name }}</el-col>
            <el-col :span="3">{{ item.nickname }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="4" class="user-body-time">
              <div v-if="item.type==='1'">新会员专属</div>
              <div v-else-if="item.type==='2'">网点会员专属</div>
              <div v-else>通用劵</div>
            </el-col>
            <el-col :span="3" class="user-body-identity">{{ item.month }}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="删除记录" name="third">
          <el-row class="user-head" type="flex" align="middle">
            <!-- <el-col :span="1" /> -->
            <!-- <el-checkbox size="medium" /> -->
            <el-col :span="2">序号</el-col>
            <el-col :span="4">优惠名称</el-col>
            <el-col :span="4">删除时间</el-col>
            <el-col :span="4">类型</el-col>
            <!-- <el-col :span="3">参与人数</el-col> -->
            <el-col :span="3">领取人数</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row />
          <el-row v-for="(item,index) in coupondel" :key="index" class="user-body" type="flex" align="middle">
            <!-- <el-col :span="1"> -->
            <!-- <el-checkbox /> -->
            <!-- </el-col> -->
            <el-col :span="2">{{ item.id }}</el-col>
            <el-col :span="4" class="user-body-character">{{ item.name }}</el-col>
            <el-col :span="4"> {{ item.updated_at }} </el-col>

            <el-col :span="4" class="user-body-time">
              <div v-if="item.type==='1'">新会员专属</div>
              <div v-else-if="item.type==='2'">网点会员专属</div>
              <div v-else>通用劵</div>
            </el-col>
            <el-col :span="3">{{ item.count }}</el-col>
            <el-col :span="3" class="user-body-operating">
              <svg-icon icon-class="back" @click="recoveryCoupon(item.id,item.deleted)" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="分类管理" name="fourth">
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3">ID</el-col>
            <el-col :span="6">分类名称</el-col>
          </el-row>
          <el-row v-for="(item,index) in listCouponCategory" :key="index" class="user-body" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3" class="w300">{{ item.id }}</el-col>
            <el-col :span="6"> {{ item.name }} </el-col>
            <el-col :span="2" class="user-body-operating" @click="confirmDeletionID(item.id)" />
            <svg-icon icon-class="ljt" @click="confirmDeletionID(item.id)" />
          </el-row>
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3" @click="addClassification">+</el-col>
            <el-col :span="8">
              <el-input v-model="name" />
            </el-col>
          </el-row>
          <!-- 添加分类 保存分类 -->
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="2" />
            <el-col :span="3">
              <el-button @click="AddClassification=true">添加分类</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary">保存分类</el-button>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="edit">
      <div style="display:flex;">
        <!-- <div v-show="deletes===0" class="edit-detele">批量删除</div> -->
        <div v-show="adds===0" class="edit-detele" @click="goDetails">新增优惠卷</div>
      </div>
      <div>
        <!-- 优惠劵管理分页 -->
        <el-pagination
            v-show="activeName=='first'"
                :current-page.sync="consumptionPage"
                :page-size="8"
                layout="prev, pager, next,jumper"
                :total="consumptionTotal"
                background
                @current-change="getOutList"
                />
                <!-- 领取记录 -->
        <el-pagination
            v-show="activeName=='second'"
            layout="prev, pager, next,jumper"
            :total="couponreceiveTotal"
            :page-size="10"
            background
            :current-page.sync="couponreceivePages"
            @current-change="getCouponreceive"
            />
            <!-- 删除记录  -->
        <el-pagination
            v-show="activeName=='third'"
            class="fenye"
            layout="prev, pager, next,jumper"
            :total="coupondelTotal"
            :page-size="10"
            background
            :current-page.sync="coupondelPages"
            @current-change="getDeleteList"
            />

      </div>
    </div>
    <!-- 删除优惠劵对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:20px;">是否删除此优惠劵</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Adelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除优惠劵分类ID对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleCouponID" width="30%">
      <span style="font-size:20px;">是否删除此优惠劵</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCouponID = false">取 消</el-button>
        <el-button type="primary" @click="Cdelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 优惠劵分类添加  -->
    <el-dialog title="提示" :visible.sync="AddClassification" width="30%">
      <span style="font-size:20px;">是否确定添加分类?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddClassification = false">取 消</el-button>
        <el-button type="primary" @click="Add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
    getCouponInList, // 获取优惠券列表 (进行中)
    getCouponList, // 获取优惠卷列表
    getCouponreceive,  //优惠劵领取
    getCouponDeleteList,  // 删除优惠劵记录列表
    getOutletsDelete,   // 删除优惠劵完成
    getOutletsIsDelete, // 删除优惠劵
    getrecoveryCoupon, // 删除优惠劵恢复
    getClassificationCoupon, // 优惠劵分类列表
    getClassificationCoupondel, // 优惠卷的删除分类
    getClassificationIsdel, // 删除分类（进行中）
    getClassificationCouponAdd // 优惠劵分类的添加
} from '@/api/activity.js'
import { log } from 'util'
export default {
    data() {
        return {
            value: '',
            totalIn: 0, // 进行中活动列表分页
            total: 0, // 结束活动列表分页
            activeName: 'first', // 第一个标签页
            Inlist: [], // 进行中活动列表
            list: [], // 结束活动列表
            searchInput: '', //优惠券管理搜素
            id: '',
            dialogVisible: false, // 删除优惠劵确认框的显示
            newpage: 1, // 进行中活动当前页
            newpageTwo: 1, // 结束活动当前页
            time: [], // 活动时间
            getListCoupon: [],
            listCoupon: [], // 优惠劵列表
            consumption: [], // 优惠劵
            consumptionTime: [], // 优惠劵记录时间数组
            consumptionTimeS: '', // 优惠劵记录开始时间
            consumptionTimeE: '', // 优惠劵记录结束时间
            receiveSearchTimeV: [{ value: '不按时间' }, { value: '领取时间' }],
            CouponreceiveSearchTimeV: '不按时间', // 不按时间
            ReceiveTime: '',
            CouponreceiveV: '',
            couponreceive: [],  // 优惠劵领取记录
            couponreceivePages:1,
            couponreceiveTotal: 0,
            // deletes: 0, // 删除按钮的显示与隐藏
            adds: 0, // 添加优惠劵的显示与隐藏
            coupondel: [], // 删除记录列表
            coupondelTotal:0, // 删除记录的总条数
            coupondelPages:1, // 删除记录的当前页
            getCouponDeleteList: [],
            consumptionV: {  //领取记录
                name:'',
                id:''
            }, // 优惠劵类型
            consumptionTotal: 1, // 优惠劵总条数
            DeleteTime: '', // 删除的时间
            couponName: [   //优惠卷的类型
                { value: '1',label:'新会员专属'},
                { value: '2',label:'网点会员专属' },
                { value: '3',label: '通用劵' }
            ],
            consumptionPage: 1, // 页数
            dialogVisibleCouponID: false, // 删除优惠劵分类ID的显示与隐藏
            listCouponCategory: [], // 分类ID列表
            AddClassification: false,   // 保存分类
            name: '',  // 分类名称
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getInList(1) // 优惠券
        this.getOutList(1)   // 获取优惠券活动列表
        this.getDeleteList(1) // 优惠券删除
        this.getCouponreceive(1) // 获取领取优惠劵
        this.getClassification(1)// 分类列表
    },
    methods: {
        // 新增活动
        goDetails() {
            this.$router.push('/coupon/coupon')
        },
        // 优惠劵领取记录
        getCouponreceive(pages) {
            this.consumptionTimeS = this.consumptionTime[0]
            this.consumptionTimeE = this.consumptionTime[1]
            this.couponName.forEach(val =>{
                if (val.label == this.consumptionV.name) {
                    this.consumptionV.id = val.value
                }
            })
            getCouponreceive({
                'pages':pages,
                'type': this.consumptionV.id,
                'time': this.CouponreceiveSearchTimeV === '不按时间' ? 1 : 2,
                'start_time': this.consumptionTimeS,
                'end_time': this.consumptionTimeE
            }).then(res => {
                this.couponreceive = res.result.model
                this.couponreceiveTotal = res.result.count - 0
            })
        },
        // 修改优惠劵
        goModifyDetails(id) {
            this.$router.push({ path: '/coupon/modifyCoupon', query: { id: id } })
        },
        // 获取进行中优惠列表
        getInList(pages) {
            getCouponInList({ pages: pages }).then(res => {
                this.totalIn = res.result.PageSize
                this.Inlist = res.result.model
            })
        },
        // 获取优惠券列表
        getOutList(pages) {
            getCouponList({ 'pages': pages, 'name': this.searchInput }).then(res => {
                console.log(this.searchInput)
                this.listCoupon = res.result.model
                this.total = res.result.PageSize
                this.consumptionTotal = res.result.count - 0
            })
        },
        // 删除优惠劵记录的列表
        getDeleteList(pages) {
            getCouponDeleteList({ pages: pages }).then(res => {
                this.total = res.result.PageSize
                this.coupondel = res.result.model
                this.coupondelTotal = res.result.count - 0
            })
        },

        // 删除优惠劵
        Adelete() {
            getOutletsIsDelete({ 'id': sessionStorage.getItem('deleteId') }).then(res => {
                console.log('deleteRes', res)
            })
            getCouponInList({ 'aid': sessionStorage.getItem('deleteId'), 'id': this.id }).then(res => {
                console.log('res', res)
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getOutList(1)
                this.getDeleteList()
                // this.newpage = 1
            })
            this.dialogVisible = false
        },
        // 删除询问框的显示
        confirmDeletion(id) {
            sessionStorage.setItem('deleteId', id)
            // console.log(id)
            this.dialogVisible = true
            this.id = id
        },
        // 恢复优惠劵
        recoveryCoupon(id,deleted) {
            console.log(id,deleted)
            getrecoveryCoupon({ id, 'deleted':0}).then(res => {
                this.$message({
                    message: '撤回成功',
                    type: 'success'
                })
                this.getDeleteList()
                this.getOutList(1)
            })
            this.dialogVisible = false
        },
        // 添加分类按钮
        addClassification() {

        },
        // 优惠劵分类列表
        getClassification(id) {
            getClassificationCoupon({ 'id': id }).then(res => {
                this.listCouponCategory = res.result
            })
        },

        // 优惠卷的删除分类
        Cdelete() {
            getClassificationIsdel({ 'id': sessionStorage.getItem('deleteId') }).then(res => {

            })
            // .catch(err => {
            // })
            getClassificationCoupon({ 'aid': sessionStorage.getItem('deleteId'), 'id': this.id }).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getClassificationCoupon(1)
            })
            this.dialogVisibleCouponID = false
        },
        // 删除询问框分类ID的显示
        confirmDeletionID(id) {
            sessionStorage.setItem('deleteId', id)
            // console.log(id)
            this.dialogVisibleCouponID = true
            this.id = id
        },
        //优惠劵分类添加
        Add() {
            getClassificationCouponAdd({
                'aid': sessionStorage.getItem('id'),
                'id': this.id,
                'name': this.name
            }).then(res => {
                this.$message({
                    message: '添加分类成功',
                    type: 'success'
                })
                this.getClassificationCoupon(1)
            })
            this.AddClassification = false
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
  top: calc(100vh - 150px);
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
    padding: 12px 20px;
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
.time {
  width: 150px !important;
}
.fenye{
  margin-top:50px;
}
</style>
