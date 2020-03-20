<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增设备</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <div class="information">
          <div class="information-basic">
            <div class="information-basic-serial">
              <div class="information-serial">
                <div class="information-serial-title">机器编号</div>
                <div class="information-serial-input">
                  <input v-model="number" type="text" placeholder="请输入机器编号">
                </div>
              </div>
            </div>
            <div class="information-basic-serial">
              <div class="information-serial">
                <div class="information-serial-title">终端编号</div>
                <div class="information-serial-input">
                  <input v-model="terminal_code	" type="text" placeholder="请输入终端编号">
                </div>
              </div>
            </div>
            <div class="information-basic-serial">
              <div class="information-serial">
                <div class="information-serial-title">项目标识</div>
                <div class="information-serial-input">
                  <input v-model="project_identifier" type="text" placeholder="请输入项目标识">
                </div>
              </div>
            </div>
            <div class="information-basic-serial">
              <div class="information-serial">
                <div class="information-serial-title">组标识</div>
                <div class="information-serial-input">
                  <input v-model="group_identifier" type="text" placeholder="请输入组标识">
                </div>
              </div>
            </div>
            <div class="information-serial">
              <div :v-model="outletsList" class="information-serial-title">所属网点</div>
              <div class="PCDCilck" @click="dotShow=true">{{ outletsId.name }}</div>
            </div>
          </div>
        </div>
        <!--网点选择-->
        <div v-show="dotShow" class="type_PCD">
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
            <div v-for="(item,index) in outletsList" :key="index" class="type_PCD_item">
              <div class="PCD_item_name">
                {{ item.name }}
              </div>
              <div class="PCD_item_radio">
                <el-radio v-model="outletsId.id" :label="item.id">&nbsp;</el-radio>
              </div>
            </div>
          </div>
          <div class="type_PCD_btn">
            <div @click="outletsBtn">确定</div>
          </div>
        </div>
        <div class="review-wen">
          <div class="review-center" @click="addEquipment">确认新增</div>
        </div>
      </el-tabs>
    </div>
    </el-tabs>
  </div>

  </el-tabs>
  </div>
  </div>
</template>

<script>
import { Tinymce } from '@/layout/components'
import {  addEquipment,  // 新增设备
    inquireOutlets,    //查询网点
} from '@/api/activity.js'
export default {
    components: {
        Tinymce
    },
    data() {
        return {
            activeName: 'information', // 第一个显示的标签页
            id: '',
            number: '', // 机器编号
            terminal_code: '', // 终端编号
            project_identifier: '', // 项目标识
            group_identifier: '', // 组标识
            placeholders: {        // 网点省市区选择
                province: '',       // 省份
                city: '',           // 市
                area: ''            // 县区
            },
            dotShow: false, // 选择网点隐藏
            outletsList: [  ], // 网点列表
            outletsId: {
                name:'',
                id:'',
            },//网点的id

        }
    },
    created() {
        this.id = this.$route.query.id
        this.getArea(1)
    },
    methods: {
    //  网点的选择
        getArea(data) {
            inquireOutlets({
                id: this.id,
                province: data.province.value,
                city: data.city.value,
                area: data.area.value
            }).then(res => {
                this.outletsList = res.result
                console.log(this.outletsList)
            })
        },
        //选择完网点点击确定
        outletsBtn() {
            if (this.outletsId == '') {
                this.$message({
                    message: '您未选择网点',
                    type: 'warning'
                })
            } else {
                this.outletsList.forEach(val=>{
                    if (val.id === this.outletsId.id) {
                        this.outletsId.name = val.name
                        this.outletsId.id = val.id
                        this.dotShow = false
                    }
                })
            }
        },
        // 新增设备
        addEquipment() {
            if (this.number === '' || this.nameInput === '' || this.project_identifierInput === '' || this.group_identifierInput === '') {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            addEquipment({
                'id': this.id,
                'number': this.number,
                'terminal_code': this.terminal_code,
                'project_identifier': this.project_identifier,
                'group_identifier': this.group_identifier,
                'bid':this.outletsId.id

            }).then(res => {
                this.$message({
                    message: '新增设备成功',
                    type: 'success'
                })
                this.$router.go(-1)
            })
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
.el-tag--small {
  margin-right: 10px;
}
.el-tag--dark {
  border: 0;
}
</style>

<style lang="scss" scoped>
.review {
  &-wen {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  &-center {
    color: white;
    background: #2ca9fc;
    border-radius: 8px;
    margin-right: 50px;
    padding: 8px 40px;
    font-size: 18px;
    cursor: pointer;
  }
}
// .QRcode{
//     width: 150px;
//     height: 150px;
//     background-color: #222222;
// }
.material {
  margin: 0 70px;
  &-img {
    font-size: 20px;
    margin: 30px 0 20px;
  }
  &-description {
    margin: 30px 0;
    display: flex;
  }
  &-label {
    display: flex;
    align-items: center;
    &-btn {
      background-color: #2ca9fc;
      padding: 8px 13px;
      color: white;
      cursor: pointer;
      border-radius: 3px;
    }
    &-input {
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe6;
      width: 225px;
      padding: 2px 2px 2px 15px;
      margin: 20px 20px 20px 0;
      input {
        border: 0;
        outline: none;
      }
    }
  }
}
.information {
  margin: 20px 10px 0;
  padding: 20px 0;
  border-bottom: 1px solid #cfcdcd;

  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-serial {
    display: flex;
    align-items: center;
    &-title {
      width: 5em;
      text-align: right;
      font-size: 20px;
      margin-right: 20px;
    }
    &-input {
      padding: 8px 15px;
      border: 1px solid #dcdfe6;
      input {
        width: 320px;
        border: 0;
        outline: none;
      }
    }
  }
  &-basic {
    margin-top: -20px;
    &-serial {
      margin-bottom: 20px;
    }
  }
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
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 160px);
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
.w320 {
  width: 350px;
}
.PCDCilck {
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  width: 350px;
  height: 36px;
  padding: 8px 15px;
  box-sizing: border-box;
  color: #757575;
  font-size: 16px;
  cursor: pointer;
}
.type_PCD {
  width: 590px;
  padding: 14px 28px;
  margin-top: 20px;
  margin-left: 120px;
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
</style>
