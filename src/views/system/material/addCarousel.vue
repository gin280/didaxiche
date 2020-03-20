<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增轮播图</div>
    </div>
    <div class="user">
      <div class="information-basic-serial">
        <div class="information-serial">
          <div class="information-serial-title">排序</div>
          <div class="information-serial-input">
            <el-input v-model="numberInput" placeholder="请输入内容" />
          </div>
        </div>
        <div class="information-description">数字越大，排名越靠前,如果为空，默认排序方式为创建时间</div>
      </div>
      <div class="information-basic-serial">
        <div class="information-serial">
          <div class="information-serial-title">轮播图标题</div>
          <div class="information-serial-input">
            <el-input v-model="titleInput" placeholder="请输入内容" />
          </div>
        </div>
      </div>
      <div class="information-basic-serial">
        <div class="information-serial">
          <div class="information-serial-title">轮播图图片</div>
          <div class="information-serial-input2">
            <el-input v-model="imgInput" disabled />
          </div>
          <div class="selectbtn">选择图片</div>
        </div>
        <el-upload
          :action="Url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="getAddress"
          :limit="1"
          :on-exceed="prompt"
          style="margin:1em 0 1em 10em;"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <div class="information-description">建议尺寸:640 * 350 , 请将所有轮播图图片尺寸保持一致</div>
      </div>
      <div class="information-basic-serial">
        <div class="information-serial">
          <div class="information-serial-title">轮播图链接</div>
          <div class="information-serial-input2">
            <el-input v-model="linkInput" disabled />
          </div>
          <div class="selectbtn" @click="linkFrameG">选择链接</div>
        </div>
      </div>
      <div class="information-basic-serial">
        <div class="information-serial">
          <div class="information-serial-title">状态</div>
          <el-radio v-model="radio" label="0">显示</el-radio>
          <el-radio v-model="radio" label="1">隐藏</el-radio>
        </div>
      </div>
      <div class="save" @click="add">添加轮播图</div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog
      :visible.sync="linkFrame"
      title="选择链接"
      width="30%"
      :show-close="false"
    >
      <div class="dialog-sort">服务</div>
      <div>
        <div v-for="(item,index) in list" :key="index" class="dialog-list">
          <div>{{ item.name }}</div>
          <div class="dialog-select" @click="select(item.id,item.name)">选择</div>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="totalIn"
        :page-size="10"
        background
        hide-on-single-page
        :current-page.sync="newpage"
        @current-change="getInList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { addCarousel } from '@/api/system.js'
import { serviceList } from '@/api/activity'
export default {
  data() {
    return {
      Url: this.url + '/api/wetch/ranking/upload',
      radio: '0',
      numberInput: '', // 排序
      titleInput: '', // 标题
      imgInput: '', // 图片链接
      linkInput: '', // 轮播图链接
      linkFrame: false, // 链接选择
      dialogVisible: false, // 轮播图放大图片的显示
      dialogImageUrl: '', // 轮播图图片的地址
      list: [], // 保险列表
      totalIn: '', // 总条数
      newpage: 1,
      InsuranceId: ''
    }
  },
  created() {
  },
  methods: {
    prompt() {
      this.$message('只能上传一张图片')
    },
    select(id, name) {
      this.InsuranceId = id
      this.linkInput = name
      this.linkFrame = false
    },
    linkFrameG() {
      this.linkFrame = true
      this.getInList(1)
    },
    // 获取出售中服务列表
    getInList(pages) {
      serviceList({ 'pages': pages }).then(res => {
        this.totalIn = res.result.all
        this.list = res.result.model
      })
    },
    handleRemove() {
      this.imgInput = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getAddress(file) {
      this.imgInput = file.result.data
    },
    add() {
      if (this.imgInput === '') {
        this.$message({
          message: '必填项不能为空',
          type: 'warning'
        })
        return
      }
      addCarousel({
        'serial': this.numberInput,
        'title': this.titleInput,
        'image': this.imgInput,
        'image_url': this.linkInput,
        'status': this.radio,
        's_id': this.InsuranceId
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push('/system/material')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.dialog{
  &-sort{
    padding: 8px 20px;
    background: #f5f5f5;
    border: 1px solid #cecece;
    width: 75px;
    text-align: center
  }
  &-list{
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  &-select{
    color: white;
    background-color: #2CA9FC;
    padding: 5px 8px;
    margin-left: 5px;
    cursor: pointer;
  }
}
.save{
  font-size: 18px;
  color: white;
  background-color: #2CA9FC;
  width: 135px;
  text-align: center;
  margin: auto;
  padding: 8px 0;
  border-radius: 7px;
  cursor: pointer;
}
.selectbtn{
  padding: 10px 12px;
  color: white;
  background-color: #2CA9FC;
  margin-left: 10px;
  cursor: pointer;
}
.information {
  margin: 20px 10px 0;
  padding: 20px 0;
  &-description {
    margin: 15px 10em 0;
    color: #7c7c7c;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-serial {
    display: flex;
    align-items: center;
    &-rationing {
      display: flex;
      align-items: center;
      margin-left: 1.5em;
    }
    &-title {
      width: 7em;
      text-align: right;
      font-size: 20px;
      margin-right: 20px;
    }
    &-input {
      width: 400px;
    }
    &-input2 {
      width: 70%;
    }
  }
  &-basic {
    margin-top: 20px;
    &-serial {
      margin-bottom: 20px;
    }
  }
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
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 200px);
}

</style>
