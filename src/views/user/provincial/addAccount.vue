<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">新增省代管理员</div>
    </div>
    <div class="user">
      <div class="add-flex" style="margin-top:50px;">
        <div class="add-p6">姓名</div>
        <el-input
          v-model="realname"
          class="add-w500"
          placeholder="请输入用户姓名"
          name="realname"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">手机号</div>
        <el-input
          v-model="phone"
          class="add-w500"
          placeholder="请输入手机号"
          name="phone"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">账号</div>
        <el-input
          v-model="username"
          class="add-w500"
          placeholder="请输入登录账号名"
          name="username"
          autocomplete="new-username"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">密码</div>
        <el-input
          v-model="password"
          class="add-w500"
          placeholder="请设置密码"
          show-password
          name="password"
          autocomplete="new-password"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">重复密码</div>
        <el-input
          v-model="password_hashtwice"
          class="add-w500"
          placeholder="请再次输入密码"
          show-password
          name="password_hashtwice"
        />
      </div>
      <div class="save" @click="getAgentAccountAddSync">确认新增</div>
    </div>
  </div>
</template>

<script>
import { getAgentAccountAdd } from '@/api/user.js'
export default {
    data() {
        return {
            id: '',
            realname: '',
            phone: '',
            username: '',
            password: '',
            password_hashtwice: ''
        }
    },
    created() {
        this.id = this.$route.query.id
    },
    methods: {
        getAgentAccountAddSync() {
            if (
                this.realname === '' ||
                this.phone === '' ||
                this.username === '' ||
                this.password === '' ||
                this.password_hashtwice === ''
            ) {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            if (this.password !== this.password_hashtwice) {
                this.$message({
                    message: '两次密码不一致',
                    type: 'warning'
                })
                return
            }
            getAgentAccountAdd({
                id: this.id,
                realname: this.realname,
                phone: this.phone,
                username: this.username,
                password: this.password,
                password_hashtwice: this.password_hashtwice
            }).then(res => {
                this.$message({
                    message: '新增省代理账号成功',
                    type: 'success'
                })
                this.$router.go(-1)
            })
        }
    }
}
</script>

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
  &-p6 {
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
  min-height: calc(100vh - 240px);
}
</style>
