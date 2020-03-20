<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">意见反馈详情</div>
    </div>
    <div class="user">
        <div class="basic-information">
            <ul class="basic-information-project">
                <li>
                    <p>用户昵称</p>
                    <div>{{ feedbackDetails.openid }}</div>
                </li>
                <li>
                    <p>反馈类型</p>
                    <div>{{ feedbackDetails.fid }}</div>
                </li>
                <li>
                    <p>反馈网点</p>
                    <div>{{ feedbackDetails.bid }}</div>
                </li>
                <li>
                    <p>反馈时间</p>
                    <div>{{ feedbackDetails.created_at }}</div>
                </li>
                <li>
                    <p>问题描述</p>
                    <div>{{ feedbackDetails.feedback }}</div>
                </li>
                <li>
                    <p>问题图片</p>
                    <div v-for="(item,index) in images" :key="index" class="problem_img">
                        <img :src="images[index]">
                    </div>

                </li>
            </ul>
    </div>
  </div>

</div></template>

<script>
import {
    getFeedbackDetails
} from '@/api/system.js'
export default {
    data() {
        return {
            total: 0, // 结束服务列表分页
            newpage: 1, // 当前页
            pages: '',
            feedbackDetails:[], // 意见反馈
            images:[], // 问题图片
        }
    },
    mounted() {
        this.id = this.$route.query.id

        getFeedbackDetails({id:this.id}).then(res=>{
            this.feedbackDetails = res.result.model
            this.images = res.result.model.images
        })
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
  background-color: #2ca9fc;
}
.el-tabs__item:hover {
  color: #2ca9fc;
}
.el-checkbox__inner {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-checkbox__inner::after {
  height: 17px;
  left: 11px;
}
el-radio {
  font-size: 20px;
}
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
          font-size: 111px;
          margin-left: 5px;
        }
      }
    }
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  margin: 20px 30px;
  min-height: calc(100vh - 240px);
  &-number {
    display: flex;
    justify-content: flex-end;
    position: relative;
    right: 0;
    margin-bottom: 10px;
  }
  &-operating {
    font-size: 30px;
    color: black;
    svg {
      cursor: pointer;
    }
    // }
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
    box-shadow: 0 0 4px 0 rgba(112, 2011, 185, 1);
  }
}
.top {
  margin: 20px 0px;
}
.basic {
  &-information {
    position: relative;
    font-size: 20px;
    line-height: 35px;
    &-project {
      text-align: right;
      margin: 20px 20px 0 -20px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 8em;
          margin-right: 1em;
          // font-weight: 700;
        }
        div {
          margin-left: 1em;
          float: left;
          el-radio {
            font-size: 20px;
          }
        }
      }
    }
  }
}
.problem_img{
    width: 180px;
    height: 180px;
    margin-left: 100px;
    img{
        width: 100%;
        height: 100%;
    }
  }
</style>
