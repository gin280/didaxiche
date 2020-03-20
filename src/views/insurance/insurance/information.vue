<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">设备管理</div>
    </div>

    <div class="user">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基本信息"
          name="basic"
        >
          <div class="basic-information">
            <ul class="basic-information-project">
              <li>
                <p>机器标号</p>
                <el-input
                  v-model="number"
                  class="w700"
                />
              </li>
              <li>
                <p>终端编号</p>
                <el-input
                  v-model="terminal_code"
                  class="w700"
                />
                <!-- <div>{{}}</div> -->
              </li>
              <li>
                <p>项目标识</p>
                <el-input
                  v-model="project_identifier"
                  class="w700"
                />
              </li>
              <li>
                <p>组标识</p>
                <el-input
                  v-model="group_identifier"
                  class="w700"
                />
              </li>
              <li>
                <p>所属网点</p>
                <div
                  class="PCDCilck"
                  @click="dotShow=true"
                >{{ outletsId.name }}</div>
              </li>
              <!-- 选择网点 -->
              <div
                v-show="dotShow"
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
                        v-model="outletsId.id"
                        :label="item.id"
                      >&nbsp;</el-radio>
                    </div>
                  </div>
                </div>
                <div class="type_PCD_btn">
                  <div @click="outletsBtn">确定</div>
                </div>
              </div>
              <li>
                <p>状态</p>
                <div v-if="status=='1'">正常运行</div>
                <div v-else-if="status=='2'">故障维修</div>
                <div v-else-if="status=='3'">正在洗车</div>
                <div v-else>设备离线</div>
              </li>
            </ul>
            <div
              class="save-modify"
              @click="basicT = true"
            >保存修改</div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="机器控制"
          name="mechanics"
        >
          <div
            class="basic-information"
            v-loading="m_status.status==4"
            element-loading-text="设备离线"
            element-loading-spinner="el-icon-remove"
          >
            <ul class="basic-information-project">
              <li>
                <p>机器状态</p>
                <div>
                  <div
                    v-if="m_status.status==1"
                    style="color:#00BC3F;font-weight:700"
                  >空闲中</div>
                  <div
                    v-else-if="m_status.status==2"
                    style="color:#d80000;font-weight:700"
                  >机器故障</div>
                  <div
                    v-else-if="m_status.status==3"
                    style="color:#FF9900;font-weight:700"
                  >使用中</div>
                  <div
                    v-else-if="m_status.status==4"
                    style="color:#7e7e7e;font-weight:700"
                  >设备离线</div>
                </div>
              </li>
              <li>
                <p>洗车模式</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M502==1?'currerEnable':''"
                    @click="pattern(1)"
                  >标准模式</div>
                  <div
                    class="cursor"
                    :class="m_status.M500==1?'currerEnable':''"
                    @click="pattern(2)"
                  >普通模式</div>
                </div>
                <div class="right">洗车次数：{{ m_status.MW50 }}次</div>
                <!-- <el-button native-type="reset">重置</el-button> -->
              </li>
              <li class="MachineControl">
                <el-button
                  @click="dieOrder"
                  style="position: absolute;top: 0;left: 895px"
                  type="danger"
                >结束当前订单</el-button>
                <p>机器控制</p>
                <div>
                  <div
                    class="cursor"
                    :class="m_status.M202==1?'currerEnable':''"
                    @click="enabled('M202')"
                  >启用</div>
                  <div
                    class="cursor"
                    :class="m_status.M204==1?'currerProhibit':''"
                    @click="stopIt('M204')"
                  >停止</div>
                  <div
                    class="cursor"
                    :class="m_status.M510==1?'currerEnable':''"
                    @click="drying('M510')"
                  >车头不洗</div>
                  <div
                    class="cursor"
                    :class="m_status.M511==1?'currerEnable':''"
                    @click="drying('M511')"
                  >车尾不洗</div>
                  <div
                    class="cursor"
                    :class="m_status.M200==1?'currerEnable':''"
                    @click="drying('M200')"
                  >风干启动</div>
                  <div
                    class="cursor"
                    :class="m_status.M201==1?'currerEnable':''"
                    @click="drying('M201')"
                  >镀膜启动</div>
                </div>
                <div>
                  <div
                    class="blue reset cursor"
                    @click="reset('M203')"
                  > 复位</div>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="basic-information"
            v-loading="m_status.status==4"
            element-loading-text=" "
            element-loading-spinner="el-icon-close"
          >
            <p class="title">机器调试</p>

            <ul
              class="basic-information-project debugging"
              v-loading="m_status.status==4"
              element-loading-text=" "
              element-loading-spinner="el-icon-close"
            >
              <li>
                <p>侧刷禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M509==1?'currerEnable':''"
                    @click="sideBrush(1,'M509')"
                  > 开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M509==0?'currerProhibit':''"
                    @click="sideBrush(0,'M509')"
                  >关闭</div>

                </div>
              </li>
              <li>
                <p>群刷禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M415==1?'currerEnable':''"
                    @click="sideBrush(1,'M415')"
                  >开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M415==0?'currerProhibit':''"
                    @click="sideBrush(0,'M415')"
                  >关闭</div>
                </div>
              </li>
              <li>
                <p>轮刷禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M416==1?'currerEnable':''"
                    @click="sideBrush(1,'M416')"
                  >开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M416==0?'currerProhibit':''"
                    @click="sideBrush(0,'M416')"
                  >关闭</div>
                </div>
              </li>
              <li>
                <p>顶刷禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M508==1?'currerEnable':''"
                    @click="sideBrush(1,'M508')"
                  >开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M508==0?'currerProhibit':''"
                    @click="sideBrush(0,'M508')"
                  >关闭</div>
                </div>
              </li>
            </ul>
            <ul
              class="basic-information-project debugging"
              v-loading="m_status.status==4"
              element-loading-text=""
              element-loading-spinner="el-icon-close"
            >

              <li>
                <p>地喷启动</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M217==1?'currerEnable':''"
                    @click="sideBrush(1,'M217')"
                  >启用</div>
                  <div
                    class="cursor"
                    :class="m_status.M217==0?'currerProhibit':''"
                    @click="sideBrush(0,'M217')"
                  >禁用</div>
                </div>
              </li>
              <li>
                <p>水蜡禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M417==1?'currerEnable':''"
                    @click="sideBrush(1,'M417')"
                  >开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M417==0?'currerProhibit':''"
                    @click="sideBrush(0,'M417')"
                  >关闭</div>
                </div>
              </li>
              <li>
                <p>泡沫禁用</p>
                <div>
                  <div
                    class="enable cursor"
                    :class="m_status.M418==1?'currerEnable':''"
                    @click="sideBrush(1,'M418')"
                  >开启</div>
                  <div
                    class="cursor"
                    :class="m_status.M418==0?'currerProhibit':''"
                    @click="sideBrush(0,'M418')"
                  >关闭</div>
                </div>
              </li>
              <li>
                <p>风干控制</p>
                <div>
                  <div
                    class="cursor"
                    :class="m_status.M412==1?'currerEnable':''"
                    @click="drying('M412')"
                  >顶风禁用</div>
                  <div
                    class="cursor"
                    :class="m_status.M413==1?'currerEnable':''"
                    @click="drying('M413')"
                  >侧风禁用</div>
                  <div
                    class="cursor"
                    :class="m_status.M414==1?'currerEnable':''"
                    @click="drying('M414')"
                  >仿形风干</div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="机器监控"
          name="machine"
        >
          <div class="machine">
            <el-row
              class="top"
              border="true"
            >
              <el-col :span="11">名称</el-col>
              <el-col
                :span="11"
                class="center"
              >是否正常</el-col>
            </el-row>
            <el-row
              v-for="(key,value,index) in monitorList"
              class="size"
            >
              <el-col :span="11">{{
                value=='M0'?'龙门原点保护':
                value=='M1'?'顶刷上限保护':
                value=='M2'?'顶刷下限保护':
                value=='M3'?'侧刷安全保护':
                value=='M4'?'急停按下':
                value=='M5'?'定刷顶风升降异常':
                value=='M6'?'群刷电机过载':
                value=='M7'?'龙门行走异常':
                value=='M8'?'定刷旋转电机过载':
                value=='M9'?'大立刷系统电机过载':
                value=='M10'?'顶风上限保护':
                value=='M11'?'顶风下限保护':
                value=='M12'?'顶风安全保护':
                value=='M13'?'顶风电机过载':
                value=='M14'?'轮刷电机过载':
                value=='M15'?'侧风电机过载':
                value=='M16'?'顶刷无电流':
                value=='M17'?'龙门前后限位异常':
                value=='M18'?'顶刷上下限位异常':
                value=='M19'?'顶风上下限位异常':
                value=='M20'?'左侧内外限位异常':
                value=='M21'?'右侧内外限位异常':
                value=='M22'?'刷组水泵过载':
                value=='M23'?'缺相保护':''
                }}</el-col>
              <el-col
                :span="11"
                class="center"
                :class="key==1?'red':''"
              >{{ key==0?'正常':'异常' }}</el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--基本信息  -->
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
  </div>

</template>

<script>
import {
  getDeviceDetails, // 获取设备详情
  editEssentialInformation, // 修改设备
  inquireOutlets, //网点列表
  Monitor, // 机器监控
  MachineState, // 机器状态
  controlCommand,  // 机器控制命令
} from '@/api/activity.js'
import {
  myCommand, // 结束当前订单
} from '@/api/system.js'
export default {
  data() {
    return {
      // totalIn: 0, // 进行中服务列表分页
      // total: 0, // 结束服务列表分页
      // activeName: 'sell', // 第一个标签页
      // Inlist: [], // 进行中服务列表
      // list: [], // 结束服务列表
      // id: '',
      // dialogVisible: false, // 删除确认框的显示
      // newpage: 1, // 进行中当前页
      // newpageTwo: 1 // 结束当前页
      // pages: '',
      activeName: 'basic', // 第一个标签页
      listCommand: [], // 设备管理 基本信息
      number: '', // 机器编号
      terminal_code: '', // 终端编号
      project_identifier: '', // 项目标识
      group_identifier: '', // 组标识
      pagentid: '', // 省代ID
      cagentid: '', // 市代ID
      bid: '', // 设备ID
      status: '', // 状态
      basicT: false, // 询问保存按钮弹出框
      CarWash: '1 ', // 洗车模式
      Enable: '1', // 机器控制
      checked1: '1', // 洗车头车
      checked2: '1',// 车尾不洗
      DotLists: [], // 网点列表
      placeholders: {        // 网点省市区选择
        province: '',       // 省份
        city: '',           // 市
        area: ''            // 县区
      },
      dotShow: false, // 选择网点隐藏
      outletsList: [], // 网点列表
      outletsId: {
        name: '',
        id: ''
      },//网点的id
      brush: '',       //状态
      monitorList: '', // 机器监控列表
      m_status: {}, // 机器状态
      timer: null,         //定时器对象
    }
  },
  mounted() {
    this.bid = this.$route.query.id
    // 设备列表 基本信息
    getDeviceDetails({ 'id': this.bid }).then(res => {
      this.number = res.result.number
      this.terminal_code = res.result.terminal_code
      this.project_identifier = res.result.project_identifier
      this.group_identifier = res.result.group_identifier
      this.status = res.result.status
      this.outletsId.id = res.result.bid
      this.outletsId.name = res.result.bname
    })
    // 机器监控
    this.timer = setInterval(() => {
      Monitor({ 'id': this.bid }).then(res => {
        this.monitorList = res.result
      })
      MachineState({ id: this.bid }).then(res => {
        this.m_status = res.result
      })
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    dieOrder() {
      myCommand({ id: this.bid, status: 1, state: 2 }).then(res => {
        if (res.code === 200) {
          alert('操作成功')
        } else {
          alert('操作失败')
        }
      })
    },
    //  网点的选择以及获取网点
    getArea(data) {
      this.placeholders.province = data.province.value
      this.placeholders.city = data.city.value
      this.placeholders.area = data.area.value
      if (data.province.value == '省' || data.city.value == '市' || data.area.value == '区') {
        this.outletsList = {}
      } else {
        inquireOutlets({
          id: this.id,
          province: data.province.value,
          city: data.city.value,
          area: data.area.value
        }).then(res => {
          this.outletsList = res.result
        })
      }
    },
    //选择完网点点击确定
    outletsBtn() {
      if (this.outletsId.id == '') {
        this.$message({
          message: '您未选择网点',
          type: 'warning'
        })
      } else {
        this.outletsList.forEach(val => {
          if (val.id == this.outletsId.id) {
            this.outletsId.name = val.name
            this.outletsId.id = val.id
            this.dotShow = false
          }
        })
      }
    },
    // 修改设备管理的基本信息()
    saveData() {
      editEssentialInformation({
        'id': this.bid,
        'number': this.number,
        'terminal_code': this.terminal_code,
        'project_identifier': this.project_identifier,
        'group_identifier': this.group_identifier,
        'pagentid': this.pagentid,
        'cagentid': this.cagentid,
        'bid': this.outletsId.id
      }).then(res => {
        this.$message({
          message: '修改设备基本资料成功',
          type: 'success'
        })
      })
      this.basicT = false
      // this.getDeviceDetails(1)
    },
    // 设备管理
    goDetails() {
      this.$router.push('/insurance/insurance/information')
    },
    // 新增设备
    goModifyDetails(id) {
      this.$router.push('/insurance/insurance/ModifyInformation')
    },
    pattern(e) {
      //M502  标准
      //M500  普通
      let m
      let nu
      if (e == 1) {
        //标准模式
        m = 'M502'
        if (this.m_status.M502 == 0) {
          nu = 1
        } else {
          nu = 0
        }
      } else {
        //普通模式
        m = 'M500'
        if (this.m_status.M500 == 0) {
          nu = 1
        } else {
          nu = 0
        }
      }
      controlCommand({
        status: nu,
        m: m,
        id: this.bid
      })
        .then(res => {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          })
        })
    },
    // 机器控制命令
    sideBrush(e, m) {
      controlCommand({
        status: e,
        m: m,
        id: this.bid
      })
        .then(res => {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          })
        })
    },
    drying(m) {
      let n
      let nu
      if (m == 'M412') {
        n = 'M412'
        if (this.m_status.M412 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M413') {
        n = 'M413'
        if (this.m_status.M413 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M414') {
        n = 'M414'
        if (this.m_status.M414 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M510') {
        n = 'M510'
        if (this.m_status.M510 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M511') {
        n = 'M511'
        if (this.m_status.M511 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M200') {
        n = 'M200'
        if (this.m_status.M200 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      else if (m == 'M201') {
        n = 'M201'
        if (this.m_status.M201 == 1) {
          nu = 0
        } else {
          nu = 1
        }
      }
      controlCommand({
        m: n,
        status: nu,
        id: this.bid
      }).then(res => {
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
      })
    },

    // 机器复位
    reset(m) {
      controlCommand({
        m,
        status: 1,
        id: this.bid
      }).then(res => {
        this.$message({
          message: '复位成功',
          type: 'success'
        })
      })
    },
    // 机器启用
    enabled(m) {
      controlCommand({
        m,
        status: 1,
        id: this.bid
      }).then(res => {
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
      })
    },
    // 机器停止
    stopIt(m) {
      controlCommand({
        m,
        status: 1,
        id: this.bid
      }).then(res => {
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
      })
    }
    // 机器控制 启用停止
    // enableDisabled(e) {
    //     if (e == 1) {
    // //启用
    // if (this.m_status.M202 == 0 && this.m_status.M204 == 0) {
    //     controlCommand({m:'M202',status:1,id:this.bid})
    //         .then(res =>{
    //             this.$message({
    //                 message:'修改状态成功',
    //                 type:'success'
    //             })
    //         })
    // }
    // } else {
    //     //停止
    //     if (this.m_status.M202 == 1) {
    //         controlCommand({m:'M204',status:1,id:this.bid})
    //             .then(res =>{
    //                 this.$message({
    //                     message:'修改状态成功',
    //                     type:'success'
    //                 })
    //             })
    //     }
    // }
    // }

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
el-radio {
  font-size: 20px;
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
          font-size: 111px;
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
  margin: 20px 30px;
  min-height: calc(100vh - 240px);
  &-number {
    display: flex;
    justify-content: flex-end;
    position: relative;
    right: 0;
    margin-bottom: 10px;
  }
  &-operating {
    font-size: 30px;
    color: black;
    svg {
      cursor: pointer;
    }
    // }
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
    box-shadow: 0 0 4px 0 rgba(112, 2011, 185, 1);
  }
}
.top {
  margin: 20px 0px;
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
.basic {
  &-information {
    position: relative;
    font-size: 20px;
    line-height: 35px;
    &-project {
      text-align: right;
      margin: 20px 20px 0 -20px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 8em;
          margin-right: 1em;
          // font-weight: 700;
        }
        div {
          margin-left: 1em;
          float: left;
          el-radio {
            font-size: 20px;
          }
        }
        .right {
          margin-left: 26em;
          margin-right: 2em;
        }
      }
      .MachineControl {
        height: 80px;
        border-top: 1px dashed #cfcdcd;
        border-bottom: 1px dashed #cfcdcd;
        // margin:15px  60px;
      }
      .reset {
        margin-left: 19em;
      }
    }
  }
}
.debugging {
  width: 50%;
  float: left;
  .enable {
    margin-right: 4em;
  }
}
.title {
  margin-left: 60px !important;
}
.blue {
  color: #34aaf9;
}
.w700 {
  width: 700px;
}
.top {
  // border-top: 1px solid #cbcbcb;
  border: 1px solid #e4e7ed;
  width: 700px;
  padding: 20px 30px;
  font-size: 20px;
  color: #23262f;
  margin-bottom: 0px;
}
.size {
  width: 700px;
  border: 1px solid #e4e7ed;
  padding: 10px 30px;
  font-size: 20px;
}
.machine {
  margin-left: 40px;
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
.PCDCilck {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  width: 700px;
  height: 36px;
  padding: 0 15px;
  box-sizing: border-box;
  color: #757575;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
}
.type_PCD {
  width: 590px;
  padding: 14px 28px;
  text-align: left;
  // margin-top: 20px;
  // margin-left: 195px;
  margin: 20px 0 20px 195px;
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
.currerEnable {
  border-bottom: 2px solid #34aaf9;
  color: #34aaf9;
}
.currerProhibit {
  border-bottom: 2px solid #e24627;
  color: #e24627;
}
.cursor {
  cursor: pointer;
}
.center {
  text-align: center;
}
.red {
  color: red;
}
</style>
