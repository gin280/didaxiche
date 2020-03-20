<template>
  <div class="survey">
    <div class="survey_title">
      {{ id==''?'新增会员卡':'修改会员卡' }}
    </div>
    <div class="frame">
      <el-tabs
        v-model="activeName"
        class="tabs"
      >
        <el-tab-pane
          label="基本信息"
          name="1"
        />
        <el-tab-pane
          label="领取设置"
          name="2"
        />
      </el-tabs>
      <!--基本信息-->
      <div
        v-show="activeName==1"
        class="info"
      >
        <!--会员类型-->
        <div class="member_type">
          <div class="name">
            会员卡类型
          </div>
          <el-radio-group
            v-model="typeRadio"
            @change="typeChange"
          >
            <el-radio
              class="radio"
              :label="1"
            >全国通用卡</el-radio>
            <el-radio
              class="radio"
              :label="2"
            >网点专属卡</el-radio>
            <el-radio
              class="radio"
              :label="3"
            >地区通用卡</el-radio>
          </el-radio-group>
        </div>
        <!--网点选择-->
        <div
          v-show="outletsStatus"
          class="type_PCD"
        >
          <div class="type_PCD_title">
            选择网点
          </div>
          <div class="threePCD">
            <v-distpicker
              :province="placeholders.province"
              :city="placeholders.city"
              :area="placeholders.area"
              @selected="getArea"
            />
          </div>
          <div class="type_PCD_list">
            <div
              v-for="(item,index) in outletsList"
              :key="index"
              class="type_PCD_item"
            >
              <div class="PCD_item_name">
                {{ item.name }}
              </div>
              <div class="PCD_item_radio">
                <el-radio
                  v-model="outletsId"
                  :label="item.id"
                >&nbsp;</el-radio>
              </div>
            </div>
          </div>
          <div class="type_PCD_btn">
            <div @click="outletsBtn">确定</div>
          </div>
        </div>
        <!--地区选择-->
        <div
          v-show="areaSelectStatus"
          class="areaSelect"
        >
          <div class="areaSelect_title">
            地区选择
          </div>
          <div class="areaSelect_three">
            <v-distpicker
              :province="areaSelect.province"
              :city="areaSelect.city"
              :area="areaSelect.area"
              @selected="getAreaSelect"
            />
          </div>
          <div class="areaSelect_range">
            <el-select
              v-model="areaRange"
              placeholder="请选择范围"
            >
              <el-option
                v-for="item in areaSelectRange"
                :key="item.key"
                :value="item.name"
                :label="item.name"
              />
            </el-select>
          </div>
          <div class="areaSelect_btn">
            <div @click="areaSelectBtn">确定</div>
          </div>
        </div>
        <!--会员卡名称-->
        <div class="member_name">
          <div class="name">
            会员卡名称
          </div>
          <div class="member_input">
            <el-input
              v-model="member_name"
              placeholder="请输入会员卡名称"
            />
          </div>
        </div>
        <!--网点管理样式-->
        <div class="card_style">
          <div class="name">
            网点管理样式
          </div>
          <div class="cardUrl">
            {{ cardUrl }}
          </div>
          <el-upload
            class="elUpload"
            :action="uploadUrl"
            :on-success="addImg"
          >
            <div class="addImg">
              {{ cardUrl==''?'添加图片':'更改图片' }}
            </div>
          </el-upload>
        </div>
        <!--添加的图片-->
        <div
          v-if="cardUrl"
          class="cardImg"
        >
          <el-image
            :src="cardUrl"
            fit="scale-down"
          />
        </div>
        <!--会员权益-->
        <div class="member_profit">
          <div class="name">
            会员权益
          </div>
          <div
            class="add_profit"
            @click="addItem"
          >
            添加会员权益
          </div>

        </div>
        <div class="m_list">
          <div
            :key="index"
            v-for="(i, index) of list"
            style="height:100px;margin-bottom:10px; background: pink;color:white;font-size:16px;"
          >
            <span>{{index + 1}}</span>
            <el-input v-model="i.title"></el-input>
            <el-button @click="del(index)">删除</el-button>
          </div>
        </div>
        <!--添加权益框-->
        <div
          v-show="profitStatus"
          class="profit_frame"
        >
          <div class="profit_item">
            <div class="profit_font">
              名称
            </div>
            <div class="profit_input">
              <el-input
                v-model="profitItem[0]"
                placeholder="请输入权益名称"
              />
            </div>
          </div>
          <div class="profit_item">
            <div class="profit_font">
              标题
            </div>
            <div class="profit_input">
              <el-input
                v-model="profitItem[1]"
                placeholder="请输入权益标题"
              />
            </div>
          </div>
          <div class="profit_item">
            <div class="profit_font">
              颜色
            </div>
            <div class="profit_input">
              <el-input
                v-model="profitItem[2]"
                placeholder="请选择颜色"
              />
            </div>
            <el-color-picker v-model="profitItem[2]" />
          </div>
          <div class="profit_item">
            <div class="profit_font">
              描述
            </div>
            <div class="profit_input">
              <el-input
                v-model="profitItem[3]"
                placeholder="请输入权益描述"
              />
            </div>
          </div>
          <div class="profit_btn">
            <div @click="addProfit">确定</div>
          </div>
        </div>
        <!--权益列表-->
        <div class="interestList">
          <div
            v-for="(item,index) in interestList"
            :key="index"
            class="interestItem"
          >
            <div
              class="interestItem_circle"
              :style="{background:item[2]}"
            >
              {{ item[0] }}
            </div>
            <div class="interestItem_title">
              {{ item[1] }}
            </div>
            <div class="interestItem_stitle">
              {{ item[3] }}
            </div>
            <div
              class="interestItem_delete"
              @click="interestDelete(index)"
            >
              <img
                src="../../../assets/global/deleteIco.png"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <!--领取设置-->
      <div
        v-show="activeName==2"
        class="receive"
      >
        <!--有效期-->
        <div class="expiration_date">
          <div class="name">
            有效期
          </div>
          <el-radio-group v-model="expirationRadio">
            <el-radio :label="1">
              <el-input v-model="expirationDate" />
              <div>个月</div>
            </el-radio>
            <el-radio :label="3">永久</el-radio>
          </el-radio-group>
        </div>
        <!--价格-->
        <div class="price">
          <div class="name">
            价格
          </div>
          <div class="price_input">
            <el-input
              v-model="price"
              placeholder="请输入金额"
            />
          </div>
          <div class="price_yuan">
            元
          </div>
        </div>
        <!--价格小提醒-->
        <div class="stitle">
          用户购买会员卡需支付的金额，最多可以保留两位小数
        </div>
        <!--次数-->
        <div class="frequency">
          <div class="name">
            次数
          </div>
          <div class="frequency_input">
            <el-input
              v-model="frequency"
              placeholder="请输入可用次数"
            />
          </div>
        </div>
        <!--次数小标题-->
        <div class="stitle">
          会员卡可用次数
        </div>
        <!--库存-->
        <div class="stock">
          <div class="name">
            库存
          </div>
          <div class="stock_input">
            <el-input
              v-model="stock"
              placeholder="请输入库存数"
            />
          </div>
        </div>
        <!--库存小标题-->
        <div class="stitle">
          会员卡剩余可以领取的数量
        </div>
        <!--状态-->
        <div class="status">
          <div class="name">
            状态
          </div>
          <el-radio-group v-model="status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">停发</el-radio>
          </el-radio-group>
        </div>
        <!--使用须知-->
        <div class="notice">
          <div class="name">
            使用须知
          </div>
          <div class="notice_input">
            <el-input
              v-model="notice_input"
              type="textarea"
              :rows="10"
              placeholder="请描述使用须知"
            />
          </div>
        </div>
      </div>
      <!--确认新增-->
      <div
        class="new_btn"
        @click="btn"
      >
        {{ id==''?'确定新增':'确定修改' }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  inquireOutlets,                                  //查询网点
  addCard,                                         //新增会员卡
  modifyCard,                                      //修改会员卡
  detailsCard                                      //获取会员卡详情
} from '../../../api/activity.js'
export default {
  data() {
    return {
      list: [], // 会员权益
      id: '',                                                      // 当前id，空则是新建
      activeName: '1',                                            // 当前tab的name值
      typeRadio: '',                                              // 会员类型选项
      placeholders: {                                             // 网点省市区选择
        province: '',                                           // 省份
        city: '',                                               // 市
        area: ''                                                // 县区
      },
      member_name: '',                                            // 会员名称
      cardUrl: '',                                                // 卡片样式链接
      profitItem: ['', '', '', ''],                               // 当前新增权益 下标：0.名字 1.标题 2.颜色 3.小标题
      profitStatus: false,                                         // 添加的会员权益是否显示
      interestList: [],                                           // 权益列表
      expirationRadio: '',                                        // 有效期选项
      expirationDate: '',                                         // 有效期时间
      price: '',                                                  // 价格
      frequency: '',                                              // 可用次数
      stock: '',                                                  // 库存
      status: '',                                                 // 状态
      notice_input: '',                                           // 使用须知
      outletsId: '',                                              // 网点id
      outletsStatus: false,                                       // 网点选择是否显示
      outletsList: [],                                            // 网点列表
      areaSelect: {                                               // 地区省市区选择
        province: '',                                           // 省份
        city: '',                                               // 市
        area: ''                                                // 县区
      },
      areaSelectRange: [                                          // 地区范围
        { name: '全省', key: '1' },
        { name: '全市', key: '2' },
        { name: '全区', key: '3' }
      ],
      areaRange: '',                                              // 地区范围选中值
      areaSelectStatus: false,                                    // 地区选择是否显示
    }
  },
  mounted() {
    if (this.$route.query.id) {
      //获取当前id的数据
      this.id = this.$route.query.id
      detailsCard({ id: this.id })
        .then(res => {
          const result = res.result
          this.typeRadio = result.type
          this.outletsId = result.bid || ''
          this.areaSelect.province = result.dprovince || ''
          this.areaSelect.city = result.dcity || ''
          this.areaSelect.area = result.darea || ''
          if (result.diqu) {
            this.areaSelectRange.forEach(val => {
              if (val.key == result.diqu) {
                this.areaRange = val.name
              }
            })
          } else {
            this.areaRange = ''
          }
          this.member_name = result.title
          this.cardUrl = result.color
          this.interestList = result.remarks
          this.expirationRadio = result.month_type
          this.expirationDate = result.month || ''
          this.price = result.money
          this.frequency = result.number
          this.stock = result.stock
          this.status = result.status
          this.notice_input = result.requirement
        })
    }
  },
  methods: {
    del(index) {
      this.list.splice(index, 1);
    },
    addItem() {
      let item = { title: '', count: '', unit: '' };
      this.list.push(item);
    },
    // 会员卡类型变化监听
    typeChange(e) {
      if (e == 1) {
        this.outletsStatus = false
        this.areaSelectStatus = false
      } else if (e == 2) {
        this.outletsStatus = true
        this.areaSelectStatus = false
      } else if (e == 3) {
        this.areaSelectStatus = true
        this.outletsStatus = false
      }
    },
    // 网点省市区选择及获取网点
    getArea(data) {
      this.placeholders.province = data.province.value
      this.placeholders.city = data.city.value
      this.placeholders.area = data.area.value
      if (data.province.value == '省' || data.city.value == '市' || data.area.value == '区') {
        this.outletsList = []
      } else {
        inquireOutlets({
          province: data.province.value,
          city: data.city.value,
          area: data.area.value
        })
          .then(res => {
            this.outletsList = res.result
          })
      }
    },
    // 地区省市区选择
    getAreaSelect(data) {
      this.areaSelect.province = data.province.value
      this.areaSelect.city = data.city.value
      this.areaSelect.area = data.area.value
    },
    //选择完网点点击确定
    outletsBtn() {
      if (this.outletsId == '') {
        this.$message({
          message: '您未选择网点',
          type: 'warning'
        })
      } else {
        this.outletsStatus = false
      }
    },
    //选择地区完点击确定
    areaSelectBtn() {
      if (this.areaSelect.province == '' || this.areaSelect.province == '省' || this.areaSelect.city == '' || this.areaSelect.city == '市' || this.areaSelect.area == '' || this.areaSelect.area == '区') {
        this.$message({
          message: '您未完整选择地区',
          type: 'warning'
        })
      } else if (this.areaRange == '') {
        this.$message({
          message: '您未选择代理范围',
          type: 'warning'
        })
      } else {
        this.areaSelectStatus = false
      }
    },
    //图片上传回调
    addImg(response) {
      this.cardUrl = response.result.data
    },
    //添加权益
    addProfit() {
      if (this.profitItem[0] == '' || this.profitItem[1] == '' || this.profitItem[2] == '' || this.profitItem[3] == '') {
        this.$message({
          message: '请把会员权益补充完整',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.profitStatus = false
        this.interestList.push(this.profitItem)
        this.profitItem = ['', '', '', '']
      }
    },
    //删除当前权益
    interestDelete(index) {
      this.interestList.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    //点击确定
    btn() {
      if (
        this.typeRadio == '' ||
        this.member_name == '' ||
        this.cardUrl == '' ||
        this.interestList.length == 0 ||
        this.expirationRadio == '' ||
        this.price == '' ||
        this.frequency == '' ||
        this.stock == '' ||
        this.status == '' ||
        this.notice_input == ''
      ) {
        this.$message.error('您未完善会员卡资料')
      } else if (this.typeRadio == 2 && this.outletsId == '') {
        this.$message.error('您未选择网点')
      } else if (
        this.typeRadio == 3 &&
        (
          this.areaSelect.province == '' ||
          this.areaSelect.city == '' ||
          this.areaSelect.area == '' ||
          this.areaRange == ''
        )
      ) {
        this.$message.error('您未完善地区选择')
      } else if (this.expirationRadio == 1 && this.expirationDate == '') {
        this.$message.error('您未完善有效期')
      } else if (this.expirationRadio == 1 && this.expirationDate != '' && !(/(^[1-9]\d*$)/.test(this.expirationDate))) {
        this.$message.error('有效期只能填写正整数')
      } else if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(this.price))) {
        this.$message.error('价格只能填写正数')
      } else if (!(/(^[1-9]\d*$)/.test(this.frequency))) {
        this.$message.error('可用次数只能填写正整数')
      } else if (!(/(^[1-9]\d*$)/.test(this.stock))) {
        this.$message.error('可用次数只能填写正整数')
      } else {
        let obj = {
          type: this.typeRadio,
          title: this.member_name,
          color: this.cardUrl,
          remarks: this.interestList,
          month_type: this.expirationRadio,
          money: this.price,
          number: this.frequency,
          stock: this.stock,
          status: this.status,
          requirement: this.notice_input
        }
        if (this.typeRadio == 2) {
          obj = Object.assign(obj, { bid: this.outletsId })
        } else if (this.typeRadio == 3) {
          obj = Object.assign(obj, {
            diqu: this.areaRange,
            province: this.areaSelect.province,
            city: this.areaSelect.city,
            area: this.areaSelect.area
          })
          this.areaSelectRange.forEach(val => {
            if (val.name == this.areaRange) {
              obj = Object.assign(obj, { diqu: val.key })
            }
          })
        }
        if (this.expirationRadio == 1) {
          obj = Object.assign(obj, { month: this.expirationDate })
        }
        if (this.id == '') {
          //新增会员卡
          addCard(obj)
            .then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.go(-1)
            })
        } else {
          //修改会员卡
          modifyCard(Object.assign(obj, { id: this.id }))
            .then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.go(-1)
            })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.survey {
  padding: 15px 20px;
  .survey_title {
    color: #222222;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .frame {
    background: #ffffff;
    padding: 20px 30px;
    .name {
      width: 180px;
      text-align: right;
      font-size: 20px;
      color: #5a5a5a;
      margin-right: 30px;
    }
    .info {
      margin-top: 54px;
      .member_type {
        display: flex;
        .radio {
          transform: scale(1.3);
          font-size: 20px;
          margin-left: 100px;
        }
      }
      .type_PCD {
        width: 590px;
        padding: 14px 28px;
        margin-top: 20px;
        margin-left: 300px;
        box-sizing: border-box;
        border: 1px solid rgba(180, 180, 180, 1);
        .type_PCD_title {
          color: #7c7c7c;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .type_PCD_list {
          .type_PCD_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
          }
        }
        .type_PCD_btn {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          > div {
            width: 80px;
            height: 24px;
            text-align: center;
            border-radius: 16px;
            line-height: 24px;
            font-size: 16px;
            color: #f1f1f1;
            background: #2ca9fc;
            cursor: pointer;
          }
        }
      }
      .areaSelect {
        width: 590px;
        padding: 14px 28px;
        margin-top: 20px;
        margin-left: 500px;
        box-sizing: border-box;
        border: 1px solid rgba(180, 180, 180, 1);
        .areaSelect_title {
          color: #7c7c7c;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .areaSelect_range {
          margin-top: 20px;
        }
        .areaSelect_btn {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          > div {
            width: 80px;
            height: 24px;
            text-align: center;
            border-radius: 16px;
            line-height: 24px;
            font-size: 16px;
            color: #f1f1f1;
            background: #2ca9fc;
            cursor: pointer;
          }
        }
      }
      .member_name {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .member_input {
          .el-input {
            width: 400px;
          }
        }
      }
      .card_style {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .cardUrl {
          width: 600px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #cbcbcb;
          padding: 0 20px;
          font-size: 20px;
          color: #7c7c7c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .elUpload {
          width: 100px;
          height: 40px;
          overflow: hidden;
          .addImg {
            width: 100px;
            height: 40px;
            background: #2ca9fc;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .cardImg {
        width: 200px;
        height: 120px;
        margin-top: 20px;
        margin-left: 210px;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      .member_profit {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .add_profit {
          width: 140px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          background: #2ca9fc;
          cursor: pointer;
        }
      }
      .profit_frame {
        margin-left: 210px;
        padding: 18px;
        border: 1px solid #b4b4b4;
        width: 500px;
        margin-top: 20px;
        .profit_item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .profit_font {
            color: #424242;
            font-size: 16px;
            margin-right: 16px;
          }
          .el-input {
            width: 300px;
          }
        }
        .profit_btn {
          display: flex;
          justify-content: flex-end;
          div {
            width: 100px;
            height: 30px;
            border-radius: 16px;
            line-height: 30px;
            text-align: center;
            background: #2ca9fc;
            font-size: 16px;
            color: #f1f1f1;
            cursor: pointer;
          }
        }
      }
      .interestList {
        width: 1000px;
        margin-left: 210px;
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        .interestItem {
          width: 180px;
          margin-right: 20px;
          position: relative;
          margin-bottom: 20px;
          .interestItem_circle {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            text-align: center;
            line-height: 90px;
            font-size: 24px;
            color: #ffffff;
            margin: 0 auto;
          }
          .interestItem_title {
            margin-top: 4px;
            font-size: 20px;
            color: #252525;
            font-weight: bold;
            text-align: center;
          }
          .interestItem_stitle {
            margin-top: 4px;
            color: #858585;
            font-size: 16px;
            text-align: center;
          }
          .interestItem_delete {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 0;
            right: 20px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .interestItem:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
    .receive {
      margin-top: 54px;
      .expiration_date {
        display: flex;
        align-items: center;
        .el-radio-group {
          display: flex;
          align-items: center;
          .el-radio {
            transform: scale(1.3);
            display: flex;
            align-items: center;
            margin-left: 50px;
            .el-input {
              width: 100px;
            }
            input {
              height: 30px;
            }
            div {
              display: inline-block;
            }
          }
        }
      }
      .price {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .price_input {
          width: 300px;
        }
        .price_yuan {
          width: 50px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          color: #7c7c7c;
          border: 1px solid #cbcbcb;
        }
      }
      .stitle {
        font-size: 16px;
        margin-left: 210px;
        margin-top: 10px;
        color: #7c7c7c;
      }
      .frequency {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .frequency_input {
          width: 300px;
        }
      }
      .stock {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .stock_input {
          width: 300px;
        }
      }
      .status {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .el-radio {
          transform: scale(1.3);
          margin-right: 100px;
          margin-left: 20px;
        }
      }
      .notice {
        margin-top: 40px;
        display: flex;
        .el-textarea {
          width: 800px;
        }
      }
    }
    .new_btn {
      width: 200px;
      height: 50px;
      border-radius: 10px;
      background: #2ca9fc;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
      font-weight: bold;
      margin-top: 40px;
      margin-left: 600px;
      cursor: pointer;
    }
  }
}
</style>
