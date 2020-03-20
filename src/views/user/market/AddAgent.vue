<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增市级代理商</div>
    </div>
    <div class="user">
      <el-tabs @tab-click="addIns">
        <div class="basic-information">
          <ul class="basic-information-project">
            <li>
              <p>公司名称</p>
              <el-input v-model="name" class="w700" placeholder="请输入公司名称" />
            </li>
            <li>
              <p class="information-serial-title">所在地区</p>
              <v-distpicker
                :province="placeholders.province"
                :city="placeholders.city"
                :area="placeholders.area"
                @selected="getArea"
              />
            </li>
            <li>
              <p>详细地址</p>
              <el-input v-model="address" class="w700" placeholder="请输入详细地址" />
            </li>
            <li>
              <p class="information-serial-title">代理地区</p>
              <v-distpicker
                :dprovince="region.dprovince"
                :dcity="region.dcity"
                :darea="region.darea"
                @selected="getRegion"
              />
            </li>
            <li>
              <p class="information-serial-title">选择省代</p>
              <el-select v-model="fidObj.name">
                <el-option v-for="item in consumption" :key="item.id" :value="item.name" @change="Choice" />
              </el-select>
            </li>
            <li>
              <p>负责人</p>
              <el-input v-model="realname" class="w700" placeholder="请输入负责人姓名" />
            </li>
            <li>
              <p>手机号</p>
              <el-input v-model="phone" class="w700" placeholder="请输入手机号" />
            </li>
            <li class="imageAndInput">
              <div class="imageAndInput-input">
                <p>营业执照</p>
                <el-input v-model="licenseImg" style="width:700px;" disabled />
                <div class="buttn">更改图片</div>
              </div>
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                :on-preview="PreviewLicense"
                :on-remove="RemoveLicense"
                :on-success="successLicense"
                :limit="1"
                :on-exceed="prompt"
                :file-list="licenseImgS"
                style="margin-left:7em"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </li>
            <li class="imageAndInput">
              <div class="imageAndInput-input">
                <p>法人身份证</p>
                <el-input v-model="IDcardFront" style="width:700px;" disabled />
                <div class="buttn">更改图片</div>
              </div>
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                :on-preview="PreviewIDcardFront"
                :on-remove="RemoveIDcardFront"
                :on-success="successIDcardFront"
                :limit="1"
                :on-exceed="prompt"
                :file-list="IDcardFrontG"
                style="margin-left:7em"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </li>

            <li class="imageAndInput">
              <div class="imageAndInput-input">
                <p />
                <el-input v-model="IDcardBack" style="width:700px;" disabled />
                <div class="buttn">更改图片</div>
              </div>
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                :on-preview="PreviewIDcardBack"
                :on-remove="RemoveIDcardBack"
                :on-success="successIDcardBack"
                :limit="1"
                :on-exceed="prompt"
                :file-list="IDcardBackG"
                style="margin-left:7em"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </li>
          </ul>
          <div class="save-modify" @click="basicT = true">保存修改</div>
        </div>
      </el-tabs>
    <!-- 保存修改  -->
    <el-dialog title="提示" :visible.sync="basicT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicT = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog></div>
  </div>
</template>

<script>
import { getAddAgent, // 添加市代
    getChoiceProvince // 市代选择代理

} from '@/api/user.js'
import { longStackSupport } from 'q'
import { log } from 'util'
export default {
    data() {
        return {
            // Url: this.url + '/api/wetch/ranking/upload', // 上传图片地址
            id: '',
            name: '', // 公司名称
            phone: '', // 手机号
            realname: '', // 负责人
            address: '', // 详细地址
            placeholders: { // 所在地区
                province: '', // 选择省
                city: '', // 选择市
                area: '' // 选择区
            },
            region: { // 代理地区
                dprovince: '', // 选择省
                dcity: '', // 选择市
                darea: '' // 选择区
            },
            licenseImgS: [],    //营业执照列表
            licenseImg:'',      //营业执照
            IDcardFrontG: [], // 身份证 正面列表
            IDcardFront:'',     //身份证正面
            IDcardBackG: [],    //身份证反面列表
            IDcardBack:'',      //身份证反面
            basicT: false, // 保存对话框的显示与隐藏
            fidObj: {
                name:'',
                fid:''
            }, // 代理类型
            // // 选择父级代理
            consumption: [], // 市代选择代理
            // getChoiceProvince: ''
            Choice:[],
            kong:'',                //输入框绑定的空字符串
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getChoiceProvince(1)
    },
    methods: {
        addIns(tab) {
            if (tab.name === 'account') {
                this.addIn = 1
            } else {
                this.addIn = 0
            }
        },
        // 获取省市区
        getArea(data) {
            this.placeholders.province = data.province.value
            this.placeholders.city = data.city.value
            this.placeholders.area = data.area.value
        },
        getRegion(data) {
            this.region.dprovince = data.province.value
            this.region.dcity = data.city.value
            this.region.darea = data.area.value
        },

        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 营业执照
        successLicense(response) {
            this.licenseImgS = [{url: response.result.data}]

            this.licenseImg = response.result.data
            console.log(this.licenseImg)
        },
        RemoveLicense(file, fileList) {
            this.licenseImgS = []
            this.licenseImg = ''
        },
        PreviewLicense(file) {

        },
        // 身份证正面
        successIDcardFront(response) {
            this.IDcardFrontG = [{url: response.result.data}]
            this.IDcardFront = response.result.data
        },
        RemoveIDcardFront(file, fileList) {
            this.IDcardFrontG = []
            this.IDcardFront = ''
        },
        PreviewIDcardFront(file) {

        },
        // 身份证反面
        successIDcardBack(response) {
            this.IDcardBackG = [{url: response.result.data}]
            this.IDcardBack = response.result.data
        },
        RemoveIDcardBack(file, fileList) {
            this.IDcardBackG = []
            this.IDcardBack = ''
        },
        PreviewIDcardBack(file) {

        },
        // // 市代选择省代理
        getChoiceProvince() {
            getChoiceProvince({
            }).then(res => {
                this.consumption = res.result.model
            })
        },
        // 保存
        saveData() {
            this.consumption.forEach(val =>{
                if (val.name == this.fidObj.name) {
                    this.fidObj.id = val.id
                }
            })
            getAddAgent({
                'name': this.name,
                'province': this.placeholders.province,
                'city': this.placeholders.city,
                'area': this.placeholders.area,
                'dprovince': this.region.dprovince,
                'dcity': this.region.dcity,
                'darea': this.region.darea,
                'address': this.address,
                'realname': this.realname,
                'phone': this.phone,
                'business_license': this.licenseImgS[0].url,
                'legal_person': [this.IDcardFront,this.IDcardBack],
                'fid': this.fidObj.id
            }).then(res => {
                this.$message({
                    message: '新增市级代理商成功',
                    type: 'success'
                })
            })
            this.basicT = false
            this.$router.push('/user/market')
        }
    }
}
</script>
<style lang="scss">

</style>

<style lang="scss" scoped>
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
.add {
  &-flex {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &-w500 {
    width: 500px;
  }
  &-p6{
    width: 6em;
    margin-right: 1em;
    text-align: right;
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
    font-size: 20px;
    line-height: 23px;
    &-project {
      text-align: right;
      margin: 10px 50px 0 50px;
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
.buttn {
  background-color: #2ca9fc;
  padding: 8px 13px;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 15px;
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
.w700{
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
</style>
