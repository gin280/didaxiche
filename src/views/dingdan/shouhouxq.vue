<template>
  <div>
    售后详情
    <span @click="goDetail">去售后管理页面</span>
    <div v-if="type == 1">1</div>
    <div v-else-if="type == 2">2</div>
    <div v-else>3</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.type = this.$route.query.type
  },
  data() {
    return {
      type: ''
    }
  },
  methods: {
    goDetail(id) {
    //   this.$router.push(`/order/sh?id=${id}&type=${type}`)
    }
  }
}
</script>

<style>
</style>