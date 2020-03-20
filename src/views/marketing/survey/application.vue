<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">受助者调查</div>
    </div>
    <div class="user">
      <div class="timeline">
        <div class="now">1.申请资料</div>
        <div class="line" />
        <div>2.调查资料</div>
        <div class="line" />
        <div>3.审核</div>
      </div>
      <div class="basic-information">
        <ul class="basic-information-project">
          <li>姓名</li>
          <li>手机号</li>
          <li>工作单位</li>
          <li>工作岗位</li>
          <li>申请金额</li>
          <li>申请项目</li>
          <li>申请时间</li>
          <li class="basic-information-text2">申请说明</li>
          <li>证明材料</li>
        </ul>
        <ul class="basic-information-actual">
          <li>李大力<div class="basic-information-modify">修改</div>
          </li>
          <li>1393428824<div class="basic-information-modify">修改</div>
          </li>
          <li>宏泰修理厂<div class="basic-information-modify">修改</div>
          </li>
          <li>修理工<div class="basic-information-modify">修改</div>
          </li>
          <li>¥23143<div class="basic-information-modify">修改</div>
          </li>
          <li>贫困留守儿童<div class="basic-information-modify">修改</div>
          </li>
          <li>2019-10-1 16:00<div class="basic-information-modify">修改</div>
          </li>
          <li>
            <div class="basic-information-text"> 父母常年在外务工，家中只有年迈的爷爷奶奶，
              经济较为拮据，望广大爱心人士伸出援助之手，
              帮我圆了我的上学梦…</div>
            <div class="basic-information-modify">修改</div>
          </li>
          <li>
            <div class="basic-information-prove">
              <img src="@/assets/global/1.jpg" alt="">
              <img src="@/assets/global/1.jpg" alt="">
            </div>
            <div class="basic-information-modify">修改</div>
          </li>
        </ul>
      </div>
      <div style="display:flex;align-items: center;">
        <div class="next" @click="next">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'basic',
      radio: '1'
    }
  },
  methods: {
    next() {
      this.$router.push('/help/survey/survey')
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
.timeline {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  .line {
    height: 1px;
    width: 250px;
    background-color: #979797;
  }
  .now {
    color: #0b7767;
  }
}
.next {
  font-size: 18px;
  color: white;
  background: rgba(62, 206, 185, 1);
  border-radius: 8px;
  padding: 8px 50px;
  margin: 20px auto 0;
  display: flex;
  cursor: pointer;
}
.el-pagination {
  right: 0;
  position: absolute;
  top: calc(100vh - 265px);
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
  min-height: calc(100vh - 160px);
}
.basic {
  &-information {
    position: relative;
    display: flex;
    font-size: 20px;
    &-prove {
      display: flex;
      align-items: center;
      img {
        margin: 0 10px;
        width: 120px;
        height: 120px;
      }
    }
    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box !important;
      -webkit-box-orient: vertical;
      width: 400px;
      -webkit-line-clamp: 3;
      height: 70px;
    }
    &-text2 {
      height: 70px;
    }
    &-project {
      text-align: right;
      margin: 50px 50px 0 50px;
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
      color: #2CA9FC;
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

</style>
