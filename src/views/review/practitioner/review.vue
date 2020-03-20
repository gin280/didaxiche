<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">代理商审核详情</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <div name="basic">
          <div class="basic-information user-title">1.申请资料 </div>
          <div class="basic-information">
            <ul class="basic-information-project">
              <li>
                <p>代理地区</p>
                <el-input v-model="placeholders.province" class="w150" />
                <el-input v-model="placeholders.city" class="w150" />
                <el-input v-model="placeholders.area" class="w150" />
                <!-- <v-distpicker
                  :province="placeholders.province"
                  :city="placeholders.city"
                  :area="placeholders.area"
                  @selected="getArea"
                /> -->
              </li>
              <li>
                <p>公司名称</p>
                <el-input v-model="name" class="w700" />
              </li>

              <li>
                <p>公司详细地址</p>
                <el-input v-model="address" class="w700" />
              </li>
              <li>
                <p>联系人</p>
                <el-input v-model="realname" class="w700" />
              </li>
              <li>
                <p>联系电话</p>
                <el-input v-model="phone" class="w700" />
              </li>
              <li>
                <p>申请时间</p>
                <el-input v-model="created_at" class="w700" />
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p>营业执照</p>
                  <el-input v-model="licenseImgG" style="width:700px;" disabled />
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
                  <el-input v-model="IDcardFrontS" style="width:700px;" disabled />
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
                  <el-input v-model="IDcardBackS" style="width:700px;" disabled />
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

          </div>
        </div>
        <div class="basic-information user-title">2.省代审核 </div>
        <div class="hang">审核结果：
          <span v-if="status==1" style="color:#19D4B8">通过审核 ({{ by_reason }})</span>
          <span v-else-if="status==2" style="color:#FC4949">通过拒绝 ({{ rejected_because }})</span>
          <span v-else-if="status==3" style="color:#4981FC">上属无省代，自动由系统审核</span>
        </div>
         <div v-if="status===1" class="supplementsupplement">
        <div class="supplement_title">
            补充材料：
          </div>
          <div class="supplement_img">
            <img :src="images">
          </div>
        </div>
          <div class="basic-information user-title">3.系统审核 </div>

        <div class="hang">审核结果：
          <span v-if="status_z===1" style="color:#19D4B8">审核通过({{ by_reason_z }})</span>
          <span v-else-if="status_z===2" style="color:#FC4949">审核拒绝 ({{ rejected_because_z }})</span>
          <span v-else-if="status_z===0" style="color:#4981FC">待审核</span>
        </div>
        <div v-if="status_z===1" class="supplementsupplement">
          <div class="supplement_title">
            补充材料：
          </div>
          <div class="supplement_img">
            <img :src="images_z">
          </div>
        </div>

      </el-tabs>
      <div v-if="status_z===0" class="save-modify" @click="AuditPass = true"> 审核通过</div>
      <div v-if="status_z===0" class="save-hui" @click="AuditFailure = true"> 审核拒绝</div>
    </div>
    </el-tabs>
      <!-- 营业执照  -->
    <el-dialog :visible.sync="license">
      <img width="100%" :src="licenseImgG" alt="">
    </el-dialog>
    <!-- 法人身份证  -->
    <el-dialog :visible.sync="IDcardFront">
      <img width="100%" :src="IDcardFrontS" alt="">
    </el-dialog>
    <el-dialog :visible.sync="IDcardBack">
      <img width="100%" :src="IDcardBackS" alt="">
    </el-dialog>
    <!-- 审核通过对话框 -->
    <el-dialog title="审核通过" :visible.sync="AuditPass" width="50%" center show-close>
      <el-input v-model="by_reason_z" type="textarea" :rows="4" placeholder="请输入通过说明" maxlength="50" show-word-limit />
      <div class="supplement">添加补充材料</div>
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="PreviewIDsupplement"
                :on-remove="RemoveIDsupplement"
        :on-success="successIDsupplement"
        style="margin-left:7em"
/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AuditPass = false">取 消</el-button>
        <el-button type="primary" @click="saverPass">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核失败  -->
    <el-dialog title="拒绝原因" :visible.sync="AuditFailure" width="50%" center show-close>
      <el-input
        v-model="rejected_because_z"
        type="textarea"
        :rows="4"
        placeholder="请输入拒绝的原因说明"
        maxlength="50"
        show-word-limit
        />
      <span slot="footer" class="dialog-footer">
        <el-button @click="AuditFailure = false">取 消</el-button>
        <el-button type="primary" @click="saverFail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import {
    getAgentAuditDetailsList, // 代理商审核详情
    AgentAudit// 审核
} from '@/api/review.js'
import { type } from 'os'
export default {
    data() {
        return {
            activeName: 'basic',
            data: [],
            id: '', // 当前页id
            mid: '',
            openid: '',
            created_at: '', // 申请时间
            phone: '', // 联系电话
            realname: '', // 联系人
            address: '', // 详细地址
            name: '', // 公司名称
            status: '', // 省代审核
            by_reason: '', // 省代理通过原因
            rejected_because: '', // 省代理失败原因
            images: '', // 省代理补充材料
            placeholders: { // 所在地区
                province: '', // 选择省
                city: '', // 选择市
                area: '' // 选择区
            },
            license: false,
            licenseImgG: '', // 营业执照
            licenseImgS: [],
            IDcardFrontS: '', // 身份证正面路径
            IDcardBack: false,
            IDcardFrontG: [], // 身份证 正面
            IDcardFront: false,
            IDcardBackG: [],
            IDcardBackS: '', // 身份证反面
            fileList: [],
            AuditPass: false, // 审核通过
            AuditFailure: false, // 审核失败
            rejected_because_z: '', // 审核失败输入文字
            status_z: '',         //系统审核状态
            by_reason_z: '',     //系统通过原因
            rejected_because_z: '',   //系统失败原因
            images_z: [],  // 系统审核通过补充材料
            created_at: '',// 申请时间
            updated_at: '',   // 系统审核时间
            aid:'',           //操作员id
        }
    },
    mounted() {
        this.id = this.$route.query.id
        getAgentAuditDetailsList({ 'id': this.id }).then(res => {
            // console.log(this.id)
            this.phone = res.result.phone // 联系电话
            this.realname = res.result.realname // 联系人
            this.name = res.result.name // 公司名称
            this.address = res.result.address // 详细地址
            this.created_at = res.result.created_at // 申请时间
            this.darea = res.result.darea
            this.aid = res.result.aid     //操作员id
            // 门牌照
            if (res.result.house_images !== '') {
                this.doorImgG = res.result.house_images
                this.doorImgS = [{ url: res.result.house_images }]
            }
            // 营业执照
            if (res.result.business_license !== '') {
                this.licenseImgG = res.result.business_license
                this.licenseImgS.push({ url: this.licenseImgG })
            }
            if (res.result.legal_person[0] !== '' && res.result.legal_person !== false) {
                this.IDcardFrontS = res.result.legal_person[0]
                this.IDcardFrontG.push({ url: this.IDcardFrontS })
            }
            if (res.result.legal_person[1] !== '' && res.result.legal_person !== false) {
                this.IDcardBackS = res.result.legal_person[1]
                this.IDcardBackG.push({ url: this.IDcardBackS })
            }
            this.placeholders.province = res.result.dprovince
            this.placeholders.city = res.result.dcity
            this.placeholders.area = res.result.darea
            this.status = res.result.status // 省代审核
            this.by_reason = res.result.by_reason // 省代理通过原因
            this.rejected_because = res.result.rejected_because // 省代理失败原因
            this.status_z = res.result.status_z    //系统审核状态
            this.by_reason_z = res.result.by_reason_z
            this.rejected_because_z = res.result.rejected_because_z
            this.images = res.result.images
            this.images_z = res.result.images_z || []
            this.created_at = res.result.created_at
            this.updated_at = res.result.updated_at
        })
        // this.saverPass(1)
    },
    methods: {
    // 获取省市区
        getArea(data) {
            this.placeholders.province = data.province.value
            this.placeholders.city = data.city.value
            this.placeholders.area = data.area.value
        },
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        successLicense(response) {
            this.licenseImgG = response.result.data
            console.log(this.status_z)
        },
        RemoveLicense(file, fileList) {
            this.licenseImgG = ''
        },
        PreviewLicense(file) {
            this.licenseImgG = file.url
            this.license = true
        },
        // 身份证正面
        successIDcardFront(response) {
            this.IDcardFrontS = response.result.data
        },
        RemoveIDcardFront(file, fileList) {
            this.IDcardFrontS = ''
        },
        PreviewIDcardFront(file) {
            this.IDcardFrontS = file.url
            this.IDcardFront = true
        },
        // 身份证反面
        successIDcardBack(response) {
            this.IDcardBackS = response.result.data
        },
        RemoveIDcardBack(file, fileList) {
            this.IDcardBackS = ''
        },
        PreviewIDcardBack(file) {
            this.IDcardBackS = file.url
            this.IDcardBack = true
        },
        // 补充材料
        successIDsupplement(response) {
            this.images_z = response.result.data
        },
        RemoveIDsupplement(file, fileList) {
            this.IDcsupplementS = ''
        },
        PreviewIDsupplement(file) {
            this.IDsupplementS = file.url
            this.IDsupplement = true
        },
        // 审核通过
        saverPass() {
            AgentAudit({
                id: this.id,
                aid:this.aid,
                status: this.status = 1,
                by_reason_z: this.by_reason_z,
                images_z: this.images_z,
            }).then(res => {
                this.$message({
                    message: '审核成功',
                    type: 'success'
                })
            })
            this.AuditPass = false
            this.$router.go(-1)
        },
        //审核失败
        saverFail() {
            AgentAudit({
                id: this.id,
                aid:this.aid,
                status: this.status = 2,
                rejected_because_z: this.rejected_because_z
            }).then(res=>{
                this.$message({
                    message:'审核成功',
                    type:'',
                })
            })
            this.AuditFailure = false
            this.$router.go(-1)
        }

    //
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
.save {
  width: 140px;
  background: rgba(62, 206, 185, 1);
  border-radius: 10px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  color: white;
  margin: 30px auto;
  font-size: 18px;
}
.title {
  margin: 30px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
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
  border-top: 1px solid rgba(203, 203, 203, 1);
  font-size: 20px;
  color: #23262f;
}
.top:hover {
  border: 1px solid rgba(62, 206, 185, 1);
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
  &-title {
    color: #2ca9fc;
  }
  &-hui {
    color: #999999;
  }
}
.basic {
  &-information {
    position: relative;
    display: flex;
    font-size: 20px;
    &-project {
      text-align: right;
      margin: 20px 50px 0 50px;
      li {
        margin-bottom: 20px;
      }
    }
    &-actual {
      text-align: left;
      margin: 50px 50px 0 0;
      li {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
    }
    &-modify {
      color: #2ca9fc;
      font-size: 16px;
      margin-left: 15px;
      cursor: pointer;
    }
    &-show {
      align-items: flex-start !important;
      img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
}
.review {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 350px;
  &-letf {
    color: white;
    background: rgba(62, 206, 185, 1);
    border-radius: 8px;
    margin-right: 50px;
    padding: 8px 40px;
    font-size: 18px;
    cursor: pointer;
  }
  &-right {
    color: white;
    background: #adadad;
    border-radius: 8px;
    margin-right: 50px;
    padding: 8px 40px;
    font-size: 18px;
    cursor: pointer;
  }
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
          width: 7em;
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
.save-modify {
  display: inline;
  width: 180px;
  border-radius: 5px;
  background-color: #2ca9fc;
  padding: 8px 30px;
  font-size: 20px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 16em;
  cursor: pointer;
}
.save-hui {
  display: inline;
  border-radius: 5px;
  background-color: #adadad;
  padding: 8px 30px;
  font-size: 20px;
  color: white;
  width: 180px;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 5em;
  cursor: pointer;
}
.hang {
  padding: 20px 0;
}
.w150 {
  width: 150px;
  margin-right: 15px;
}
.supplement {
  font-size: 16px;
  color: #a3a3a3;
  margin-top: 15px;
  object-fit: cover;
  .supplement_img{
    width: 100px;
    height: 100px;
    margin-left: 100px;
    img{
          width: 100%;
          height: 100%;
          float: left;
          margin:0 0px 0 80px;
          object-fit: cover;
    }
  }
}

</style>
