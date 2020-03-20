<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">修改省代代理商账号</div>
    </div>
    <div class="user">
      <div class="add-flex" style="margin-top:50px;">
        <div class="add-p6">姓名</div>
        <el-input
          v-model="nameInput"
          class="add-w500"
          placeholder="请输入用户姓名"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">手机号</div>
        <el-input
          v-model="phoneInput"
          class="add-w500"
          placeholder="请输入手机号"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">账号</div>
        <el-input
          v-model="accountInput"
          class="add-w500"
          placeholder="请输入登录账号名"
          autocomplete="new-username"
        />
      </div>
      <div class="add-flex">
        <div class="add-p6">密码</div>
        <el-input
          v-model="passwordInput"
          class="add-w500"
          placeholder="请设置密码"
          show-password
          autocomplete="new-password"
        />
      </div>
      <div class="add-flex">
        <div class="add-suo">注：如不修改密码请留空</div>
      </div>
      <div class="add-flex">
        <div class="add-p6">重复密码</div>
        <el-input
          v-model="passwordTowInput"
          class="add-w500"
          placeholder="请再次输入密码"
          show-password
        />
      </div>
      <div class="save" @click="saveData">确认修改</div>
    </div>
  </div>
</template>

<script>
import { getaccountManagementEdit,  //账号信息修改
    getaccountManagement  // 获取账号详细信息
} from '@/api/user.js'
export default {
    data() {
        return {
            uid: '',
            nameInput: '',
            phoneInput: '',
            accountInput: '',
            passwordInput: '',
            passwordTowInput: '',

        }
    },
    mounted() {
        this.uid = this.$route.query.uid
        // 获取详细信息
        getaccountManagement({
            'uid':this.uid,
        }).then(res => {
            this.nameInput = res.result.realname
            this.phoneInput = res.result.phone
            this.accountInput = res.result.username
        })
    },
    methods: {
        // 修改
        saveData() {
            if (this.nameInput === '' || this.phoneInput === '' || this.accountInput === '') {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            if (this.passwordInput !== this.passwordTowInput) {
                this.$message({
                    message: '两次密码不一致',
                    type: 'warning'
                })
                return
            }

            // 修改账户信息
            getaccountManagementEdit({
                'uid': this.uid,
                'realname': this.nameInput,
                'phone': this.phoneInput,
                'username': this.accountInput,
                'password': this.passwordInput,
                'password_z': this.passwordTowInput
            }).then(res => {
                this.$message({
                    message: '修改代理商账号成功',
                    type: 'success'
                })
                this.$router.go(-1)
            })
        }
    },

}
</script>
<style lang="scss"></style>

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
  &-suo {
    color: #7c7c7c;
    font-size: 14px;
    margin-left: 8em;
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
