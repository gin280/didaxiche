<template>
  <div class="navbar">
    <div style="display:flex;align-items: center;flex:1;">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <div class="title">啲哒洗车管理系统</div>
    </div>
    <div class="right-menu">
      <div class="right-name">
        <div class="right-name-avatar">
          <img :src="avatar" alt="">
        </div>
        <div class="right-name-text">{{ name }}</div>
      </div>
      <div class="right-edit" @click="logout">
        <div class="right-edit-i">
          <img src="@/assets/global/electricity.png" alt="">
        </div>
        <div class="right-edit-text">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import cookie from 'js-cookie'
import { getInfo } from '@/api/user.js'

export default {
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ])
    },
    data() {
        return {
            avatar:'',                  //头像
            name:'',                    //昵称
        }
    },
    created() {
        getInfo().then(res =>{
            this.avatar = res.result.head_pic
            this.name = res.result.nickname
        })
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            cookie.remove('token')// localhost   ddxc.xyyun.co
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>
<style lang="scss">
.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-menu {
  margin: 0 !important;
  top: 51px !important;
  left: auto !important;
  right: 0;
}
</style>
<style lang="scss" scoped>
.title {
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #304156;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    color: white;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-name {
      display: flex;
      align-items: center;
      font-weight: bold;
      .right-name-avatar {
        border-radius: 50%;
        overflow: hidden;
        width: 50px;
        height: 50px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-name-text {
        font-size: 20px;
      }
    }
    .right-edit {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 30px;
      padding: 0 40px 0 20px;
      cursor: pointer;
      .right-edit-i {
        width: 25px;
        height: 25px;
        display: flex;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right-edit:hover{
      background-color: #222222;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
