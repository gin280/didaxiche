<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">资料管理</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName" @tab-click="setTiny">
        <el-tab-pane label="首页资料" name="data">
          <div>
            <p>首页背景图 </p>
            <el-upload
              :action="Url"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="homeImgG"
              :on-success="setHomeImg"
              :limit="1"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="save-back" @click="modifyHomeImg">保存设置</div>
        </el-tab-pane>
        <el-tab-pane label="服务轮播图" name="carousel">
          <div class="addImg" @click="addImg">新增轮播图</div>
          <div>
            <el-row class="carousel" type="flex" align="middle">
              <el-col :span="3">顺序</el-col>
              <el-col :span="3">标题</el-col>
              <el-col :span="3">链接</el-col>
              <el-col class="carousel-operating" :span="15">
                <div>操作</div>
              </el-col>
            </el-row>
            <el-row v-for="(item,index) in carouselList" :key="index" type="flex" align="middle">
              <el-col :span="3">{{ item.id }}</el-col>
              <el-col :span="3">{{ item.title }}</el-col>
              <el-col :span="3">{{ item.image_url }}</el-col>
              <el-col class="carousel-operating" :span="15">
                <div class="carousel-operating-svg">
                  <svg-icon icon-class="hb" @click="goModify(item.id)" />
                  <svg-icon v-show="item.status==0" style="color:#1A8B7B" icon-class="yanjing" @click="modifyStatus(item.id,item.status)" />
                  <svg-icon v-show="item.status==1" icon-class="yanjing" @click="modifyStatus(item.id,item.status)" />
                  <svg-icon icon-class="ljt" @click="confirmDeletion(item.id)" />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="捐款协议" name="protocol">
          <editor id="tinymce" v-model="tinymceHtml" :init="init" />
          <div class="saveX" @click="donationX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="车主协议" name="owner">
          <editor id="tinymce2" v-model="tinymceHtml2" :init="init" />
          <div class="saveX" @click="ownerX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="商家协议" name="business">
          <editor id="tinymce3" v-model="tinymceHtml3" :init="init" />
          <div class="saveX" @click="businessX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="从业者协议" name="practitioner">
          <editor id="tinymce4" v-model="tinymceHtml4" :init="init" />
          <div class="saveX" @click="practitionerX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="救助协议" name="rescue">
          <editor id="tinymce5" v-model="tinymceHtml5" :init="init" />
          <div class="saveX" @click="helpX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="关于我们" name="about">
          <editor id="tinymce6" v-model="tinymceHtml6" :init="init" />
          <div class="saveX" @click="aboutX">保存协议</div>
        </el-tab-pane>
        <el-tab-pane label="捐款设置" name="ment">
          <div class="information-serial">
            <div class="information-serial-title">捐款设置</div>
            <el-radio v-model="radio" label="1" @change="setDonate">开启</el-radio>
            <el-radio v-model="radio" label="0" @change="setDonate">关闭</el-radio>
          </div>
          <div class="information-serial">
            <div class="information-serial-title">联系电话</div>
            <div style="width:320px;">
              <el-input v-model="contact" placeholder="请输入联系电话" />
            </div>
          </div>
          <div class="save-back" @click="setPhone">保存设置</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="提示" :visible.sync="CarouselDel" width="30%">
      <span>是否确定删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CarouselDel = false">取 消</el-button>
        <el-button type="primary" @click="Udelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'tinymce/skins/ui/oxide/skin.min.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
// import lang from 'tinymce/skins/zh_CN.js'
// tinymce.addI18n('zh_CN', lang)
import {
  getCarouselList,
  CarouselListDel,
  carouselStatus,
  getDonationAgreement,
  donationAgreement,
  getOwnerAgreement,
  ownerAgreement,
  getBusinessAgreement,
  businessAgreement,
  getPractitionerAgreement,
  practitionerAgreement,
  getHelpAgreement,
  helpAgreement,
  getAboutAgreement,
  aboutAgreement,
  getHomeInfoMap,
  homeInfoMapX,
  getDonateS,
  setDonateS,
  getPhone,
  setPhone
} from '@/api/system.js'
export default {
  components: { Editor },
  data() {
    return {
      Url: this.url + '/api/wetch/ranking/upload',
      activeName: 'data', // 第一个标签页
      dialogVisible: false, // 首页放大图片的显示
      CarouselDel: false, // 轮播图删除确认框
      dialogImageUrl: '', // 首页图片的地址
      tinymceHtml: '请输入内容', // 捐款协议
      tinymceHtml2: '请输入内容', // 车主协议
      tinymceHtml3: '请输入内容', // 商家协议
      tinymceHtml4: '请输入内容', // 从业者协议
      tinymceHtml5: '请输入内容', // 救助协议
      tinymceHtml6: '请输入内容', // 关于我们
      tinymceHtmlX: '', // 捐款协议
      tinymceHtmlX2: '', // 车主协议
      tinymceHtmlX3: '', // 商家协议
      tinymceHtmlX4: '', // 从业者协议
      tinymceHtmlX5: '', // 救助协议
      tinymceHtmlX6: '', // 关于我们
      init: { // 富文本的基础
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table  wordcount ',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: true,
        images_upload_url: 'https://xxs.xyyun.co/api/wetch/ranking/uploads',
        images_upload_handler: function(blobInfo, succFun, failFun) {
          var xhr, formData
          var file = blobInfo.blob()// 转化为易于理解的file对象
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', 'https://xxs.xyyun.co/api/wetch/ranking/uploads')
          xhr.onload = function() {
            var json
            if (xhr.status !== 200) {
              failFun('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.location !== 'string') {
              failFun('Invalid JSON: ' + xhr.responseText)
              return
            }
            succFun(json.location)
          }
          formData = new FormData()
          formData.append('file', file, file.name)// 此处与源文档不一样
          xhr.send(formData)
        }
      },
      radio: '0', // 捐款设置默认选项
      contact: '', // 联系电话
      carouselList: [], // 轮播图列表
      homeImgG: [], // 首页背景图
      homeImgS: '', // 首页背景图
      homeImgD: '', // 首页背景图
      status: ''
    }
  },
  created() {
    this.getCarouselList()
    this.getDonation()
    this.getOwner()
    this.getBusiness()
    this.getPractitioner()
    this.getHelp()
    this.getAbout()
    this.getHomeImg()
    this.getDonate()
    this.getPhone()
  },
  mounted() {
    // 捐款协议
    tinymce.init({
      selector: '#tinymce'
    })
    // 车主协议
    tinymce.init({
      selector: '#tinymce2'
    })
    // 商家协议
    tinymce.init({
      selector: '#tinymce3'
    })
    // 从业者协议
    tinymce.init({
      selector: '#tinymce4'
    })
    // 救助协议
    tinymce.init({
      selector: '#tinymce5'
    })
    // 关于我们
    tinymce.init({
      selector: '#tinymce6'
    })
  },
  methods: {
    getDonate() {
      getDonateS().then(res => {
        this.radio = res.result.value
      })
    },
    setDonate(value) {
      setDonateS({ 'value': value }).then(res => {
        console.log(res)
      })
    },
    getPhone() {
      getPhone().then(res => {
        this.contact = res.result.value
      })
    },
    setPhone() {
      setPhone({ 'value': this.contact }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    prompt() {
      this.$message('只能上传一张图片')
    },
    setHomeImg(file) {
      this.homeImgS = file.result.data
    },
    modifyHomeImg() {
      if (this.homeImgS === '') {
        this.$message({
          message: '必填项不能为空',
          type: 'warning'
        })
        return
      }
      homeInfoMapX({ 'id': this.homeImgD, 'image': this.homeImgS }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取首页背景图
    getHomeImg() {
      getHomeInfoMap().then(res => {
        this.homeImgG = []
        this.homeImgG.push({ 'url': res.result[0].image })
        this.homeImgS = res.result[0].image
        this.homeImgD = res.result[0].id
      })
    },
    setTiny(tab) {
      if (tab.name === 'protocol') {
        tinyMCE.editors[0].setContent(this.tinymceHtmlX)
      }
      if (tab.name === 'owner') {
        tinyMCE.editors[1].setContent(this.tinymceHtmlX2)
      }
      if (tab.name === 'business') {
        tinyMCE.editors[2].setContent(this.tinymceHtmlX3)
      }
      if (tab.name === 'practitioner') {
        tinyMCE.editors[3].setContent(this.tinymceHtmlX4)
      }
      if (tab.name === 'rescue') {
        tinyMCE.editors[4].setContent(this.tinymceHtmlX5)
      }
      if (tab.name === 'about') {
        tinyMCE.editors[5].setContent(this.tinymceHtmlX6)
      }
    },
    // 获取捐款协议
    getDonation() {
      getDonationAgreement().then(res => {
        this.tinymceHtmlX = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改捐款协议
    donationX() {
      this.tinymceHtmlX = tinyMCE.editors[0].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      donationAgreement({ 'value': this.tinymceHtmlX }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取车主协议
    getOwner() {
      getOwnerAgreement().then(res => {
        this.tinymceHtmlX2 = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改车主协议
    ownerX() {
      this.tinymceHtmlX2 = tinyMCE.editors[1].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      ownerAgreement({ 'value': this.tinymceHtmlX2 }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取商家协议
    getBusiness() {
      getBusinessAgreement().then(res => {
        this.tinymceHtmlX3 = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改商家协议
    businessX() {
      this.tinymceHtmlX3 = tinyMCE.editors[2].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      businessAgreement({ 'value': this.tinymceHtmlX3 }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取从业者协议
    getPractitioner() {
      getPractitionerAgreement().then(res => {
        this.tinymceHtmlX4 = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改从业者协议
    practitionerX() {
      this.tinymceHtmlX4 = tinyMCE.editors[3].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      practitionerAgreement({ 'value': this.tinymceHtmlX4 }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取救助协议
    getHelp() {
      getHelpAgreement().then(res => {
        this.tinymceHtmlX5 = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改救助协议
    helpX() {
      this.tinymceHtmlX5 = tinyMCE.editors[4].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      helpAgreement({ 'value': this.tinymceHtmlX5 }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 获取关于我们
    getAbout() {
      getAboutAgreement().then(res => {
        this.tinymceHtmlX6 = res.result.value.replace(/<img style="max-width:100%;height:auto"/, '<img ')
      })
    },
    // 修改关于我们
    aboutX() {
      this.tinymceHtmlX6 = tinyMCE.editors[5].getContent().replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      aboutAgreement({ 'value': this.tinymceHtmlX6 }).then(res => {
        this.$message({
          message: res.result,
          type: 'success'
        })
      })
    },
    // 修改轮播图
    goModify(id) {
      this.$router.push('/material/modifyCarouse')
      sessionStorage.setItem('id', id)
    },
    handleRemove(file, fileList) {
      this.homeImgS = ''
    },
    // 放大首页封面图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 跳转新增轮播图
    addImg() {
      this.$router.push('/material/addCarousel')
    },
    // 获取轮播图列表
    getCarouselList() {
      getCarouselList().then(res => {
        this.carouselList = res.result
      })
    },
    // 修改轮播图状态
    modifyStatus(id, status) {
      if (status === '0') {
        this.status = '1'
      } else if (status === '1') {
        this.status = '0'
      }
      carouselStatus({ 'id': id, 'status': this.status }).then(res => {
        this.getCarouselList()
        this.getHomeImg()
      })
    },
    // 删除用户
    Udelete() {
      CarouselListDel({ 'id': this.id }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getCarouselList()
      })
      this.CarouselDel = false
    },
    // 删除确认框的显示
    confirmDeletion(id) {
      this.CarouselDel = true
      this.id = id
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
  background-color: #2CA9FC;
}
.el-tabs__item:hover {
  color: #2CA9FC;
}
</style>
<style lang="scss" scoped>
.saveX{
  font-size: 18px;
  color: white;
  background-color: #2CA9FC;
  width: 135px;
  text-align: center;
  margin: 50px auto 0 ;
  padding: 8px 0;
  border-radius: 7px;
  cursor: pointer;
}
.save {
  &-back {
    width: 120px;
    background-color: #2CA9FC;
    color: white;
    border-radius: 5px;
    text-align: center;
    padding: 10px 12px;
    margin: 100px auto 0;
    cursor: pointer;
  }
}
.addImg {
  color: white;
  background-color: #2CA9FC;
  padding: 8px 10px;
  width: 100px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.carousel {
  font-weight: bold;
  &-operating {
    &-svg {
      font-size: 25px;
    }
    svg {
      cursor: pointer;
    }
    div {
      width: 150px;
      margin-left: auto;
    }
  }
}
.el-col {
  text-align: center;
}
.el-row {
  padding: 15px 0;
  border: 1px solid #979797;
  color: #5a5a5a;
  margin-bottom: 10px;
}
.el-row:hover {
  box-shadow: 0 0 3px 0 rgba(62, 206, 185, 1);
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
        background-color: #2CA9FC;
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
  p {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 20px 15px 0;
  }
}
.information {
  margin: 20px 10px 0;
  padding: 20px 0;
  &-description {
    margin: 15px 7.5em 0;
    color: #7c7c7c;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-serial {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &-rationing {
      display: flex;
      align-items: center;
      margin-left: 1.5em;
    }
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
    margin-top: 20px;
    &-serial {
      margin-bottom: 20px;
    }
  }
}
</style>
