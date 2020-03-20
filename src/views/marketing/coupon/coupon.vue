<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增优惠卷</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="information">
          <div class="information" style="border-bottom: 1px solid #CFCDCD;">
            <!-- <div class="information-title">1.基本信息</div> -->
            <div class="information-basic">
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">优惠类型</div>
                  <el-radio-group v-model="type" @change="typeChange">
                    <el-radio :label="1">新会员专享</el-radio>
                    <el-radio :label="2">网点会员专享</el-radio>
                    <el-radio :label="3">通用劵</el-radio>
                  </el-radio-group>
                </div>
                  <!--网点选择-->
                <div v-show="outletsStatus" class="type_PCD">
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
                        <el-radio v-model="outletsId" :label="item.id">&nbsp;</el-radio>
                      </div>
                    </div>
                  </div>
                  <div class="type_PCD_btn">
                    <div @click="outletsBtn">确定</div>
                  </div>
                </div>
                <div class="information-serial">
                  <div class="information-serial-title">序号</div>
                  <div class="information-serial-input">
                    <input v-model="sort" type="number">
                  </div>
                </div>
                <div class="information-description">数字越大，排名越靠前,如果为空，默认排序方式为创建时间</div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">优惠名称</div>
                  <div class="information-serial-input">
                    <input v-model="name" type="text">
                  </div>
                </div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">分类</div>
                  <el-select v-model="cid.name" class="w300">
                    <el-option v-for="item in classification" :key="item.id" :value="item.name" />
                  </el-select>
                </div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">优惠金额</div>
                  <div class="information-serial-input">
                    <input v-model="money_reduce" type="number">
                  </div>
                </div>

              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">使用条件</div>
                  <div class="information-serial-input" placeholder="88">
                    <input v-model="money_rule" type="text">
                  </div>

                </div>
                <div class="information-description">消费满多少可用, 空或0 不限制</div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">使用时间限制</div>

                  <div class="information-serial">
                    <el-input v-model="month" class="module-w300" type="number">
                      <el-radio slot="prepend" v-model="month_type" label="1">获取后</el-radio>
                    </el-input>
                    <div class="box2">天内有效(空为不限时间使用)</div>
                  </div>
                </div>
                <div class="information-basic-serial">
                  <div class="information-serial marginTop ">
                    <div class="information-serial-title" />
                    <div v-model="month" class="information-serial">
                      <el-radio slot="prepend" v-model="month_type" label="2" class="box1">在日期</el-radio>
                      <div>
                        <!-- 日期  -->
                        <el-date-picker
                          v-model="Data"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right"
                          value-format="yyyy-MM-dd"
                          />
                      </div>
                      <div class="box1">内有效</div>

                    </div>
                  </div>
                  <div class="information-basic-serial">
                    <div class="information-serial">
                      <div class="information-serial-title">发放总数</div>
                      <div class="information-serial-input">
                        <input v-model="number" type="number">
                      </div>
                    </div>
                    <div class="information-description">优惠券总数量，没有不能领取或发放,-1</div>
                  </div>
                </div>

              </div>
            </div>
            <div class="review-wen">
              <div class="review-letf" type="primary" @click="basicT = true">确认新增</div>
              <!-- <div class="review-right" @click="returnList">返回列表</div> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="领取设置" name="receive">
          <div class="information-basic">
            <div class="information-basic-serial">
              <div class="information-serial ">
                <div class="information-serial-title">是否创建为分享劵</div>
                <el-radio-group v-model="share_type">
                  <el-radio :label="1">可以</el-radio>
                  <el-radio :label="2">不可以</el-radio>
                </el-radio-group>
              </div>
              <div class="information-description"> 会员是否可以通过连接直接获取优惠卷</div>
              <div v-show="share_type==1?isShow=true:isShow=false" class="information-basic-serial">
                <div class="information-description">
                  <div class="information-box" :v-model="share">
                    <div class="information-serial">
                      <div class="information-serial-title">总金额</div>
                      <div class="information-serial-input">
                        <input v-model="total_sum" type="text" placeholder="最多可发放金额">
                      </div>
                    </div>
                    <div class="information-serial">
                      <div class="information-serial-title">最高领取</div>
                      <div class="information-serial-input">
                        <input v-model="highest_receive" type="text" placeholder="单人最高领取金额">
                      </div>
                    </div>
                    <div class="information-serial">
                      <div class="information-serial-title">最低领取</div>
                      <div class="information-serial-input">
                        <input v-model="minimum_receive" type="text" placeholder="单人最低领取金额">
                      </div>
                    </div>
                    <div class="information-serial">
                      <div class="information-serial-title">最多人数</div>
                      <div class="information-serial-input">
                        <input v-model="most_number" type="text" placeholder="单次发放最多人数">
                      </div>
                    </div>
                    </el-form>
                  </div>
                </div>
              </div>
              <div class="information-serial marginTop">
                <div class="information-serial-title">加入领劵中心</div>
                <el-radio-group v-model="jia_status">
                  <el-radio :label="1">可以</el-radio>
                  <el-radio :label="2">不可以</el-radio>
                </el-radio-group>
              </div>
              <div class="information-description">会员是否可以在领劵中心直接领取</div>
            </div>
            <el-button type="primary" class="submibtn" @click="basicT = true">确认新增</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="推送" name="push">
          <div class="information" style="border-bottom: 1px solid #CFCDCD;">
            <div class="information-basic">
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">模板ID</div>
                  <div class="information-serial-input">
                    <input v-model="templateid" type="text">
                  </div>
                </div>
                <div class="information-description">请在微信中查看模板ID并填写</div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">推送标题</div>
                  <div class="information-serial-input">
                    <input v-model="templatetitle" type="text">
                  </div>
                </div>
                <div class="information-description">变量[nickname]会员昵称[total]优惠券</div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">推送封面</div>
                  <div class="information-serial-input">
                    <input v-model="templateimg" style="width:270px;">
                  </div>
                  <el-button class="but">点击上传</el-button>
                </div>
                <div class="upload">

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
                </div>
              </div>
              <div class="information-basic-serial">
                <div class="information-serial">
                  <div class="information-serial-title">推送说明</div>
                  <div class="information-serial-input">
                    <input v-model="templateremarks" type="text">
                  </div>
                </div>
                <div class="information-description">变量 [nickname] 会员昵称 [total] 优惠券张数</div>
              </div>
            </div>
            <div class="information-basic-serial">
              <div class="information-serial">
                <div class="information-serial-title">推送链接</div>
                <div class="information-serial-input">
                  <input v-model="templateurl" type="text">
                  <el-upload class="upload-demo" :action="uploadUrl" multiple :limit="3" :on-exceed="handleExceed" />
                  <!-- :file-list="fileList"  -->

                </div>
                <el-button class="push-link" @click="linkSelectionDialog=true">选择链接</el-button>
              </div>
              <div class="information-description">消息推送点击的链接，为空默认为跳转到领券中心</div>
            </div>
            <div class="review-wen">
              <el-button type="primary" @click="pushInformation = true">确定提交</el-button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="使用说明" name="details">
          <editor id="tinymce" v-model="remarks" :init="init" />
          <div class="review-wen" style="margin-top:20px;">
            <div class="review-letf" @click="Instructions=true">保存修改</div>
            <div class="review-right" @click="returnList">返回列表</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 推送封面  -->
    <el-dialog :visible.sync="template">
      <img width="100%" :src="templateimg" alt="">
    </el-dialog>
    <!-- 推送（选择链接对话框） -->
    <el-dialog title="选择链接" :visible.sync="linkSelectionDialog" width="60%" :show-close="false">
      <div>
        <!-- <el-radio-group v-model="radio1" size="medium" class="el-radio-butto" boolean> -->
        <el-radio v-model="templateurl" label="1" border class="el-radio-butto"> 首页</el-radio>
        <el-radio v-model="templateurl" label="2" border class="el-radio-butto">商城</el-radio>
        <el-radio v-model="templateurl" label="3" border class="el-radio-butto">会员中心</el-radio>
        <el-radio v-model="templateurl" label="4" border class="el-radio-butto">领劵中心</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkSelectionDialog = false">取 消</el-button>
        <el-button type="primary" @click="linkSelectionDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 优惠劵基本信息保存 -->
    <el-dialog title="提示" :visible.sync="basicT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicT = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 优惠劵推送保存  -->
    <el-dialog title="提示" :visible.sync="pushInformation" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pushInformation = false">取 消</el-button>
        <el-button type="primary" @click="PushSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 优惠劵使用说明保存  -->
    <el-dialog title="提示" :visible.sync="Instructions" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Instructions = false">取 消</el-button>
        <el-button type="primary" @click="ExplainSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
    addCoupon, // 新增优惠劵
    getClassificationCoupon,  // 优惠劵分类
    PreferentialPush,  // 优惠劵的推送
    couponInstructions,   // 使用说明
    inquireOutlets,         //获取网点
} from '@/api/activity.js'
import Editor from '@tinymce/tinymce-vue'
// import { } from '@/api/user.js'
export default {
    components: {
        Editor
    },
    data() {
        return {
            activeName: 'information', // 第一个显示的标签页
            radio: '0', // 默认的上线单选
            registrationInput: '', // 报名价格
            options: [],
            rationingInput: '',
            value: '通用',
            tags: [], // 活动标签组
            color: '#409EFF', // 颜色选择器的默认颜色
            time: [], // 活动时间
            timeS: [], // 活动开始时间
            timeE: [], // 活动结束时间
            participant: '', // 活动参与人数
            placeholders: {
                province: '省', // 选择省
                city: '市', // 选择市
                area: '区', // 选择区
                provinces: '全省' // 全省
            },
            outletsId: '',       // 网点id
            outletsStatus: false,  // 网点选择是否显示
            outletsList: [],      // 网点列表
            areaSelectStatus: false,  // 地区选择是否显示
            Address: '', // 详细地址
            marker: '',
            taggingText: '', // 标签内容
            number: '', // 序号
            activityName: '', // 活动名称
            activityDescription: '', // 活动描述
            activityKeyword: '', // 关键字
            picturesG: '', // 图片组
            // tinymce: '', // 活动详情富文本
            ruleForm: {
                total_sum: ''
            },
            linkSelectionDialog: false, // 链接选择对话框
            radio1: '首页', // 默认链接选中首页
            radio2: '0', // 是否创建分享劵
            radio3: '1', // 是否受时间限制
            isShow: false,
            message: '显示',
            type: '1',
            addCoupon: [],
            handleClose: [],
            // fileList: [],
            // 推送
            templateid: '', // 模板id
            templatetitle: '', // 推送标题
            templateimg: '',  // 推送封面图片
            template: false,  //放大
            licenseImgS: [],  // 推送封面
            licenseImgG: [],
            templateremarks: '', // 推送说明
            templateurl: '', // 推送链接
            sort: '',  // 序号
            type: '', // 优惠劵类型
            name: '', // 优惠劵名称
            money_rule: '', // 使用条件满金额
            money_reduce: '', // 使用条件
            month_type: '', // 时间限制
            month: '',  // 有效日期
            most_number: '', // 最多人数
            minimum_receive: '', // 最低金额
            highest_receive: '', // 最高领取
            share_type: '', // 是否创建分享劵
            share: '', // 分享的参数
            total_sum: '', // 总金额
            money_rule: '', // 使用条件满减金额
            number: '', // 库存
            basicT: false, // 修改基本信息询问弹窗
            pushInformation: false, // 推送弹出框
            Instructions: false, // 使用说明
            classification:[], // 分类数组
            cid: {
                id:'',
                name:'',
            }, // 分类ID
            Data: [],  // 有效日期
            jia_status: '',  // 加入领卷中心
            remarks: '', // 使用说明
            // 富文本 基础
            init: { // 富文本的基础
                language: 'zh_CN',
                skin_url: '/tinymce/skins/lightgray',
                height: 300,
                plugins: 'link lists image code table  wordcount ',
                toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: true,
                // images_upload_url: 'https://ddxc.xyyun.co/app/wetch/wechat/upload',   //测试服
                images_upload_url: 'https://www.didaxc.cn/app/wetch/wechat/upload',   //正式服
                images_upload_handler: (blobInfo, succFun, failFun)=> {
                    var xhr, formData
                    var file = blobInfo.blob()// 转化为易于理解的file对象
                    xhr = new XMLHttpRequest()
                    xhr.withCredentials = false
                    // xhr.open('POST', 'https://ddxc.xyyun.co/app/wetch/wechat/upload')   //测试服
                    xhr.open('POST', 'https://www.didaxc.cn/app/wetch/wechat/upload')   //正式服
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
            },
            value1: '',
            value2: '',
            value3: '',
            DotList:[], // 网点的列表
        }
    },
    created() {
        this.getClassificationCoupon(1)
    },
    mounted() {
    //富文本初始化
        tinymce.init({
            selector: '#tinymce'
        })
    },
    methods: {
        // 优惠类型变化的监听
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
            // console.log(this.placeholders.province)
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
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 推送封面
        successLicense(response) {
            this.templateimg = response.result.data
        },
        RemoveLicense(file, fileList) {
            this.templateimg = ''
        },
        PreviewLicense(file) {
            this.templateimg = file.this.uploadUrl
            this.template = true
        },
        // 获取分类
        getClassificationCoupon(id) {
            getClassificationCoupon({ 'id': id }).then(res => {
                this.classification = res.result
            })
        },

        // 优惠劵的保存
        saveData() {
            if (!(/(^[1-9]\d*$)/.test(this.sort))) {
                this.$message.error('序数只能是正整数')
            }
            else if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(this.money_reduce))) {
                this.$message.error('优惠金额只能填写正数')
            } else if  (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(this.money_reduce))) {
                this.$message.error('使用条件只能填写正整数')
            } else if (!(/(^[1-9]\d*$)/.test(this.number))) {
                this.$message.error('发放总数只能填写正整数')
            } else {
                this.classification.forEach(val =>{
                    if (this.cid.name == val.name) {
                        this.cid.id = val.id
                    }
                })
                let obj = {
                    'aid': this.id,
                    'id': this.id,
                    'name': this.name,
                    'sort': this.sort,
                    'type': this.type,
                    'cid': this.cid.id,  // 分类
                    'money_rule': this.money_rule,
                    'money_reduce': this.money_reduce,
                    'number': this.number,
                    'month_type': this.month_type,
                    'share_type': this.share_type,
                    'total_sum': this.total_sum,
                    'highest_receive': this.highest_receive,
                    'minimum_receive': this.minimum_receive,
                    'most_number': this.most_number,
                    'jia_status': this.jia_status,

                }
                if (this.type == 2) {
                    obj = Object.assign(obj, { bid: this.outletsId })
                }
                if (this.month_type == 1) {
                    obj = Object.assign(obj, { month: this.month })
                } else if (this.month_type == 2) {
                    obj = Object.assign(obj, {
                        'month_start':this.Data[0],
                        'month_end':this.Data[1]
                    })
                }
                if (this.share_type == 1) {
                    obj = Object.assign(obj, {
                        'share': [this.total_sum, this.highest_receive, this.minimum_receive, this.most_number],
                    })
                }
                addCoupon(obj).then(res => {
                    this.$message({
                        message: '新增优惠劵基本资料成功',
                        type: 'success'
                    })
                })
                this.$router.go(-1)
            }
            this.basicT = false
        },
        // 优惠劵  推送  保存
        PushSave(id) {
            PreferentialPush({
                'aid': sessionStorage.getItem('id'),
                'id': this.id,
                'templateid': this.templateid,
                'templatetitle': this.templatetitle,
                'templateimg': this.templateimg,
                'templateremarks': this.templateremarks,
                'templateurl': this.templateurl
            }).then(res => {
                this.$message({
                    message: '修改优惠劵推送信息成功',
                    type: 'success'
                })
            })
            this.pushInformation = false
        },
        // 优惠劵使用说明
        ExplainSave(id) {
            couponInstructions({
                'aid': sessionStorage.getItem('id'),
                'id': this.id,
                'remarks': this.remarks
            }).then(res => {
                this.$message({
                    message: '修改优惠劵推送信息成功',
                    type: 'success'
                })
            })
            this.Instructions = false
        },
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 图片上传成功
        upSuccess(response) {
            this.picturesG = response.result.data
        },

        // 上传超出上限的图片触发
        handleExceed(response) {
            this.pushImgG = response.result.data
        },
        RemoveDoor(file, fileList) {
            this.pushImgG = ''
        },
        PreviewDoor(file) {
            this.pushImgG = file.this.uploadUrl
            this.push = true
        },
        // 删除图片
        downSuccess(file) {
            this.picturesG = ''
        },
        // // 添加优惠劵
        // add() {
        //   if (
        //     this.number === '' ||
        //     this.name === '' ||
        //     this.time === null ||
        //     this.activityDescription === '' ||
        //     this.registrationInput === '' ||
        //     this.rationingInput === '' ||
        //     this.Address === '' ||
        //     this.form.longitude === '' ||
        //     this.form.latitude === ''
        //   ) {
        //     this.$message({
        //       message: '必填项不能为空',
        //       type: 'warning'
        //     })
        //     return
        //   }
        //   this.timeS = this.time[0]
        //   this.timeE = this.time[1]
        //   this.tinymce = tinyMCE.activeEditor
        //     .getContent()
        //     .replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        //   addCoupon({
        //     type: this.type,
        //     sort: this.sort, // 序号
        //     name: this.name, // 优惠名称
        //     cid: this.cid, // 分类id
        //     money_rule: this.money_rule, // 使用条件满减金额
        //     month_type: this.month_type,
        //     // 时间限制状态 1:获得N天后有效 2:时间范围内有效
        //     number: this.number, // 总库存
        //     signprice: this.registrationInput,
        //     donationamount: this.rationingInput,
        //     company: this.value,
        //     acti_date: this.timeS,
        //     acti_time: this.timeE,
        //     activitytag: this.tags,
        //     registered_persons: this.participant,
        //     province: this.placeholders.province,
        //     city: this.placeholders.city,
        //     area: this.placeholders.area,
        //     provinces: this.placeholders.provinces,
        //     paddress: this.Address,
        //     longitude: this.form.longitude,
        //     latitude: this.form.latitude,
        //     remarks: this.tinymce
        //   }).then(res => {
        //     this.$message({
        //       message: res.result,
        //       type: 'success'
        //     })
        //     this.$router.push('/activity')
        //   })
        // },
        // 回到优惠劵管理列表
        returnList() {
            this.$router.push('/marketing')
        },
        // 添加标签
        tagging() {
            if (this.taggingText !== '') {
                this.tags.push({ title: this.taggingText, colour: this.color })
                this.taggingText = ''
                this.color = '#409EFF'
            } else {
                this.$message('请输入标签内容')
            }
        },
        // 领取设置（是否创建分享劵）
        open() {
            this.isShow = !this.isShow
            if (this.isShow) {
                this.message = '隐藏'
            } else {
                this.message = '显示'
            }
        }
    }
}
</script>
<style lang="scss">
.address-search {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
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
.certain {
  color: red;
}
.w200 {
  width: 200px;
}
.w130 {
  width: 130px;
}
.review {
  &-wen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-letf {
    color: white;
    background: #2ca9fc;
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
    padding: 8px 40px;
    font-size: 18px;
    cursor: pointer;
  }
}
.QRcode {
  width: 150px;
  height: 150px;
  background-color: #222222;
}
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
  &-description {
    margin: 5px 11.5em 0;
    color: #7c7c7c;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-serial {
    display: flex;
    align-items: center;
    // margin-top: 20px;

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
.upload {
  margin: 20px 120px;
}
.push-link {
  float: right;
  height: 100%;
}
.information-box {
  width: 442px;
  height: 226px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 2px 2px 4px rgba(238, 238, 238, 0.5);
}

.information-serial-input {
  width: 290px;
  margin: 10px;
}
.submibtn {
  width: 180px;
  margin: 50px 0 0 420px;
}
.el-radio-button {
  width: 80px;
  margin-left: 20px;
}
.box1 {
  width: 107px;
  height: 40px;
  border: 1px solid #dcdfe6;
  text-align: center;
  line-height: 40px;
  padding: 0;
  margin: 0;
}
.box2 {
  width: 360px;
  height: 40px;
  border: 1px solid #dcdfe6;
  text-align: center;
  line-height: 40px;
  margin-left: -1px;
}
.marginTop {
  margin-top: 30px!important;
}
.type_PCD {
  width: 600px;
  padding: 14px 28px;
  margin-top: 20px;
  margin-left: 100px;
  box-sizing: border-box;
  border: 1px solid #e8e7e7;
  border-radius: 20px;
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
