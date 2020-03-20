<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">银行管理</div>
    </div>
    <div class="user">
      <div class="user-tilte">{{ id?'修改':'新增' }}银行</div>
      <div class="information">
        <div class="information-basic">
          <div class="information-basic-serial">
            <div class="information-serial">
              <div class="information-serial-title">银行名称</div>
              <div class="information-serial-input">
                <input v-model="bankname" type="text" placeholder="请输入银行名称">
              </div>
            </div>
          </div>
          <div class="information-basic-serial">
            <div class="information-serial">
              <div class="information-serial-title">银行简称</div>
              <div class="information-serial-input">
                <input v-model="bank" type="text" placeholder="请输入银行简称">
              </div>
            </div>
          </div>
          <div class="imageAndInput">
            <div class="imageAndInput-input">
              <div class="information-serial-title"> 银行图标</div>
              <div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :file-list="fileList"
                  :on-remove="RemoveLicense"
                  :on-success="successLicense"
                  :limit="1"
                  :on-exceed="prompt"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="review-wen">
        <div class="review-center" @click="getBankEdit">确认保存</div>
      </div>
    </div>

    </el-tabs>
  </div>
  </div>
</template>

<script>
import {
    getBank, // 银行详情
    getBankEdit,      //修改
    getBankAdd        //新增
} from '@/api/system.js'
export default {
    // components: {
    //   Tinymce
    // },
    data() {
        return {
            activeName: 'information', // 第一个显示的标签页
            fileList:[],                //图片
            bankname: '', // 银行名字
            bank: '', // 银行简称
            id:'',    //当前操作的id，空为添加
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.id = this.$route.query.id
            getBank({ 'id': this.id }).then(res => {
                this.id = res.result.id
                this.bankname = res.result.bankname
                this.bank = res.result.bank
                this.fileList = [{
                    name:'',
                    url:res.result.images
                }]
            })
        }
    },
    methods: {
    // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 银行图标
        successLicense(response) {
            this.fileList = [{
                name:'',
                url:response.result.data
            }]
        },
        RemoveLicense(file, fileList) {
            this.fileList = []
        },
        // 修改银行详情
        getBankEdit() {
            if (this.id) {
                //修改
                getBankEdit({
                    'id': this.id,
                    'bankname': this.bankname,
                    'bank': this.bank,
                    'images': this.fileList[0].url
                }).then(res => {
                    this.$message({
                        message: '修改银行信息成功',
                        type: 'success'
                    })
                    this.$router.go(-1)
                })
            } else {
                //新增
                getBankAdd({
                    'bankname': this.bankname,
                    'bank': this.bank,
                    'images': this.fileList[0].url
                }).then(res => {
                    this.$message({
                        message: '新增银行成功',
                        type: 'success'
                    })
                    this.$router.go(-1)
                })
            }
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
// .el-upload--picture-card {
//   margin-left: -135px;
// }
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
    margin: 100px 300px;
    // margin-top: 200px;
    // margin-left: 400px
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
  font-size: 20px;
  &-tilte {
    font-weight: 700 !important;
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
</style>
