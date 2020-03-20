<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">角色管理</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom">搜索</div>
      </div>
    </div>
    <div class="user">
      <div class="user-operating">
        <div class="user-title">角色显示</div>
        <div class="user-add">新增角色</div>
      </div>
      <div class="user-userList">
        <div class="user-roles">
          <p>「001：超级管理员」:我是超级管理员</p>
          <div class="user-operatingbtn">
            <svg-icon icon-class="hb" />
            <svg-icon icon-class="ljt" />
          </div>
        </div>
        <div class="user-roles">
          <p>「001：超级管理员」:我是超级管理员</p>
          <div class="user-operatingbtn">
            <svg-icon icon-class="hb" />
            <svg-icon icon-class="ljt" />
          </div>
        </div>
      </div>
    </div>
    <div class="edit">
      <div>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="10" background hide-on-single-page />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0
    }
  },
  methods: {
    goDetails() {
      this.$router.push('/user/dashboard/details')
    }
  }
}
</script>
<style lang="scss">

</style>

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
  min-height: calc(100vh - 210px);
  &-operating{
    display: flex;
    align-items: center;
  }
  &-title{
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
  }
  &-add{
    padding: 10px 15px;
    background-color: #2CA9FC;
    color: white;
    cursor: pointer;
  }
  &-roles{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    border:1px solid rgba(203,203,203,1);
    padding: 8px 15px;
    margin-bottom: 10px;
  }
  &-operatingbtn{
    font-size: 30px;
  }
  &-userList{
    margin-top: 20px;
  }
}
.edit{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
</style>
