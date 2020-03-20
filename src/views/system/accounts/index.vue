<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">系统分账管理</div>
    </div>
    <div class="user">
      <div class="title">分账设置</div>
      <div class="module">
        <div class="module-title">现金消费分账</div>
        <div class="module-flex">
          <div>
            <div class="module-flex">
              <div class="module-p6">分账比例</div>
              <el-input v-model="input1" class="module-w120" maxlength="10" />
              <el-select v-model="value1" class="module-w70">
                <el-option v-for="item in money" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
          </div>
          <div>
            <div class="module-flex">
              <div class="module-p6">分账时间</div>
              <el-input v-model="input2" class="module-w120" maxlength="10" />
              <el-select v-model="value2" class="module-w70">
                <el-option v-for="item in time" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
          </div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">手续费</div>
            <el-input v-model="input3" class="module-w400" maxlength="10" />
            <el-select v-model="value3" class="module-w70">
              <el-option v-for="item in money" :key="item.value" :value="item.value" />
            </el-select>
          </div>
          <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">免手续费金额区间</div>
            <el-input v-model="input4" class="module-w300">
              <template slot="prepend">开始金额￥</template>
            </el-input>
            <el-input v-model="input5" class="module-w300">
              <template slot="prepend">结束金额￥</template>
            </el-input>
          </div>
          <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
            例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">通用会员卡分账</div>
        <div class="module-flex">
          <div>
            <div class="module-flex">
              <div class="module-p6">
                <div>分账比例</div>
                <p>(500张会员卡前)</p>
              </div>
              <el-input v-model="input6" class="module-w120" maxlength="10" />
              <el-select v-model="value4" class="module-w70">
                <el-option v-for="item in money" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
          </div>
          <div>
            <div class="module-flex">
              <div class="module-p6">分账时间</div>
              <el-input v-model="input7" class="module-w120" maxlength="10" />
              <el-select v-model="value5" class="module-w70">
                <el-option v-for="item in time" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
          </div>
        </div>
        <div class="module-flex">
          <div>
            <div class="module-flex">
              <div class="module-p6">
                <div>分账比例</div>
                <p>(500张会员卡后)</p>
              </div>
              <el-input v-model="input8" class="module-w120" maxlength="10" />
              <el-select v-model="value6" class="module-w70">
                <el-option v-for="item in money" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
          </div>
          <div>
            <div class="module-flex">
              <div class="module-p6">分账时间</div>
              <el-input v-model="input9" class="module-w120" maxlength="10" />
              <el-select v-model="value7" class="module-w70">
                <el-option v-for="item in time" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
          </div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">手续费</div>
            <el-input v-model="input10" class="module-w400" maxlength="10" />
            <el-select v-model="value8" class="module-w70">
              <el-option v-for="item in money" :key="item.value" :value="item.value" />
            </el-select>
          </div>
          <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">免手续费金额区间</div>
            <el-input v-model="input11" class="module-w300">
              <template slot="prepend">开始金额￥</template>
            </el-input>
            <el-input v-model="input12" class="module-w300">
              <template slot="prepend">结束金额￥</template>
            </el-input>
          </div>
          <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
            例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">专属会员卡分账</div>
        <div class="module-flex">
          <div>
            <div class="module-flex">
              <div class="module-p6">分账比例</div>
              <el-input v-model="input13" class="module-w120" maxlength="10" />
              <el-select v-model="value9" class="module-w70">
                <el-option v-for="item in money" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
          </div>
          <div>
            <div class="module-flex">
              <div class="module-p6">分账时间</div>
              <el-input v-model="input14" class="module-w120" maxlength="10" />
              <el-select v-model="value10" class="module-w70">
                <el-option v-for="item in time" :key="item.value" :value="item.value" />
              </el-select>
            </div>
            <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
          </div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">手续费</div>
            <el-input v-model="input15" class="module-w400" maxlength="10" />
            <el-select v-model="value11" class="module-w70">
              <el-option v-for="item in money" :key="item.value" :value="item.value" />
            </el-select>
          </div>
          <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
        </div>
        <div>
          <div class="module-flex">
            <div class="module-p10">免手续费金额区间</div>
            <el-input v-model="input16" class="module-w300">
              <template slot="prepend">开始金额￥</template>
            </el-input>
            <el-input v-model="input17" class="module-w300">
              <template slot="prepend">结束金额￥</template>
            </el-input>
          </div>
          <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
            例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">分账账户</div>
        <div class="module-flex">
          <div class="module-p6">商户账号</div>
          <el-input v-model="input18" class="module-w400" maxlength="10" />
        </div>
      </div>
      <div class="save" @click="dividendT=true">确认保存</div>
    </div>
    <!-- 分账确认保存 -->
    <el-dialog title="提示" :visible.sync="dividendT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dividendT = false">取 消</el-button>
        <el-button type="primary" @click="setOutletsS">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
    getSystemAccounting, // 系统分账详情
    setSystemAccounting // 分账修改
//   AddSystemAccounting // 分账添加
} from '@/api/system.js'
export default {
    data() {
        return {
            money: [{ value: '元' }, { value: '%' }],
            time: [{ value: '天' }, { value: '月' }],
            value1: '元', // 现金分账比例单位
            value2: '天', // 现金分账时间单位
            value3: '%', // 现金手续费单位
            value4: '%', // 通用会员卡分账比例单位(500前)
            value5: '月', // 通用会员卡分账时间单位(500前)
            value6: '%', // 通用会员卡分账比例单位(500后)
            value7: '月', // 通用会员卡分账时间单位(500后)
            value8: '%', // 通用会员卡手续费单位
            value9: '%', // 专属会员卡分账比例单位
            value10: '月', // 专属会员卡分账时间单位
            value11: '%', // 专属会员卡手续费单位
            input1: '', // 现金分账比例
            input2: '', // 现金分账时间
            input3: '', // 现金手续费
            input4: '', // 现金免手续费开始
            input5: '', // 现金免手续费结束
            input6: '', // 通用会员卡分账比例(500前)
            input7: '', // 通用会员卡分账时间(500前)
            input8: '', // 通用会员卡分账比例(500后)
            input9: '', // 通用会员卡分账时间(500后)
            input10: '', // 通用会员卡手续费
            input11: '', // 通用会员卡免手续费开始
            input12: '', // 通用会员卡免手续费结束
            input13: '', // 专属会员卡分账比例
            input14: '', // 专属会员卡分账时间
            input15: '', // 专属会员卡手续费
            input16: '', // 专属会员卡免手续费开始
            input17: '', // 专属会员卡免手续费结束
            input18: '', // 商户账号
            dividendT: false // 修改分账询问弹窗
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getSystemAccounting(1) // 获取系统分账详情
    // this.AddSystemAccounting(1) // 添加系统分账详情
    },
    methods: {
    //  获取系统分账详情
        getSystemAccounting() {
            getSystemAccounting({ 'id': this.id }).then(res => {
                this.id = res.result.model.id
                this.input1 = res.result.model.cash_scale
                this.input2 = res.result.model.cash_date
                this.input3 = res.result.model.cash_service_fee
                this.input4 = res.result.model.cash_start_money
                this.input5 = res.result.model.cash_end_money
                this.value1 = res.result.model.cash_scale_type === '0' ? '%' : '元'
                this.value2 = res.result.model.cash_date_type === '0' ? '天' : '月'
                this.value3 = res.result.model.cash_service_fee_type === '0' ? '%' : '元'

                this.input6 = res.result.model.common_card_scale
                this.input7 = res.result.model.common_date
                this.input8 = res.result.model.common_card_scale500
                this.input9 = res.result.model.common_date500
                this.input10 = res.result.model.common_service_fee
                this.input11 = res.result.model.common_start_money
                this.input12 = res.result.model.common_end_money
                this.value4 = res.result.model.common_card_scale_type === '0' ? '%' : '元'
                this.value5 = res.result.model.common_date_type === '0' ? '天' : '月'
                this.value6 = res.result.model.common_card_scale500_type === '0' ? '%' : '元'
                this.value7 = res.result.model.common_date500_type === '0' ? '天' : '月'
                this.value8 = res.result.model.common_service_fee_type === '0' ? '%' : '元'

                this.input13 = res.result.model.exclusive_card_scale
                this.input14 = res.result.model.exclusive_date
                this.input15 = res.result.model.exclusive_service_fee
                this.input16 = res.result.model.exclusive_start_money
                this.input17 = res.result.model.exclusive_end_money
                this.value9 = res.result.model.exclusive_card_scale_type === '0' ? '%' : '元'
                this.value10 = res.result.model.exclusive_date_type === '0' ? '天' : '月'
                this.value11 = res.result.model.exclusive_service_fee_type === '0' ? '%' : '元'

                this.input18 = res.result.model.account
            })
        },
        setOutletsS(id) {
            if (this.input1 === '' || this.input2 === '' || this.input3 === '' || this.input4 === '' || this.input5 === '' || this.input6 === '' || this.input7 === '' || this.input8 === '' || this.input9 === '' || this.input10 === '' || this.input11 === '' || this.input12 === '' || this.input13 === '' || this.input14 === '' || this.input15 === '' || this.input16 === '' || this.input17 === '' || this.input18 === '') {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            // 更改系统分账记录
            setSystemAccounting({
                'id': this.id,
                'cash_scale': this.input1,
                'cash_scale_type': this.value1 === '元' ? '1' : '0',
                'cash_date': this.input2,
                'cash_date_type': this.value2 === '月' ? '1' : '0',
                'cash_service_fee': this.input3,
                'cash_service_fee_type': this.value3 === '元' ? '1' : '0',
                'cash_start_money': this.input4,
                'cash_end_money': this.input5,
                'common_card_scale': this.input6,
                'common_card_scale_type': this.value4 === '元' ? '1' : '0',
                'common_date': this.input7,
                'common_date_type': this.value5 === '月' ? '1' : '0',
                'common_card_scale500': this.input8,
                'common_card_scale500_type': this.value6 === '元' ? '1' : '0',
                'common_date500': this.input9,
                'common_date500_type': this.value7 === '月' ? '1' : '0',
                'common_service_fee': this.input10,
                'common_service_fee_type': this.value8 === '元' ? '1' : '0',
                'common_start_money': this.input11,
                'common_end_money': this.input12,
                'exclusive_card_scale': this.input13,
                'exclusive_card_scale_type': this.value9 === '元' ? '1' : '0',
                'exclusive_date': this.input14,
                'exclusive_date_type': this.value10 === '月' ? '1' : '0',
                'exclusive_service_fee': this.input15,
                'exclusive_service_fee_type': this.value11 === '元' ? '1' : '0',
                'exclusive_start_money': this.input16,
                'exclusive_end_money': this.input17,
                'account': this.input18
            }).then(res => {
                this.$message({
                    message: '修改分账成功',
                    type: 'success'
                })
            })
            this.dividendT = false
        }

    }
}

</script>
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
  }
}
.title{
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
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
    font-size: 20px;
    line-height: 23px;
    &-project {
      text-align: right;
      margin: 50px 50px 0 50px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 6em;
          margin-right: 1em;
        }
      }
    }
  }
}

.module {
  border-top: 1px solid #cfcdcd;
  margin-bottom: 20px;
  &-condition {
    margin: 20px 0;
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
    width: 90px;
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
</style>
