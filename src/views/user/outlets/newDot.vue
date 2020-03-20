/* eslint-disable space-before-blocks */
<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增网点</div>
    </div>
    <div class="user">
      <div class="basic-information">
        <ul class="basic-information-project">
          <li>
            <p>网点名称</p>
            <el-input v-model="shopName" class="w700" />
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
            <el-input v-model="address" class="w700" />
          </li>
          <li>
            <p class="information-serial-title">定位</p>
            <el-input
v-model="form.longitude"
class="w200"
style="margin-right:20px;"
placeholder="地理经度"
              maxlength="12"
/>
            <el-input v-model="form.latitude" class="w200" placeholder="地理纬度" maxlength="12" />
            <div class="buttn" @click="displayMap">选择位置</div>
          </li>
          <li>
            <p>所属代理</p>
            <div>
              <el-radio-group v-model="type" @change="typeChange">
                 <el-radio class="radio" :label="2">省代</el-radio>
                <el-radio class="radio" :label="1">市代</el-radio>
                <el-radio class="radio" :label="0">平台</el-radio>
              </el-radio-group>
            </div>

          </li>
          <li>
            <!--市代选择-->
                <div v-show="outletsStatus" class="type_PCD">
                  <div class="type_PCD_title">
                    选择市代
                  </div>
                  <div class="threePCD">
                    <v-distpicker
                      :province="placeholdersCity.province"
                      :city="placeholdersCity.city"
                      :area="placeholdersCity.area"
                      @selected="getAreaCity"
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
          </li>
          <li>
            <p>手机号</p>
            <el-input v-model="phone" class="w700" />
          </li>
          <li>
            <p>负责人</p>
            <el-input v-model="name" class="w700" />
          </li>

          <li class="imageAndInput">
            <div class="imageAndInput-input">
              <p>门牌照</p>
              <el-input v-model="doorImgG" style="width:700px;" disabled />
              <div class="buttn">更改图片</div>
            </div>
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :on-preview="PreviewDoor"
              :on-remove="RemoveDoor"
                            :on-success="successDoor"
              :limit="1"
              :on-exceed="prompt"
              :file-list="doorImgS"
              style="margin-left:7em"
              >
              <i class="el-icon-plus" />
            </el-upload>
          </li>
          <li class="imageAndInput">
            <div class="imageAndInput-input">
              <p>营业执照</p>
              <el-input v-model="licenseImgG" style="width:700px;" disabled />
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
              <el-input v-model="IDcardFrontS" style="width:700px;" disabled />
              <div class="buttn">更改图片</div>
            </div>
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
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
              <div class="buttn">更改图片</div>
            </div>
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
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
        <div class="save-modify" @click="basicT = true">确认新增</div>
      </div>
    </div>
    <!-- 经纬度  -->
    <el-dialog title="经纬度选择" :visible.sync="mapDisplay" width="70%">
      <div class="address-search">
        <p>地址搜索</p>
        <el-input id="keyword" v-model="search" style="width:320px;margin:0 20px;" />
        <el-button @click="searchKeyword">搜索</el-button>
      </div>
      <div id="container" style="width:100%;height:500px;" />
    </el-dialog>
    <!-- 确认保存对话框 -->
    <el-dialog title="提示" :visible.sync="basicT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicT = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
    DotMarket, // 网点选择省代
    AddOutlets  // 新增网点
} from '@/api/user.js'
export default {
    data() {
        return {
            phone: '', // 手机
            name: '', // 名字
            shopName: '', // 网点名字
            address: '', // 网所在地址
            basicT: false, // 修改询问弹窗
            dividendT: false, // 修改询问弹窗
            door: false,
            doorImgG: '',
            doorImgS: [],
            license: false,
            licenseImgG: '',
            licenseImgS: [],
            id: '',
            form: {
                latitude: '', // 纬度
                longitude: '' // 经度
            },
            search:'', // 地址搜素
            mapDisplay: false, // 地图弹窗的显示
            markers: [],	// 检索信息
            IDcard: [],
            IDcardFront: false,
            IDcardFrontS: '',
            IDcardFrontG: [],
            IDcardBack: false,
            IDcardBackG: [],
            IDcardBackS: '',
            placeholders: {
                province: '省', // 选择省
                city: '市', // 选择市
                area: '区' // 选择区
            },
            type: '',   // 所属代理类型选项
            outletsStatus: false,     // 所属代理选择是否显
            outletsList: [],  // 网点列表
            placeholdersCity: {
                province: '省', // 选择省
                city: '市', // 选择市
                area: '区' // 选择区
            },
            outletsId:'', // 所属市代id
        }
    },
    mounted() {
        this.mapDisplay = false
    },
    methods: {
    // 所属代理类型变化监听
        typeChange(e) {
            if (e == 0) {
                this.outletsStatus = false
                this.areaSelectStatus = false
            } else if (e == 1) {
                this.outletsStatus = true
                this.areaSelectStatus = false
            } else if (e == 2) {
                this.areaSelectStatus = true
                this.outletsStatus = false
            }
        },  // 网点省市区选择及获取网点
        getAreaCity(data) {
            this.placeholdersCity.province = data.province.value
            this.placeholdersCity.city = data.city.value
            this.placeholdersCity.area = data.area.value
            if (data.province.value == '省' || data.city.value == '市' || data.area.value == '区') {
                this.outletsList = []
            } else {
                DotMarket({
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
        getArea(data) {
            this.placeholders.province = data.province.value
            this.placeholders.city = data.city.value
            this.placeholders.area = data.area.value
        },
        //选择完网点点击确定
        outletsBtn() {
            if (this.outletsId == '') {
                this.$message({
                    message: '您未选择代理商',
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

        // 地图弹窗
        displayMap() {
            this.map()
            this.mapDisplay = true
        },
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 门牌
        successDoor(response) {
            this.doorImgG = response.result.data
        },
        RemoveDoor(file, fileList) {
            this.doorImgG = ''
        },
        PreviewDoor(file) {
            this.doorImgG = file.this.uploadUrl
            this.door = true
        },
        // 营业执照
        successLicense(response) {
            this.licenseImgG = response.result.data
        },
        RemoveLicense(file, fileList) {
            this.licenseImgG = ''
        },
        PreviewLicense(file) {
            this.licenseImgG = file.this.uploadUrl
            this.license = true
        },
        // 身份证正面
        successIDcardFront(response) {
            this.IDcardFrontS = response.result.data
        },
        RemoveIDcardFront(file, fileList) {
            this.IDcardFrontS = ''
        },
        // 身份证反面
        successIDcardBack(response) {
            this.IDcardBackS = response.result.data
        },
        RemoveIDcardBack(file, fileList) {
            this.IDcardBackS = ''
        },
        // 加载地图
        map() {
            this.center = new qq.maps.LatLng(30.29203, 120.00457)
            this.QQmap = new qq.maps.Map(document.getElementById('container'), {
                center: this.center,
                zoom: 15
            })
            this.marker = new qq.maps.Marker({
                map: this.QQmap,
                position: this.center
            })
            qq.maps.event.addListener(this.QQmap, 'click', (event) => {
                var latLng = event.latLng
                this.form.longitude = latLng.lng
                this.form.latitude = latLng.lat
                this.$set(this.form)
                this.mapDisplay = false
            })
            this.latlngBounds = new qq.maps.LatLngBounds()
            this.searchService = new qq.maps.SearchService({
                // 设置搜索范围为北京
                location: '杭州',
                // 设置搜索页码为1
                pageIndex: 1,
                // 设置每页的结果数为5
                pageCapacity: 50,
                // 设置展现查询结构到infoDIV上
                panel: document.getElementById('infoDiv'),
                // 设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
                autoExtend: true,
                // 检索成功的回调函数
                complete: (results) => {
                    // 设置回调函数参数
                    var pois = results.detail.pois
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i]
                        // 扩展边界范围，用来包含搜索到的Poi点
                        this.latlngBounds.extend(poi.latLng)
                        this.marker = new qq.maps.Marker({
                            map: this.QQmap,
                            position: poi.latLng
                        })
                        this.marker.setTitle(i + 1)
                        this.markers.push(this.marker)
                        qq.maps.event.addListener(this.marker, 'click', (event) => {
                            var latLng = event.latLng
                            this.form.longitude = latLng.lng
                            this.form.latitude = latLng.lat
                            this.$set(this.form)
                            this.mapDisplay = false
                        })
                    }
                    // 调整地图视野
                    this.QQmap.fitBounds(this.latlngBounds)
                },
                // 若服务请求失败，则运行以下函数
                error: () => {
                    alert('出错了！')
                }
            })
        },
        // 清除地图上的marker
        clearOverlays(overlays) {
            var overlay
            while (overlay = overlays.pop()) {
                overlay.setMap(null)
            }
        },
        // 设置搜索的范围和关键字等属性
        searchKeyword() {
            var keyword = document.getElementById('keyword').value
            this.clearOverlays(this.markers)
            // 根据输入的城市设置搜索范围
            this.searchService.setLocation('杭州')
            // 根据输入的关键字在搜索范围内检索
            this.searchService.search(keyword)
        },
        // 确认保存
        saveData(id) {
            this.IDcard.push(this.IDcardFrontS)
            this.IDcard.push(this.IDcardBackS)
            //     if (this.shopName == '' || this.placeholders.province == '' || this.this.placeholders.city == '' || this.this.placeholders.area == '' || this.this.address == '' || this.this.form.longitude == '' || this.this.form.latitude == '' ||
            // this.name == '' || this.doorImgG == '') {
            //         this.$message({
            //             message: '必填项不能为空',
            //             type: 'warning'
            //         })
            //         return
            //     } else if (!( /(/^[1][3|4|5|6|7|8|9][0-9]{9})$)/.test(this.phone)){
            //         this.$message.error('请输入正确的手机号格式')
            //     }
            AddOutlets({
                'id': this.id,
                'name': this.shopName,
                'province': this.placeholders.province,
                'city': this.placeholders.city,
                'area': this.placeholders.area,
                'address': this.address,
                'longitude': this.form.longitude,
                'latitude': this.form.latitude,
                'realname': this.name,
                'phone': this.phone,
                'house_images': this.doorImgG,
                'business_license': this.licenseImgG,
                'legal_person': this.IDcard,
                'type':this.type,
                'agid':this.outletsId
            }).then(res => {
                this.$message({
                    message: '新增网点成功',
                    type: 'success'
                })
                this.$router.go(-1)
            })
            this.basicT = false
        },

    }
}
</Script>
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
.w700 {
  width: 700px;
}
.w200 {
  width: 200px;
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
.type_PCD {
  width: 600px;
  padding: 10px;
  // margin-top: 10px;
  margin-left: 180px;
  box-sizing: border-box;
  border: 1px solid #eae6e6;
  border-radius: 10px;
  text-align: left;
  .type_PCD_title {
    color: #7c7c7c;
    font-size: 14px;
    margin-bottom: 15px;
    select{
    border-radius: 10px;

    }
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
.threePCD {
  margin-left: 10px;
}
</style>
