<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">资料管理</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <el-tab-pane label="图片管理" name="picture">
          <div class="basic-information">
            <ul class="basic-information-project">
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p class="title">首页背景图</p>
                  <el-input v-model="imgList[0].image" style="width:700px;" disabled />
                  <!-- <div class="buttn">选择图片</div> -->
                </div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-remove="RemoveHomePage"
                  :on-success="successHomePage"
                  :limit="1"
                  :on-exceed="prompt"
                  :file-list="homePageImgList"
                  style="margin-left:250px"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p class="title">商场背景图</p>
                  <el-input v-model="imgList[1].image" style="width:700px;" disabled />
                  <!-- <div class="buttn">选择图片</div> -->
                </div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-remove="RemoveMallPage"
                  :on-success="successMallPage"
                  :limit="1"
                  :on-exceed="prompt"
                  :file-list="mallPageImgList"
                  style="margin-left:250px"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p class="title">福利中心背景图</p>
                  <el-input v-model="imgList[2].image" style="width:700px;" disabled />
                  <!-- <div class="buttn">选择图片</div> -->
                </div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-remove="RemoveWelfarePage"
                  :on-success="successWelfarePage"
                  :limit="1"
                  :on-exceed="prompt"
                  :file-list="welfarePageImgList"
                  style="margin-left:250px"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p class="title">领券页背景图</p>
                  <el-input v-model="imgList[3].image" style="width:700px;" disabled />
                  <!-- <div class="buttn">选择图片</div> -->
                </div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-remove="RemoveCouponImg"
                  :on-success="successCouponImg"
                  :limit="1"
                  :on-exceed="prompt"
                  :file-list="couponImgList"
                  style="margin-left:250px"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
            </ul>
            <div class="saveX" @click="setImg">提交修改</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员卡协议" name="MembershipCard">
          <editor id="tinymce" v-model="tinymceHtml" :init="init" />
          <div class="saveX" @click="protocolBtn">提交修改</div>
        </el-tab-pane>
        <el-tab-pane label="洗车说明" name="CarWash">
          <editor id="tinymce2" v-model="tinymceHtml2" :init="init" />
          <div class="saveX" @click="instructions">提交修改</div>
        </el-tab-pane>
        <el-tab-pane label="客服电话" name="CustomerService">
          <div>
            <div class="basic-information">
              <div class="information-serial">
                <div class="information-serial-title">设备售后客服</div>
                <div class="information-serial-input">
                  <input v-model="phone[2].value" placeholder="请输入设备售后客服">
                </div>
              </div>
              <div class="information-description">厂家电话</div>
            </div>
            <div class="basic-information">
              <div class="information-serial">
                <div class="information-serial-title">会员售后客服</div>
                <div class="information-serial-input">
                  <input v-model="phone[0].value" placeholder="请输入会员售后客服">
                </div>
              </div>
              <div class="information-description">代理商电话</div>
            </div>
            <div class="basic-information">
              <div class="information-serial">
                <div class="information-serial-title">投诉客服电话</div>
                <div class="information-serial-input">
                  <input v-model="phone[1].value" placeholder="请输入投诉客服电话">
                </div>
              </div>
              <div class="information-description">平台公司电话</div>
            </div>
            <div class="saveX" @click='phoneBtn'>确认保存</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="意见反馈设置" name="feedback">
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3">ID</el-col>
            <el-col :span="6">意见反馈</el-col>
          </el-row>
          <el-row v-for="(item,index) in listCouponCategory" :key="index" class="user-body" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3" class="w300">{{ item.id }}</el-col>
            <el-col :span="6">
                <el-input v-model="item.name" :disabled="opinionId!=item.id" />
            </el-col>
            <el-col :span="2">
                <svg-icon v-show="opinionId!=item.id" icon-class="ljt" style="cursor: pointer;" @click="confirmDeletionID(item.id)" />
                <i v-show="opinionId!=item.id" class="el-icon-edit-outline" style="cursor: pointer;" @click="setOpinion(item.id)" />
                <i v-show="opinionId==item.id" class="el-icon-circle-check" style="cursor: pointer;" @click="saveOpinion(item.id)" />
                <i v-show="opinionId==item.id" class="el-icon-circle-close" style="cursor: pointer;" @click="cancelOpinion()" />
            </el-col>
          </el-row>
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="1" />
            <el-col :span="3">*</el-col>
            <el-col :span="6">
              <el-input v-model="addOpinionText" placeholder="请输入要添加的意见反馈" />
            </el-col>
          </el-row>
          <!-- 添加反馈 保存反馈 -->
          <el-row class="user-head" type="flex" align="middle">
            <el-col :span="5" />
            <el-col :span="3">
              <el-button type="primary" @click="addClassification">添加反馈</el-button>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="海报管理" name="poster">
          <table class="box">
            <div valign="top" class="UploadBox" />
            <div valign="top" class="content">
              <div>背景图</div>
            </div>
          </table>
        </el-tab-pane>
		<el-tab-pane label="洗车价钱" name="CarWashPrice">
            <div class="caruser">
                <div class="input">单次洗车价钱：<el-input type="text" v-model="price"/></div>
                <div class="tips">*此为所有机器的默认单次洗车价格</div>
                 <div class="saveX" @click='priceBtn'>确认保存</div>
            </div>
		</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import 'tinymce/skins/ui/oxide/skin.min.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import {
    getMemberProtocol,          //获取会员卡协议
    setMemberProtocol,          //修改会员卡协议
    getWashDescription,         //获取洗车说明
    setWashDescription,         //修改洗车说明
    getOpinionList,             //获取意见反馈列表
    setOpinionList,             //修改意见反馈
    addOpinion,                 //添加意见反馈
    delOpinion,                 //删除意见反馈
    getWashPrice,               //获取洗车价格
    setWashPrice,               //修改洗车价格
    getPhone,                   //获取客服电话
    setPhone,                   //修改客服电话
    getBanner,                  //获取banner图片
    setBanner,                  //修改banner图片
} from '@/api/user.js'
export default {
    components: { Editor },
    data() {
        return {
            activeName: 'picture', // 第一个标签页
            imgList:[],             //banner图片列表
            homePageImgList:[],     //首页背景图列表
            mallPageImgList:[],     //商城背景图列表
            welfarePageImgList:[],  //福利中心背景图列表
            couponImgList:[],       //福利中心背景图列表
            tinymceHtml: '', // 会员卡协议
            tinymceHtml2: '', // 洗车说明
            listCouponCategory:[],      //意见反馈列表
            opinionId:'',               //当前修改的意见反馈id
            addOpinionText:'',          //要添加的意见文字
            phone:[],                   //客服电话总数据
            price:'',                   //洗车价钱
            init: { // 富文本的基础
                language: 'zh_CN',
                skin_url: '/tinymce/skins/lightgray',
                height: 300,
                plugins: 'link lists image code table  wordcount ',
                toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: true,
                images_upload_url: this.uploadUrl,   //正式服
                images_upload_handler: (blobInfo, succFun, failFun)=> {
                    var xhr, formData
                    var file = blobInfo.blob()// 转化为易于理解的file对象
                    xhr = new XMLHttpRequest()
                    xhr.withCredentials = false
                    xhr.open('POST', this.uploadUrl)   //正式服
                    xhr.onload = ()=> {
                        var json
                        if (xhr.status !== 200) {
                            failFun('HTTP Error: ' + xhr.status)
                            return
                        }
                        json = JSON.parse(xhr.responseText)
                        if (!json || typeof json.result.data !== 'string') {
                            failFun('Invalid JSON: ' + xhr.responseText)
                            return
                        }
                        succFun(json.result.data)
                    }
                    formData = new FormData()
                    formData.append('file', file, file.name)// 此处与源文档不一样
                    xhr.send(formData)
                }
            }
        }
    },
    created() {
        //获取会员卡协议
        getMemberProtocol().then(res =>{
            this.tinymceHtml = res.result.value
        })
        //获取洗车说明
        getWashDescription().then(res =>{
            this.tinymceHtml2 = res.result.value
        })
        //获取意见反馈列表
        getOpinionList().then(res =>{
            this.listCouponCategory = res.result.model
        })
        //获取洗车金额
        getWashPrice().then(res =>{
            this.price=res.result.price
        })
        //获取客服电话
        getPhone().then(res =>{
            this.phone=res.result
        })
        //获取banner图片
        getBanner().then(res =>{
            this.imgList=res.result.model
            this.homePageImgList=[{url:res.result.model[0].image}]
            this.mallPageImgList=[{url:res.result.model[1].image}]
            this.welfarePageImgList=[{url:res.result.model[2].image}]
            this.couponImgList=[{url:res.result.model[3].image}]
        })
    },
    mounted() {
        // 富文本初始化
        tinymce.init({
            selector: '#tinymce'
        })
        // 洗车说明
        tinymce.init({
            selector: '#tinymce2'
        })
    },
    methods: {
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 首页背景
        successHomePage(response) {
            this.imgList[0].image = response.result.data
        },
        RemoveHomePage(file, fileList) {
            this.imgList[0].image = ''
        },
        // 商场背景
        successMallPage(response) {
            this.imgList[1].image = response.result.data
        },
        RemoveMallPage(file, fileList) {
            this.imgList[1].image = ''
        },
        // 福利中心背景
        successWelfarePage(response) {
            this.imgList[2].image = response.result.data
        },
        RemoveWelfarePage(file, fileList) {
            this.imgList[2].image = ''
        },
        // 领劵背景
        successCouponImg(response) {
            this.imgList[3].image = response.result.data
        },
        RemoveCouponImg(file, fileList) {
            this.imgList[3].image = ''
        },
        //提交会员卡协议
        protocolBtn() {
            setMemberProtocol({value:this.tinymceHtml})
            .then(res =>{
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
            })
        },
        //提交洗车说明
        instructions() {
            setWashDescription({value:this.tinymceHtml2})
            .then(res =>{
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
            })
        },
        //添加意见反馈
        addClassification() {
            if (this.addOpinionText == '') {
                this.$message.error('添加的意见反馈不可为空')
            } else {
                addOpinion({name:this.addOpinionText})
                .then(res =>{
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    })
                    this.addOpinionText = ''
                    getOpinionList().then(res =>{
                        this.listCouponCategory = res.result.model
                        this.opinionId = ''
                    })
                })
            }
        },
        //修改意见反馈
        setOpinion(id) {
            if (this.opinionId !== '') {
                this.$message.error('请保存当前修改后再去修改其他的')
            } else {
                this.opinionId = id
            }
        },
        //保存意见
        saveOpinion(id) {
            let text
            this.listCouponCategory.forEach(val =>{
                if (val.id == id) {
                    text = val.name
                }
            })
            setOpinionList({id:id,name:text}).then(res =>{
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                this.opinionId = ''
            })
        },
        //取消修改
        cancelOpinion(){
            this.opinionId=''
            getOpinionList().then(res =>{
                this.listCouponCategory = res.result.model
                this.opinionId = ''
            })
        },
        //删除意见
        confirmDeletionID(id){
            this.$confirm('是否删除该意见反馈选项', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delOpinion({id}).then(res =>{
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    getOpinionList().then(res =>{
                        this.listCouponCategory = res.result.model
                        this.opinionId = ''
                    })
                })
            })
        },
        //修改洗车价格
        priceBtn(){
            if(!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(this.price))){
                this.$message.error('价格只能填写正数，最多保留两位小数')
            }else{
                setWashPrice({price:this.price,money:this.price}).then(res =>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                })
            }
        },
        //修改客服电话
        phoneBtn(){
            if(this.phone[0].value==''||this.phone[1].value==''||this.phone[2].value==''){
                this.$message.error('客服电话不能为空')
            }else{
                setPhone({array:this.phone}).then(res =>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                })
            }
        },
        //修改banner图片
        setImg(){
            if(this.imgList[0].image==''||this.imgList[1].image==''||this.imgList[2].image==''||this.imgList[3].image==''){
                this.$message.error('banner图片不能为空')
            }else{
                setBanner({array:this.imgList}).then(res =>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    width: 200px;
    text-align: right;
    margin-right: 50px;
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
  .el-tabs__item {
    font-size: 20px;
    font-weight: 700;
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 240px);
  font-size: 20px;
  &-number {
    display: flex;
    justify-content: flex-end;
    position: relative;
    right: 0;
    margin-bottom: -1px;
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
</style>
<style lang="scss" scoped>
.imageAndInput {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  margin-bottom: 20px;
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
.saveX {
  font-size: 18px;
  color: white;
  background-color: #2ca9fc;
  width: 135px;
  text-align: center;
  margin: 50px auto 0;
  padding: 8px 0;
  border-radius: 7px;
  cursor: pointer;
}
// 海报管理
.box {
  width: 100%;
  float: left;
}
.UploadBox {
  width: 320px;
  height: 500px;
  float: left;
  padding: 10px;
  border: 1px solid #cfcdcd;
}
.content {
  margin-left: 35px;
  float: left;
  width: 43em;
  height: 300px;
  border: 1px solid #cfcdcd;
}
.information {
  margin: 20px 10px 0;
  padding: 20px 0;
  &-description {
    margin: 8px 9em 0;
    color: #7c7c7c;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-serial {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &-rationing {
      display: flex;
      align-items: center;
      margin-left: 1.5em;
    }
    &-title {
      width: 8em;
      text-align: right;
      font-size: 20px;
      margin-right: 20px;
      // maigin:10px 20px;
    }
    &-input {
      padding: 8px 15px;
      border: 1px solid #dcdfe6;
      input {
        width: 600px;
        border: 0;
        outline: none;
      }
    }
  }
}
.caruser{
    width: 400px;
    height: 300px;
    position: relative;
    left: 50%;
    margin-left: -200px;
    margin-top: 180px;
    // margin: 200px auto ;
    .input{
        display: flex;
        align-items: center;
        justify-content: center;
        .el-input{
            width: 100px;
        }
    }
}
 .tips{
        color: #34AAF9!important;
        font-size: 14px;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 150px;
    }

.w700{
  width: 700px;
}
</style>
